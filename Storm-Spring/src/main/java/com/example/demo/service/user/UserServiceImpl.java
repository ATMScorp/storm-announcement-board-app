package com.example.demo.service.user;

import java.util.Optional;

import com.example.demo.dto.SingleAnnouncementDto;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import com.example.demo.dto.AnnouncementDto;
import com.example.demo.model.Announcement;
import com.example.demo.model.Favorite;
import com.example.demo.model.User;
import com.example.demo.repository.AnnouncementRepository;
import com.example.demo.repository.FavoriteRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final AnnouncementRepository announcementRepository;
    private final UserRepository userRepository;
    private final FavoriteRepository favoriteRepository;

    public UserServiceImpl(AnnouncementRepository announcementRepository, UserRepository userRepository, FavoriteRepository favoriteRepository) {
        this.announcementRepository = announcementRepository;
        this.userRepository = userRepository;
        this.favoriteRepository = favoriteRepository;
    }

    private Long getCurrentUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String email = ((UserDetails) principal).getUsername();
            Optional<User> userOptional = userRepository.findByEmail(email);
            if (userOptional.isPresent()) {
                return userOptional.get().getId();
            } else {
                throw new RuntimeException("User not found");
            }
        } else {
            throw new RuntimeException("Invalid authentication principal");
        }
    }

    @Override
    public Announcement createAnnouncement(AnnouncementDto announcementDto) {
        Announcement announcement = new Announcement();
        announcement.setTitle(announcementDto.getTitle());
        announcement.setDescription(announcementDto.getDescription());
        announcement.setPrice(announcementDto.getPrice());
        announcement.setLocation(announcementDto.getLocation());
        announcement.setContactPerson(announcementDto.getContactPerson());
        announcement.setPhoneNumber(announcementDto.getPhoneNumber());
        announcement.setItemCondition(announcementDto.getItemCondition());
        announcement.setColor(announcementDto.getColor());
        announcement.setPhoto(announcementDto.getPhoto());
        announcement.setUserId(getCurrentUserId());
        return announcementRepository.save(announcement);
    }

    @Override
    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }

    @Override
    public List<Announcement> getAnnouncementsByUserId(Long userId) {
        return announcementRepository.findByUserId(userId);
    }

    @Override
    public void addAnnouncementToFavorites(Long announcementId) {
        Long userId = getCurrentUserId();
        Optional<User> user = userRepository.findById(userId);
        Optional<Announcement> announcement = announcementRepository.findById(announcementId);

        if (user.isPresent() && announcement.isPresent()) {
            Announcement announcementToAdd = announcement.get();

            if (favoriteRepository.existsByUserAndAnnouncement(user.get(), announcementToAdd)) {
                throw new RuntimeException("The ad is already in favorites");
            }

            Favorite favorite = new Favorite();
            favorite.setUser(user.get());
            favorite.setAnnouncement(announcementToAdd);
            favoriteRepository.save(favorite);
        } else {
            throw new RuntimeException("User or ad not found");
        }
    }

    @Override
    public List<Announcement> getAllFavoriteAnnouncementsByUserId(Long userId) {
        Optional<User> user = userRepository.findById(userId);

        if (user.isPresent()) {
            List<Favorite> favorites = favoriteRepository.findByUser(user.get());
            return favorites.stream()
                    .map(Favorite::getAnnouncement)
                    .collect(Collectors.toList());
        } else {
            throw new RuntimeException("User is not found");
        }
    }

    @Override
    @Transactional
    public void deleteAnnouncement(Long announcementId) {
        favoriteRepository.deleteByAnnouncementId(announcementId);
        announcementRepository.deleteById(announcementId);
    }

    @Override
    public SingleAnnouncementDto getAnnouncementById(Long announcementId) {
        Optional<Announcement> optionalAnnouncement = announcementRepository.findById(announcementId);
        SingleAnnouncementDto singleAnnouncementDto = new SingleAnnouncementDto();
        optionalAnnouncement.ifPresent(announcement -> singleAnnouncementDto.setAnnouncementDto(announcement.getAnnouncementDto()));
        return singleAnnouncementDto;
    }

    @Override
    public Announcement updateAnnouncement(Long announcementId, AnnouncementDto announcementDto) {
        Optional<Announcement> announcementOptional = announcementRepository.findById(announcementId);
        if (announcementOptional.isPresent()) {
            Announcement announcement = announcementOptional.get();
            announcement.setTitle(announcementDto.getTitle());
            announcement.setDescription(announcementDto.getDescription());
            announcement.setPrice(announcementDto.getPrice());
            announcement.setLocation(announcementDto.getLocation());
            announcement.setContactPerson(announcementDto.getContactPerson());
            announcement.setPhoneNumber(announcementDto.getPhoneNumber());
            announcement.setItemCondition(announcementDto.getItemCondition());
            announcement.setColor(announcementDto.getColor());
            announcement.setPhoto(announcementDto.getPhoto());
            return announcementRepository.save(announcement);
        } else {
            return null;
        }
    }
}
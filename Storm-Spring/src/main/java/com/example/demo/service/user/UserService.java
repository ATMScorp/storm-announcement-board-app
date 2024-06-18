package com.example.demo.service.user;

import com.example.demo.dto.AnnouncementDto;
import com.example.demo.dto.SingleAnnouncementDto;
import com.example.demo.model.Announcement;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    Announcement createAnnouncement(AnnouncementDto announcementDto);
    List<Announcement> getAllAnnouncements();
    List<Announcement> getAnnouncementsByUserId(Long userId);
    void addAnnouncementToFavorites(Long announcementId);
    List<Announcement> getAllFavoriteAnnouncementsByUserId(Long userId);
    void deleteAnnouncement(Long announcementId);

    SingleAnnouncementDto getAnnouncementById(Long id);
    Announcement updateAnnouncement(Long announcementId, AnnouncementDto announcementDto);
}
package com.example.demo.repository;

import com.example.demo.model.Announcement;
import com.example.demo.model.Favorite;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    boolean existsByUserAndAnnouncement(User user, Announcement announcement);

    List<Favorite> findByUser(User user);

    void deleteByAnnouncementId(Long announcementId);

}

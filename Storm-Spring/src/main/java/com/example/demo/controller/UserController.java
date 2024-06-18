package com.example.demo.controller;

import com.example.demo.dto.AnnouncementDto;
import com.example.demo.dto.SingleAnnouncementDto;
import com.example.demo.model.Announcement;
import com.example.demo.service.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create-item")
    public ResponseEntity<Announcement> createAnnouncement(@RequestBody AnnouncementDto announcementDto) {
        Announcement announcement = userService.createAnnouncement(announcementDto);
        return ResponseEntity.ok(announcement);
    }

    @GetMapping("/announcements")
    public ResponseEntity<List<Announcement>> getAllAnnouncements() {
        List<Announcement> announcements = userService.getAllAnnouncements();
        return ResponseEntity.ok(announcements);
    }

    @GetMapping("/announcements/{userId}")
    public ResponseEntity<List<Announcement>> getAnnouncementsByUserId(@PathVariable Long userId) {
        List<Announcement> announcements = userService.getAnnouncementsByUserId(userId);
        return ResponseEntity.ok(announcements);
    }

    @PostMapping("/announcements/{announcementId}/favorites")
    public ResponseEntity<Void> addToFavorites(@PathVariable Long announcementId) {
        userService.addAnnouncementToFavorites(announcementId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/favorites/{userId}")
    public ResponseEntity<List<Announcement>> getAllFavoriteAnnouncementsByUserId(@PathVariable Long userId) {
        List<Announcement> favoriteAnnouncements = userService.getAllFavoriteAnnouncementsByUserId(userId);
        return ResponseEntity.ok(favoriteAnnouncements);
    }

    @DeleteMapping("/announcements/{announcementId}")
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable Long announcementId) {
        userService.deleteAnnouncement(announcementId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/announcements/edit/{announcementId}")
    public ResponseEntity<SingleAnnouncementDto> getAnnouncementById(@PathVariable Long announcementId) {
        SingleAnnouncementDto singleAnnouncementDto = userService.getAnnouncementById(announcementId);
        if (singleAnnouncementDto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(singleAnnouncementDto);
    }

    @PutMapping("/announcements/edit/{announcementId}")
    public ResponseEntity<Announcement> updateAnnouncement(@PathVariable Long announcementId, @RequestBody AnnouncementDto announcementDto) {
        Announcement updatedAnnouncement = userService.updateAnnouncement(announcementId, announcementDto);
        if (updatedAnnouncement == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedAnnouncement);
    }
}
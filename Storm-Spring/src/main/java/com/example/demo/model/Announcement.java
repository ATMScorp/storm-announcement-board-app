package com.example.demo.model;

import com.example.demo.dto.AnnouncementDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "announcements")
@EntityListeners(AuditingEntityListener.class)
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "location")
    private String location;

    @Column(name = "contact_person", nullable = false)
    private String contactPerson;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "item_condition")
    private String itemCondition;

    @Column(name = "color")
    private String color;

    @Column(name = "photo", nullable = false)
    private String photo;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @CreatedDate
    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime createdDate;

    public AnnouncementDto getAnnouncementDto() {
        AnnouncementDto announcementDto = new AnnouncementDto();
        announcementDto.setId(id);
        announcementDto.setTitle(title);
        announcementDto.setDescription(description);
        announcementDto.setPrice(price);
        announcementDto.setLocation(location);
        announcementDto.setContactPerson(contactPerson);
        announcementDto.setPhoneNumber(phoneNumber);
        announcementDto.setItemCondition(itemCondition);
        announcementDto.setColor(color);
        announcementDto.setPhoto(photo);
        return announcementDto;
    }

}
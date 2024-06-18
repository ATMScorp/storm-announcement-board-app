package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AnnouncementDto {

    private Long id;
    private String title;
    private String description;
    private Double price;
    private String location;
    private String contactPerson;
    private String phoneNumber;
    private String itemCondition;
    private String color;
    private String photo;
    private Long userId;
    private LocalDateTime createdDate;
}
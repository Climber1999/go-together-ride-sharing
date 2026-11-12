package com.gotogether.booking.dto;

import lombok.Data;

@Data
public class PassengerSummaryDTO {
    private Long id;
    private String username;
    private String imageUrl;
    private String imageBase64;
}

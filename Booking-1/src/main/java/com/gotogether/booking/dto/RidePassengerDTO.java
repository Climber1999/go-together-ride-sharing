package com.gotogether.booking.dto;

import com.gotogether.booking.Entity.BookingStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class RidePassengerDTO {
    private Long bookingId;
    private Long passengerId;
    private String passengerName;
    private String passengerImageUrl;
    private String passengerImageBase64;
    private Integer passengerSeats;
    private String pickupPoint;
    private String dropoffPoint;
    private BigDecimal totalAmount;
    private BookingStatus status;
    private LocalDateTime bookedAt;
    private LocalDateTime rideDate;
}

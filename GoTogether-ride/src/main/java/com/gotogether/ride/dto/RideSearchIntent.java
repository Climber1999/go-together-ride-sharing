package com.gotogether.ride.dto;

import java.time.LocalDate;

public record RideSearchIntent(String source, String destination, LocalDate date, String clarification) {
}

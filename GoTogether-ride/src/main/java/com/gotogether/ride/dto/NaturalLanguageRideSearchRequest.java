package com.gotogether.ride.dto;

import jakarta.validation.constraints.NotBlank;

public record NaturalLanguageRideSearchRequest(@NotBlank String message) {
}

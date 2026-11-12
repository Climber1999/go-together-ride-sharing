package com.gotogether.ride.dto;

import java.time.LocalDate;
import java.util.List;

public record NaturalLanguageRideSearchResponse(
        boolean clarificationNeeded,
        String clarification,
        String source,
        String destination,
        LocalDate date,
        List<RideResponseDTO> rides) {
}

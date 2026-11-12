package com.gotogether.ride.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import com.gotogether.ride.dto.NaturalLanguageRideSearchResponse;
import com.gotogether.ride.dto.RideResponseDTO;
import com.gotogether.ride.dto.RideSearchIntent;

@Service
public class RideSearchAssistant {

    private final ChatClient chatClient;
    private final RideService rideService;

    public RideSearchAssistant(ChatClient.Builder chatClientBuilder, RideService rideService) {
        this.chatClient = chatClientBuilder.build();
        this.rideService = rideService;
    }

    public NaturalLanguageRideSearchResponse search(String message) {
        RideSearchIntent intent = chatClient.prompt()
                .system(system -> system.text("""
                        Extract a ride search from the user's message.
                        Today is {today}. Interpret relative dates using this date.
                        Return only the requested search fields. Do not invent missing cities or dates.
                        If source, destination, or date is missing or ambiguous, leave that field null
                        and provide one short question asking the user to clarify.
                        """).param("today", LocalDate.now()))
                .user(message)
                .call()
                .entity(RideSearchIntent.class);

        if (intent == null) {
            throw new IllegalStateException("The AI model did not return ride-search details");
        }

        if (isBlank(intent.source()) || isBlank(intent.destination()) || intent.date() == null) {
            String clarification = isBlank(intent.clarification())
                    ? "Please provide the departure city, destination, and travel date."
                    : intent.clarification();
            return new NaturalLanguageRideSearchResponse(
                    true, clarification, intent.source(), intent.destination(), intent.date(), List.of());
        }

        List<RideResponseDTO> rides = rideService.searchRides(
                intent.source().trim(), intent.destination().trim(), intent.date());
        return new NaturalLanguageRideSearchResponse(
                false, null, intent.source().trim(), intent.destination().trim(), intent.date(), rides);
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}

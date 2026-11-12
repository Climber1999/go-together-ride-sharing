package com.gotogether.ride.services;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import com.gotogether.ride.repositories.RideRepository;

class RideServiceImplTest {

    private final RideRepository rideRepository = mock(RideRepository.class);
    private final RideServiceImpl rideService = new RideServiceImpl(rideRepository, mock(ModelMapper.class));

    @Test
    void getAllRidesReturnsEmptyListWhenNoRidesExist() {
        when(rideRepository.findAll()).thenReturn(List.of());

        assertTrue(rideService.getallRides().isEmpty());
    }

    @Test
    void getDriverRidesReturnsEmptyListWhenDriverHasNoRides() {
        when(rideRepository.findByDriverId(42L)).thenReturn(List.of());

        assertTrue(rideService.getDriverRides(42L).isEmpty());
    }
}

package com.gotogether.booking.client;

import com.gotogether.booking.dto.RideSummaryDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ride-service", url = "${ride.service.url:http://localhost:8083}")
public interface RideClient {

    @GetMapping("/gotogether/rides/{rideId}")
    RideSummaryDTO getRide(@PathVariable("rideId") Long rideId);
}

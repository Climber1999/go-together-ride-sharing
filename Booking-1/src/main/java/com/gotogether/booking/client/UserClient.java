package com.gotogether.booking.client;

import com.gotogether.booking.dto.PassengerSummaryDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "user-service", url = "${user.service.url:http://localhost:8081}")
public interface UserClient {

    @PostMapping("/gotogether/users/public/compact/batch")
    List<PassengerSummaryDTO> getPassengerSummaries(@RequestBody List<Long> userIds);
}

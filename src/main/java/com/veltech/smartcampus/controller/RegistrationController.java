package com.veltech.smartcampus.controller;

import com.veltech.smartcampus.model.Registration;
import com.veltech.smartcampus.repository.RegistrationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    private final RegistrationRepository registrationRepository;

    public RegistrationController(RegistrationRepository registrationRepository) {
        this.registrationRepository = registrationRepository;
    }

    @GetMapping
    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }

    @PostMapping
    public Registration createRegistration(@RequestBody Registration registration) {
        return registrationRepository.save(registration);
    }

    @PutMapping("/{id}/status")
    public Registration updateStatus(@PathVariable Long id, @RequestBody java.util.Map<String, String> body) {
        Registration reg = registrationRepository.findById(id).orElseThrow();
        reg.setStatus(body.get("status"));
        return registrationRepository.save(reg);
    }
}

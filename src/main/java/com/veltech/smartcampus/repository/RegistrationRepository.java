package com.veltech.smartcampus.repository;

import com.veltech.smartcampus.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
}

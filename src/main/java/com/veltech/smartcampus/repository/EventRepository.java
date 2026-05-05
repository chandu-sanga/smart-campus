package com.veltech.smartcampus.repository;

import com.veltech.smartcampus.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}

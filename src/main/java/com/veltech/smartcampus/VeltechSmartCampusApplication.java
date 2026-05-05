package com.veltech.smartcampus;

import com.veltech.smartcampus.model.Event;
import com.veltech.smartcampus.repository.EventRepository;
import com.veltech.smartcampus.model.AppUser;
import com.veltech.smartcampus.repository.AppUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class VeltechSmartCampusApplication {

	public static void main(String[] args) {
		SpringApplication.run(VeltechSmartCampusApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(EventRepository eventRepository, AppUserRepository userRepository) {
		return args -> {
			if (eventRepository.count() == 0) {
				eventRepository.save(new Event("Annual Tech Symposium 2026", "Join us for the biggest tech event of the year featuring industry leaders.", "Oct 15, 2026", "Main Auditorium", "Computer Science", "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"));
				eventRepository.save(new Event("Veltech Cultural Fest", "Experience the diverse culture of Veltech with music, dance, and food.", "Nov 02, 2026", "Open Grounds", "Cultural Committee", "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"));
				eventRepository.save(new Event("AI & Machine Learning Workshop", "Hands-on workshop on the latest AI trends.", "Sep 28, 2026", "Lab 4, Block B", "AI & Data Science", "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"));
				System.out.println("Random events seeded into the database.");
			}
			
			if (userRepository.count() == 0) {
			    userRepository.save(new AppUser("admin", "admin123", "ADMIN"));
			    userRepository.save(new AppUser("student", "student123", "USER"));
			    System.out.println("Default users seeded.");
			}
		};
	}
}

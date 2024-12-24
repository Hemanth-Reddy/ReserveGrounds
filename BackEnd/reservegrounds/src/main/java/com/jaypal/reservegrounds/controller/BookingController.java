package com.jaypal.reservegrounds.controller;

/**
 * <p>Description of the class.</p>
 *
 * <p>Author: Hemanth Nagireddy</p>
 * <p>Date: 12/14/2024</p>
 */
import com.jaypal.reservegrounds.model.Booking;
import com.jaypal.reservegrounds.repository.BookingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://172.17.80.1:3000/, http://localhost:3000/")
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        List<Booking> conflictingBookings = bookingRepository.findConflictingBookings(
                booking.getFacility(),
                booking.getStartTime(),
                booking.getEndTime()
        );

        if (!conflictingBookings.isEmpty()) {
            List<String> availableTimings = suggestAvailableTimings(booking.getFacility());
            return ResponseEntity.badRequest().body("The selected time slot is already booked for this facility. Available timings: " + availableTimings);
        }

        bookingRepository.save(booking);
        return ResponseEntity.ok("Booking created successfully!");
    }

    private List<String> suggestAvailableTimings(String facility) {
        List<Booking> bookings = bookingRepository.findBookingsByFacility(facility);

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime endOfDay = now.withHour(23).withMinute(59).withSecond(59);

        // Find available slots between now and end of the day
        List<String> availableTimings = bookings.stream()
                .filter(b -> b.getEndTime().isAfter(now)) // Consider only future bookings
                .map(b -> b.getStartTime().toString() + " to " + b.getEndTime().toString())
                .collect(Collectors.toList());

        if (availableTimings.isEmpty()) {
            availableTimings.add("No available slots for today.");
        }

        return availableTimings;
    }
}

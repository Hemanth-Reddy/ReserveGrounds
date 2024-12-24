package com.jaypal.reservegrounds.repository;

import com.jaypal.reservegrounds.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("SELECT b FROM Booking b WHERE b.facility = :facility AND ((b.startTime < :endTime AND b.endTime > :startTime))")
    List<Booking> findConflictingBookings(@Param("facility") String facility,
                                          @Param("startTime") LocalDateTime startTime,
                                          @Param("endTime") LocalDateTime endTime);

    @Query("SELECT b FROM Booking b WHERE b.facility = :facility ORDER BY b.startTime")
    List<Booking> findBookingsByFacility(@Param("facility") String facility);
}

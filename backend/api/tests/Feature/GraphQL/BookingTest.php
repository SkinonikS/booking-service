<?php

use App\Models\Booking;
use App\Models\BookingProvider;
use App\Models\Category;
use App\Models\Service;
use App\Models\ServiceSchedule;
use App\Models\User;
use App\Models\WeekdaySchedule;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->category = Category::factory()->create();
    $this->bookingProvider = BookingProvider::factory()->create([
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
    ]);
    $this->service = Service::factory()->create([
        'booking_provider_id' => $this->bookingProvider->id,
    ]);
    $this->weekdaySchedule = WeekdaySchedule::factory()->create([
        'booking_provider_id' => $this->bookingProvider->id,
        'weekday_id' => 1, // Monday
        'open_time' => 9 * 60,  // 9 AM
        'close_time' => 17 * 60, // 5 PM
    ]);
    $this->serviceSchedule = ServiceSchedule::factory()->create([
        'service_id' => $this->service->id,
        'weekday_schedule_id' => $this->weekdaySchedule->id,
        'open_time' => 10 * 60, // 10 AM
        'close_time' => 16 * 60, // 4 PM
        'max_bookings' => 5,
        'time_span' => 60, // 60 minutes
    ]);

    // Mock authentication
    $this->actingAs($this->user);
});

it('can create booking', function () {
    $date = now()->weekday($this->serviceSchedule->weekdaySchedule->weekday_id)->next()->format('Y-m-d');

    $input = [
        'serviceScheduleId' => $this->serviceSchedule->id,
        'date' => $date,
        'timeSlot' => 10 * 60, // 10 AM
    ];

    // Execute the GraphQL mutation
    $response = $this->graphQL('
        mutation createBooking($input: CreateBookingInput!) {
            createBooking(input: $input) {
                id
                date
                timeSlot
                user {
                    id
                }
                serviceSchedule {
                    id
                }
            }
        }
    ', [
        'input' => $input,
    ]);

    // Assert that the booking was created with the correct data
    $response->assertJson([
        'data' => [
            'createBooking' => [
                'date' => $date,
                'timeSlot' => 10 * 60,
                'user' => [
                    'id' => $this->user->id,
                ],
                'serviceSchedule' => [
                    'id' => $this->serviceSchedule->id,
                ],
            ],
        ],
    ]);

    // Check database
    $this->assertDatabaseHas('bookings', [
        'date' => $date,
        'time_slot' => 10 * 60,
        'user_id' => $this->user->id,
    ]);
})->group('booking');

it('can cancel booking', function () {
    $date = now()->weekday($this->serviceSchedule->weekdaySchedule->weekday_id)->next()->format('Y-m-d');

    // Create a booking
    $booking = Booking::factory()->create([
        'user_id' => $this->user->id,
        'service_schedule_id' => $this->serviceSchedule->id,
        'date' => $date,
        'time_slot' => 10 * 60,
    ]);

    $input = [
        'cancellationReason' => 'Test cancellation reason',
    ];

    // Execute the GraphQL mutation
    $response = $this->graphQL('
        mutation cancelBooking($id: ID!, $input: CancelBookingInput!) {
            cancelBooking(id: $id, input: $input) {
                id
                cancellationReason
                cancelledAt
            }
        }
    ', [
        'id' => $booking->id,
        'input' => $input,
    ]);

    // Assert that the booking was cancelled
    $response->assertJson([
        'data' => [
            'cancelBooking' => [
                'id' => $booking->id,
                'cancellationReason' => 'Test cancellation reason',
            ],
        ],
    ]);

    // Check that cancelled_at is not null
    expect($response->json('data.cancelBooking.cancelledAt'))->not->toBeNull();

    // Check database
    $this->assertDatabaseHas('bookings', [
        'id' => $booking->id,
        'cancellation_reason' => 'Test cancellation reason',
    ]);
})->group('booking');

it('can query service datepicker', function () {
    $date = now()->weekday($this->serviceSchedule->weekdaySchedule->weekday_id)->next()->format('Y-m-d');

    // Create a booking
    Booking::factory()->create([
        'user_id' => $this->user->id,
        'service_schedule_id' => $this->serviceSchedule->id,
        'date' => $date,
        'time_slot' => 10 * 60,
    ]);

    // Execute the GraphQL query
    $response = $this->graphQL('
        query getServiceDatepicker($serviceId: ID!, $date: Date!) {
            serviceDatepicker(serviceId: $serviceId, date: $date) {
                serviceSchedule {
                    id
                    openTime
                    closeTime
                }
                bookedTimeSlots {
                    timeSlot
                    currentBookings
                }
            }
        }
    ', [
        'serviceId' => $this->service->id,
        'date' => $date,
    ]);

    // Assert successful response
    $response->assertStatus(200);

    // Check that we have at least one time slot
    $bookedSlots = $response->json('data.serviceDatepicker.0.bookedTimeSlots');
    expect($bookedSlots)->toBeArray();

    // Check that time slot 10 has 1 booking
    $slot10 = collect($bookedSlots)->firstWhere('timeSlot', 10 * 60);
    expect($slot10['currentBookings'])->toBe(1);
})->group('booking');

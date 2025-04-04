<?php

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

    // Mock authentication
    $this->actingAs($this->user);
});

it('can query service schedule by id', function () {
    // Create test service schedule
    $serviceSchedule = ServiceSchedule::factory()->create([
        'service_id' => $this->service->id,
        'weekday_schedule_id' => $this->weekdaySchedule->id,
        'open_time' => 10, // 10 AM
        'close_time' => 16, // 4 PM
        'max_bookings' => 5,
        'time_span' => 60, // 60 minutes
    ]);

    // Execute the GraphQL query
    $response = $this->graphQL('
        {
            serviceSchedule(id: "'.$serviceSchedule->id.'") {
                id
                openTime
                closeTime
                maxBookings
                timeSpan
                service {
                    id
                    name
                }
                weekdaySchedule {
                    id
                    weekday
                }
            }
        }
    ');

    // Assert successful response with correct data
    $response->assertJson([
        'data' => [
            'serviceSchedule' => [
                'id' => $serviceSchedule->id,
                'openTime' => 10,
                'closeTime' => 16,
                'maxBookings' => 5,
                'timeSpan' => 60,
                'service' => [
                    'id' => $this->service->id,
                ],
                'weekdaySchedule' => [
                    'id' => $this->weekdaySchedule->id,
                    'weekday' => 1,
                ],
            ],
        ],
    ]);
})->group('serviceSchedule');

it('can create service schedule', function () {
    $input = [
        'serviceId' => $this->service->id,
        'weekdayScheduleId' => $this->weekdaySchedule->id,
        'isActive' => true,
        'openTime' => 10 * 60, // 10 AM
        'closeTime' => 16 * 60, // 4 PM
        'maxBookings' => 5,
        'timeSpan' => 60, // 60 minutes
    ];

    // Execute the GraphQL mutation
    $response = $this->graphQL('
        mutation createServiceSchedule($input: CreateServiceScheduleInput!) {
            createServiceSchedule(input: $input) {
                id
                openTime
                closeTime
                maxBookings
                timeSpan
                service {
                    id
                }
                weekdaySchedule {
                    id
                }
            }
        }
    ', [
        'input' => $input,
    ]);

    // Assert that the service schedule was created with the correct data
    $response->assertJson([
        'data' => [
            'createServiceSchedule' => [
                'openTime' => 10 * 60,
                'closeTime' => 16 * 60,
                'maxBookings' => 5,
                'timeSpan' => 60,
                'service' => [
                    'id' => $this->service->id,
                ],
                'weekdaySchedule' => [
                    'id' => $this->weekdaySchedule->id,
                ],
            ],
        ],
    ]);

    // Check database
    $this->assertDatabaseHas('service_schedules', [
        'service_id' => $this->service->id,
        'weekday_schedule_id' => $this->weekdaySchedule->id,
        'open_time' => 10 * 60,
        'close_time' => 16 * 60,
        'max_bookings' => 5,
        'time_span' => 60,
    ]);
})->group('serviceSchedule');

it('can update service schedule', function () {
    // Create test service schedule
    $serviceSchedule = ServiceSchedule::factory()->create([
        'service_id' => $this->service->id,
        'weekday_schedule_id' => $this->weekdaySchedule->id,
        'open_time' => 10 * 60,
        'close_time' => 16 * 60,
        'max_bookings' => 5,
        'time_span' => 60,
    ]);

    $input = [
        'isActive' => true,
        'openTime' => 11 * 60, // 11 AM
        'closeTime' => 15 * 60, // 3 PM
        'maxBookings' => 8,
        'timeSpan' => 30, // 30 minutes
    ];

    // Execute the GraphQL mutation
    $response = $this->graphQL('
        mutation updateServiceSchedule($id: ID!, $input: UpdateServiceScheduleInput!) {
            updateServiceSchedule(id: $id, input: $input) {
                id
                openTime
                closeTime
                maxBookings
                timeSpan
            }
        }
    ', [
        'id' => $serviceSchedule->id,
        'input' => $input,
    ]);

    // Assert that the service schedule was updated
    $response->assertJson([
        'data' => [
            'updateServiceSchedule' => [
                'id' => $serviceSchedule->id,
                'openTime' => 11 * 60,
                'closeTime' => 15 * 60,
                'maxBookings' => 8,
                'timeSpan' => 30,
            ],
        ],
    ]);

    // Check database
    $this->assertDatabaseHas('service_schedules', [
        'id' => $serviceSchedule->id,
        'open_time' => 11 * 60,
        'close_time' => 15 * 60,
        'max_bookings' => 8,
        'time_span' => 30,
    ]);
})->group('serviceSchedule');

it('can delete service schedule', function () {
    // Create test service schedule
    $serviceSchedule = ServiceSchedule::factory()->create([
        'service_id' => $this->service->id,
        'weekday_schedule_id' => $this->weekdaySchedule->id,
    ]);

    // Execute the GraphQL mutation
    $response = $this->graphQL('
        mutation deleteServiceSchedule($id: ID!) {
            deleteServiceSchedule(id: $id) {
                id
            }
        }
    ', [
        'id' => $serviceSchedule->id,
    ]);

    // Assert successful deletion
    $response->assertJson([
        'data' => [
            'deleteServiceSchedule' => [
                'id' => $serviceSchedule->id,
            ],
        ],
    ]);

    // Check database
    $this->assertDatabaseMissing('service_schedules', [
        'id' => $serviceSchedule->id,
    ]);
})->group('serviceSchedule');

<?php

use App\Models\BookingProvider;
use App\Models\Category;
use App\Models\User;
use App\Models\WeekdaySchedule;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->category = Category::factory()->create();
    $this->bookingProvider = BookingProvider::factory()->create([
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
    ]);

    // Mock authentication
    $this->actingAs($this->user);
});

it('can query weekday schedule by id', function () {
    // Create test weekday schedule
    $weekdaySchedule = WeekdaySchedule::factory()->create([
        'booking_provider_id' => $this->bookingProvider->id,
        'weekday_id' => 1, // Monday
        'open_time' => 9,  // 9 AM
        'close_time' => 17, // 5 PM
    ]);

    // Execute the GraphQL query
    $response = $this->graphQL('
        {
            weekdaySchedule(id: "'.$weekdaySchedule->id.'") {
                id
                weekday
                openTime
                closeTime
                isActive
                bookingProvider {
                    id
                    name
                }
            }
        }
    ');

    // Assert successful response with correct data
    $response->assertJson([
        'data' => [
            'weekdaySchedule' => [
                'id' => $weekdaySchedule->id,
                'weekday' => 1,
                'openTime' => 9,
                'closeTime' => 17,
                'isActive' => (bool) $weekdaySchedule->is_active,
                'bookingProvider' => [
                    'id' => $this->bookingProvider->id,
                ],
            ],
        ],
    ]);
})->group('weekdaySchedule');

it('can update weekday schedule', function () {
    // Create test weekday schedule
    $weekdaySchedule = WeekdaySchedule::factory()->create([
        'booking_provider_id' => $this->bookingProvider->id,
        'weekday_id' => 1,
        'open_time' => 9 * 60,
        'close_time' => 17 * 60,
    ]);

    $input = [
        'isActive' => true,
        'openTime' => 8 * 60, // 8 AM
        'closeTime' => 20 * 60, // 8 PM
    ];

    // Execute the GraphQL mutation
    $response = $this->graphQL('
        mutation updateWeekdaySchedule($id: ID!, $input: UpdateWeekdayScheduleInput!) {
            updateWeekdaySchedule(id: $id, input: $input) {
                id
                weekday
                openTime
                closeTime
                isActive
            }
        }
    ', [
        'id' => $weekdaySchedule->id,
        'input' => $input,
    ]);

    // Assert that the weekday schedule was updated
    $response->assertJson([
        'data' => [
            'updateWeekdaySchedule' => [
                'id' => $weekdaySchedule->id,
                'weekday' => 1,
                'openTime' => 8 * 60,
                'closeTime' => 20 * 60,
                'isActive' => true,
            ],
        ],
    ]);

    // Check database
    $this->assertDatabaseHas('weekday_schedules', [
        'id' => $weekdaySchedule->id,
        'open_time' => 8 * 60,
        'close_time' => 20 * 60,
    ]);
})->group('weekdaySchedule');

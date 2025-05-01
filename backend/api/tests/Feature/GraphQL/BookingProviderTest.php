<?php

use App\Models\BookingProvider;
use App\Models\Category;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->category = Category::factory()->create();

    // Mock authentication
    $this->actingAs($this->user);
});

it('can query booking providers', function () {
    // Create test booking providers
    BookingProvider::factory()->count(1)->create([
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
    ]);

    // Execute the GraphQL query
    $response = $this->graphQL('
        {
            bookingProviders {
                data {
                    id
                    name
                    email
                    phone
                    isActive
                    category {
                        id
                        name
                    }
                }
            }
        }
    ');

    // Assert successful response
    $response->assertJson([
        'data' => [
            'bookingProviders' => [
                'data' => [],
            ],
        ],
    ]);

    // Check that we got 3 providers
    $responseData = $response->json('data.bookingProviders.data');
    expect(count($responseData))->toBe(1);
})->group('bookingProvider');

it('can query booking provider by id', function () {
    // Create test booking provider
    $bookingProvider = BookingProvider::factory()->create([
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
    ]);

    // Execute the GraphQL query
    $response = $this->graphQL('
        {
            bookingProvider(id: "'.$bookingProvider->id.'") {
                id
                name
                email
                phone
                isActive
            }
        }
    ');

    // Assert successful response with correct data
    $response->assertJson([
        'data' => [
            'bookingProvider' => [
                'id' => $bookingProvider->id,
                'name' => $bookingProvider->name,
                'email' => $bookingProvider->email,
                'phone' => $bookingProvider->phone,
                'isActive' => (bool) $bookingProvider->is_active,
            ],
        ],
    ]);
})->group('bookingProvider');

it('can create booking provider', function () {
    $input = [
        'isActive' => true,
        'name' => 'Test Provider',
        'email' => 'test@example.com',
        'phone' => '1234567890',
        'address' => '123 Test Street',
        'website' => 'https://test.com',
        'aboutUs' => 'This is a test provider',
        'categoryId' => $this->category->id,
    ];

    $response = $this->graphQL('
        mutation createBookingProvider($input: CreateBookingProviderInput!) {
            createBookingProvider(input: $input) {
                id
                name
                email
                phone
                isActive
                aboutUs
            }
        }
    ', [
        'input' => $input,
    ]);

    $response->assertJson([
        'data' => [
            'createBookingProvider' => [
                'name' => 'Test Provider',
                'email' => 'test@example.com',
                'phone' => '1234567890',
                'isActive' => true,
                'aboutUs' => 'This is a test provider',
            ],
        ],
    ]);

    // Check database
    $this->assertDatabaseHas('booking_providers', [
        'name' => 'Test Provider',
        'email' => 'test@example.com',
    ]);
})->group('bookingProvider');

it('can update booking provider', function () {
    // Create test booking provider
    $bookingProvider = BookingProvider::factory()->create([
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
    ]);

    $input = [
        'isActive' => true,
        'name' => 'Updated Provider',
        'email' => 'updated@example.com',
        'phone' => '9876543210',
        'address' => '456 Update Street',
        'website' => 'https://updated.com',
        'aboutUs' => 'This provider has been updated',
    ];

    // Execute the GraphQL mutation
    $response = $this->graphQL('
        mutation updateBookingProvider($id: ID!, $input: UpdateBookingProviderInput!) {
            updateBookingProvider(id: $id, input: $input) {
                id
                name
                email
                phone
                address
                website
                aboutUs
            }
        }
    ', [
        'id' => $bookingProvider->id,
        'input' => $input,
    ]);

    // Assert that the booking provider was updated
    $response->assertJson([
        'data' => [
            'updateBookingProvider' => [
                'id' => $bookingProvider->id,
                'name' => 'Updated Provider',
                'email' => 'updated@example.com',
                'phone' => '9876543210',
            ],
        ],
    ]);

    // Check database
    $this->assertDatabaseHas('booking_providers', [
        'id' => $bookingProvider->id,
        'name' => 'Updated Provider',
        'email' => 'updated@example.com',
    ]);
})->group('bookingProvider');

it('can delete booking provider', function () {
    // Create test booking provider
    $bookingProvider = BookingProvider::factory()->create([
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
    ]);

    // Execute the GraphQL mutation
    $response = $this->graphQL('
        mutation deleteBookingProvider($id: ID!) {
            deleteBookingProvider(id: $id) {
                id
            }
        }
    ', [
        'id' => $bookingProvider->id,
    ]);

    // Assert successful deletion
    $response->assertJson([
        'data' => [
            'deleteBookingProvider' => [
                'id' => $bookingProvider->id,
            ],
        ],
    ]);

    // Check database
    $this->assertDatabaseMissing('booking_providers', [
        'id' => $bookingProvider->id,
    ]);
})->group('bookingProvider');

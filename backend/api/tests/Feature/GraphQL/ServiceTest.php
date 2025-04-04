<?php

use App\Models\BookingProvider;
use App\Models\Category;
use App\Models\Service;
use App\Models\User;

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

it('can query services', function () {
    // Create test services
    Service::factory()->count(3)->create([
        'booking_provider_id' => $this->bookingProvider->id,
    ]);

    // Execute the GraphQL query
    $response = $this->graphQL('
        {
            services(first: 5) {
                data {
                    id
                    name
                    description
                    bookingProvider {
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
            'services' => [
                'data' => [],
            ],
        ],
    ]);

    // Check that we got 3 services
    $responseData = $response->json('data.services.data');
    expect(count($responseData))->toBe(3);
})->group('service');

it('can query service by id', function () {
    // Create test service
    $service = Service::factory()->create([
        'booking_provider_id' => $this->bookingProvider->id,
    ]);

    // Execute the GraphQL query
    $response = $this->graphQL('
        {
            service(id: "'.$service->id.'") {
                id
                name
                description
            }
        }
    ');

    // Assert successful response with correct data
    $response->assertJson([
        'data' => [
            'service' => [
                'id' => $service->id,
                'name' => $service->name,
                'description' => $service->description,
            ],
        ],
    ]);
})->group('service');

it('can create service', function () {
    $input = [
        'name' => 'Test Service',
        'description' => 'This is a test service',
        'bookingProviderId' => $this->bookingProvider->id,
    ];

    // Execute the GraphQL mutation
    $response = $this->graphQL('
        mutation createService($input: CreateServiceInput!) {
            createService(input: $input) {
                id
                name
                description
                bookingProvider {
                    id
                }
            }
        }
    ', [
        'input' => $input,
    ]);

    // Assert that the service was created with the correct data
    $response->assertJson([
        'data' => [
            'createService' => [
                'name' => 'Test Service',
                'description' => 'This is a test service',
                'bookingProvider' => [
                    'id' => $this->bookingProvider->id,
                ],
            ],
        ],
    ]);

    // Check database
    $this->assertDatabaseHas('services', [
        'name' => 'Test Service',
        'description' => 'This is a test service',
        'booking_provider_id' => $this->bookingProvider->id,
    ]);
})->group('service');

it('can update service', function () {
    $service = Service::factory()->create([
        'booking_provider_id' => $this->bookingProvider->id,
    ]);

    $input = [
        'name' => 'Updated Service',
        'description' => 'This service has been updated',
    ];

    // Execute the GraphQL mutation
    $response = $this->graphQL('
        mutation updateService($id: ID!, $input: UpdateServiceInput!) {
            updateService(id: $id, input: $input) {
                id
                name
                description
            }
        }
    ', [
        'id' => $service->id,
        'input' => $input,
    ]);

    // Assert that the service was updated
    $response->assertJson([
        'data' => [
            'updateService' => [
                'id' => $service->id,
                'name' => 'Updated Service',
                'description' => 'This service has been updated',
            ],
        ],
    ]);

    // Check database
    $this->assertDatabaseHas('services', [
        'id' => $service->id,
        'name' => 'Updated Service',
        'description' => 'This service has been updated',
    ]);
})->group('service');

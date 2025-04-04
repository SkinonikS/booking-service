<?php

use App\Models\Category;

it('can query categories', function () {
    // Create test categories
    $categories = Category::factory()->count(3)->create();

    // Execute the GraphQL query
    $response = $this->graphQL('
        {
            categories {
                id
                name
                description
            }
        }
    ');

    // Assert successful response
    $response->assertJson([
        'data' => [
            'categories' => [],
        ],
    ]);

    // Check that we got 3 categories
    $responseData = $response->json('data.categories');
    expect(count($responseData))->toBe(3);

    // Check the first category matches
    expect($responseData[0]['id'])->toBe($categories[0]->id);
    expect($responseData[0]['name'])->toBe($categories[0]->name);
})->group('category');

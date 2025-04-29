<?php

return [

    'credentials' => [
        'key' => env('AWS_CREDENTIALS_KEY'),
        'secret' => env('AWS_CREDENTIALS_SECRET'),
    ],

    'cognito_identity_provider_client' => [
        'version' => env('AWS_CIPC_VERSION', 'latest'),
        'region' => env('AWS_CIPC_REGION'),
        'user_pool_id' => env('AWS_CIPC_USER_POOL_ID'),
    ],

];

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Plank\Mediable\Media as BaseMedia;

class Media extends BaseMedia
{
    use HasUuids;
}

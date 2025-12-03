<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BarbershopSchedule extends Model
{
    protected $fillable = [
        'barbershop_id',
        'day_of_week',
        'start_time',
        'end_time',
    ];

    /**
     * Relación con Barbershop
     */
    public function barbershop(): BelongsTo
    {
        return $this->belongsTo(Barbershop::class);
    }
}

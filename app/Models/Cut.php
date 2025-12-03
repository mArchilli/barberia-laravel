<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cut extends Model
{
    protected $fillable = [
        'barber_id',
        'service_id',
        'client_name',
        'service_date',
        'final_price',
    ];

    protected $casts = [
        'service_date' => 'datetime',
        'final_price' => 'decimal:2',
    ];

    // Relaciones
    public function barber()
    {
        return $this->belongsTo(User::class, 'barber_id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}

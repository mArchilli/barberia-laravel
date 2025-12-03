<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'barbershop_id',
        'name',
        'duration',
        'price',
        'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    // Relaciones
    public function barbershop()
    {
        return $this->belongsTo(Barbershop::class);
    }

    public function cuts()
    {
        return $this->hasMany(Cut::class);
    }
}

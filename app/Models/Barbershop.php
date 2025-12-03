<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Barbershop extends Model
{
    protected $fillable = [
        'name',
        'address',
        'phone',
        'opening_time',
        'closing_time',
        'logo',
    ];

    protected $casts = [
        'opening_time' => 'datetime:H:i',
        'closing_time' => 'datetime:H:i',
    ];

    // Relaciones
    public function barbers()
    {
        return $this->hasMany(User::class, 'barbershop_id')->where('role', User::ROLE_BARBER);
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function schedules()
    {
        return $this->hasMany(BarbershopSchedule::class);
    }
}

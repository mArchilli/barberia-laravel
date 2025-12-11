<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'barbershop_id',
        'name',
        'quantity',
    ];

    public function barbershop()
    {
        return $this->belongsTo(Barbershop::class);
    }
}

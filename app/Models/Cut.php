<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cut extends Model
{
    protected $fillable = [
        'barber_id',
        'service_id',
        'payment_method_id',
        'client_name',
        'service_date',
        'final_price',
    ];

    protected $casts = [
        'service_date' => 'datetime:Y-m-d H:i:s',
        'final_price' => 'decimal:2',
    ];
    
    /**
     * The attributes that should be mutated to dates without timezone conversion.
     */
    protected $dateFormat = 'Y-m-d H:i:s';

    // Relaciones
    public function barber()
    {
        return $this->belongsTo(User::class, 'barber_id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }
}

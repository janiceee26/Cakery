<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['user_id', 'pickup_date', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cakes()
    {
        return $this->belongsToMany(Cake::class)->withPivot('quantity')->withTimestamps();
    }
}

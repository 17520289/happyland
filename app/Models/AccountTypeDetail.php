<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountTypeDetail extends Model
{
    use HasFactory;
    protected $table = 'account_type_details';
    protected $fillable = [
        'id',
        'account_type_id',
        'user_id',
        'start_time',
        'end_time',
        'status',
    ];
}

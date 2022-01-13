<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class AccountType extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory;
    use SoftDeletes;
    protected $table = 'account_types';
    protected $fillable = [
        'id',
        'name',
        'duration',
        'descriptions',
      
    ];
}

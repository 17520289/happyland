<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
class ParentStudent extends Model
{
    use HasFactory;

    protected $table = 'parent_students';

    protected $fillable = [
        'id',
        'parent_id',
        'student_id',
    ];
    public function parent(){
        return $this->hasMany('\App\Models\User');
    }
    public function enrollments(){
        return $this->hasMany('\App\Models\Enrollement' , 'user_id', 'student_id');
    }
}

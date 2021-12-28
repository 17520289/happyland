<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Course;

class Enrollment extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory;
    protected $table = 'enrollments';

    protected $fillable = [
        'id',
        'name',
        'user_id',
        'course_id',
        'start_time',
    ];

    public function course(){
        return $this->belongsTo('App\Models\Course', 'course_id');
    }
}

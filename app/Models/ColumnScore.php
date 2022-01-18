<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColumnScore extends Model
{
    use HasFactory;
    protected $table = 'column_scores';
    protected $fillable = [
        'id',
        'name',
        'description',
        'course_id',
        'coefficient',
    ];
    public function grade(){
        return $this->hasMany('App\Models\Grade', 'column_score_id');
    }
}

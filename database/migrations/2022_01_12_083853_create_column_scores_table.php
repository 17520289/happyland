<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Course;
class CreateColumnScoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('column_scores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->integer('coefficient')->nullable(); // Trong so
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('column_scores');
    }
}

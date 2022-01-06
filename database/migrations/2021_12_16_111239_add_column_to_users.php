<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnToUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            //
            $table->string('full_name')->nullable();
            $table->string('gender')->nullable();
            $table->string('phone')->nullable();
            $table->dateTime('last_login')->nullable();
            $table->string('status')->default('active');
            $table->dateTime('expired_in')->nullable();
            $table->dateTime('start_time')->nullable();
            $table->string('image')->nullable();
            // $table->foreignId('role_id')->constrained();
            // $table->foreignId('level_id')->constrained();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
}

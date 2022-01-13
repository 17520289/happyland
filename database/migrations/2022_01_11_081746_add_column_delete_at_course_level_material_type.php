<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnDeleteAtCourseLevelMaterialType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->softDeletes();
        });
        Schema::table('levels', function (Blueprint $table) {
            $table->softDeletes();
        });        
        Schema::table('account_types', function (Blueprint $table) {
            $table->softDeletes();
        });
        Schema::table('materials', function (Blueprint $table) {
            $table->softDeletes();
        });
       
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
        Schema::table('levels', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
        Schema::table('account_types', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
        Schema::table('materials', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
}

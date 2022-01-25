<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\Level;

class AddForeignkeyLevelIdToCourses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->foreignIdFor(Level::class)->after('id');

        });
        Schema::table('materials', function (Blueprint $table) {
            //
           
            $table->dropColumn('level_id');
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
            //
            $table->dropColumn('foreign_id');
        });
        Schema::table('materials', function (Blueprint $table) {
            //
            $table->foreignIdFor(Level::class)->after('course_id');
        });
    }
}

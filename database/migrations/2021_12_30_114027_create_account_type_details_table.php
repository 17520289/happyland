<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\AccountType;
use App\Models\User;
class CreateAccountTypeDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('account_type_details', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(AccountType::class);
            $table->foreignIdFor(User::class)
            ->onUpdate('cascade')
            ->onDelete('cascade');;
            $table->dateTime('start_time')->nullable();
            $table->dateTime('end_time')->nullable();
            $table->string('status');
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
        Schema::dropIfExists('account_type_details');
    }
}

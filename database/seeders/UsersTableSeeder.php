<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->truncate();

        DB::table('users')->insert([
            'name'     => 'Admin',
            'email'    => 'admin@admin.com',
            'password' => Hash::make('12345678'),
            'is_admin' => 1,
        ]);

        DB::table('users')->insert([
            'name'     => 'User',
            'email'    => 'user1@user.com',
            'password' => Hash::make('12345678'),
            'is_admin' => 0,
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Role;

   
class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \DB::table('roles')->delete();
        Role::create([
          'name' => 'Super Admin',
          'guard_name' => 'backpack',
      ]
      );
        Role::create([
            'name' => 'Admin',
            'guard_name' => 'backpack',
        ]
        );
      Role::create(
        [
            'name' => 'Teacher',
            'guard_name' => 'backpack',
        ]
      );
      Role::create(
        [
            'name' => 'Parent',
            'guard_name' => 'backpack',
        ]
      );
      Role::create(
        [
            'name' => 'Student',
            'guard_name' => 'backpack',
        ]
      );
    }
}

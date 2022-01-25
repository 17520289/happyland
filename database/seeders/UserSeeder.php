<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;
use App\Models\Address;
use DB;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \DB::table('users')->delete();
        \DB::table('addresses')->delete();
        $this->createAdmin();
        $this->createTeacher();
        $this->createParent();
        $this->createStudent();
        $this->createSuperAdmin();
    }
    private function createSuperAdmin()
    {
        DB::beginTransaction();
        try {
            $address = Address::create([
                'street' => '',
                'city' => '',
                'state' => '',
                'postal_code' => 0,
                'country' => ''
            ]);
            $user = User::create([
                'name' => 'Super Admin',
                'address_id' => $address->id,
                'email' => 'superadmin@happyland.com',
                'status' => 'active',
                'password' => Hash::make('12345678')
            ]);
          
            $user->assignRole('Super Admin');
            
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            
            throw new Exception($e->getMessage());
        }
      
    }
    private function createAdmin()
    {
        DB::beginTransaction();
        try {
            $address = Address::create([
                'street' => '',
                'city' => '',
                'state' => '',
                'postal_code' => 0,
                'country' => ''
            ]);
            $user = User::create([
                'name' => 'Admin',
                'address_id' => $address->id,
                'email' => 'admin@happyland.com',
                'status' => 'active',
                'password' => Hash::make('12345678')
            ]);
          
            $user->assignRole('Admin');
            
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            
            throw new Exception($e->getMessage());
        }
      
    }
    private function createTeacher()
    {
        DB::beginTransaction();
        try {
            $address = Address::create([
                'street' => '',
                'city' => '',
                'state' => '',
                'postal_code' => 0,
                'country' => ''
            ]);
            $user= User::create([
                'name' => 'Teacher',
                'address_id' => $address->id,
            'email' => 'teacher@happyland.com',
            'status' => 'active',
            'password' => Hash::make('12345678')
            ]);
          
            $user->assignRole('Teacher');
            
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            
            throw new Exception($e->getMessage());
        }
       
      
    }
    private function createParent()
    {
        DB::beginTransaction();
        try {
            $address = Address::create([
                'street' => '',
                'city' => '',
                'state' => '',
                'postal_code' => 0,
                'country' => ''
            ]);
            $user= User::create([
                'name' => 'Parent',
                'address_id' => $address->id,
                'email' => 'parent@happyland.com',
                'status' => 'active',
                'password' => Hash::make('12345678')
            ]);
          
            $user->assignRole('Parent');
            
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            
            throw new Exception($e->getMessage());
        }
     
      
    }
    private function createStudent()
    {
        DB::beginTransaction();
        try {
            $address = Address::create([
                'street' => '',
                'city' => '',
                'state' => '',
                'postal_code' => 0,
                'country' => ''
            ]);
            $user= User::create([
                'name' => 'Student',
                'address_id' => $address->id,
                'email' => 'student@happyland.com',
                'status' => 'active',
                'password' => Hash::make('12345678')
            ]);
          
            $user->assignRole('Student');
            
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            
            throw new Exception($e->getMessage());
        }
      
    }
}

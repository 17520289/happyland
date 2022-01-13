<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Permission;
use App\Models\RoleHasPermission;
use App\Models\Role;
class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \DB::table('permissions')->delete();
        \DB::table('role_has_permissions')->delete();
        

        //permissions Admin
        $permissions = ['List Course', 'Create Course', 'Update Course' , 'Delete Course', 'Show Course', 'Show Material',
                            'List Material', 'Create Material', 'Update Material', 'Delete Material'];

        //permission Teacher
        $permissionsTeacher = ['List Course', 'Update Course' , 'Show Course',
                        'List Material', 'Create Material', 'Update Material'];

        //permission Parent
        $permissionsParent = ['List Course',   'List Material', 'Show Course' ];
        
        //permission Student
        $permissionsStudent = ['List Course',   'List Material', 'Show Course' ];

       
        
      
        foreach($permissions as $permission){
            Permission::create(['name'=> $permission , 'guard_name' => 'backpack'] );
        }
        
        //assign permission for admin
        $this->givePermissionToRole( $permissions, 'Admin');
        //assign permission for teacher
        $this->givePermissionToRole( $permissionsTeacher, 'Teacher');
        //assign permission for parent
        $this->givePermissionToRole( $permissionsParent, 'Parent');
        //assign permission for student
        $this->givePermissionToRole( $permissionsStudent, 'Student');



    }

    private function givePermissionToRole($permissions , $role){
        $roleHasPermission = Role::where('name' , $role)->first();
       
        foreach($permissions as $per ){

            $permission = Permission::where('name' , $per)->first();
            
            DB::table('role_has_permissions')->insert(
            ['permission_id' =>  $permission->id, 'role_id' => $roleHasPermission->id]
            );
        }
    }
}

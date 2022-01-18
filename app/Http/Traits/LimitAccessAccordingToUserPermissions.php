<?php

namespace App\Http\Traits;
use App\Models\User;
use App\Models\AccountTypeDetail;
use App\Models\ParentStudent;
trait LimitAccessAccordingToUserPermissions {
    protected function denyAccessIfNoPermission() {
        $user = backpack_user();
        $permission =$this->crud->getCurrentOperation().' '.$this->crud->entity_name;  
        $accountTypeDetail =  AccountTypeDetail::where('user_id', $user->id)->orderBy('id', 'desc')->first();  
        $this->data['accountTypeDetail'] = $accountTypeDetail;
        
        if($permission == ' course'){
            if( $user->hasRole('Admin') != true){
                if($accountTypeDetail !==null){
                    if($accountTypeDetail->status == 'inactive' || backpack_user()->status == 'disable'){
                        return abort(403);
                    }
                }
                else{
                    return abort(403);
                }
            }
           
           
        }else{
            if (!$user->hasPermissionTo(ucwords($permission))  ) {
               
                $this->crud->denyAccess($this->crud->getCurrentOperation());
            }
        }
      
    }
    protected function allowAccessRoleParent(){
        $user = backpack_user();
        $permission =$this->crud->getCurrentOperation().' '.$this->crud->entity_name;  
        $accountTypeDetail =  AccountTypeDetail::where('user_id', $user->id)->orderBy('id', 'desc')->first(); 
        $courses = $user->enrollmentOfChildren()->get()->pluck('course_id')->toArray();
        $course_id = \Route::current()->parameter('id');
        $ChildrenInEll = array_filter($courses, function($v, $k) use($course_id) {
            return  $v == $course_id;
        }, ARRAY_FILTER_USE_BOTH);
        if(sizeof($ChildrenInEll) == 0){
            return abort(403);
        }
    }

   
}
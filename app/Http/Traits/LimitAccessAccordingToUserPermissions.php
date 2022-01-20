<?php

namespace App\Http\Traits;
use App\Models\User;
use App\Models\AccountTypeDetail;
use App\Models\ParentStudent;
use App\Models\Enrollment;
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
    protected function denyAccessIfNoCourse(){
        $courseId = \Route::current()->parameter('id');
        
        if(backpack_user()->hasAnyRole(['Student','Teacher']) && $courseId !=null){
            $enrollments = Enrollment::where('user_id', backpack_user()->id)->where('course_id', $courseId)->get();
            if($enrollments->count() == 0){
                return abort(404);
            } 
        }
    }
   

   
}
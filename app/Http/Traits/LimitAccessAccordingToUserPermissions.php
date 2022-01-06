<?php

namespace App\Http\Traits;
use App\Models\User;
use App\Models\AccountTypeDetail;
trait LimitAccessAccordingToUserPermissions {
    protected function denyAccessIfNoPermission() {
        $user = backpack_user();
        $permission =$this->crud->getCurrentOperation().' '.$this->crud->entity_name;  
        $accountTypeDetail =  AccountTypeDetail::where('user_id', $user->id)->orderBy('id', 'desc')->first();  
        $this->data['accountTypeDetail'] = $accountTypeDetail;
        
        if($permission == ' course'){
            if( $user->hasRole('Admin') != true){
                if($accountTypeDetail !==null){
                    if($accountTypeDetail->status == 'inactive'){
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
   
}
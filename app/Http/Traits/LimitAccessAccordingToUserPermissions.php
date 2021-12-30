<?php

namespace App\Http\Traits;
use App\Models\User;

trait LimitAccessAccordingToUserPermissions {
    protected function denyAccessIfNoPermission() {
        $user = backpack_user();
        $permission =$this->crud->getCurrentOperation().' '.$this->crud->entity_name;    
        if($permission == ' course'){
            $this->crud->allowAccess($this->crud->getCurrentOperation());
        }else{
            if (!$user->hasPermissionTo(ucwords($permission))  ) {
                $this->crud->denyAccess($this->crud->getCurrentOperation());
            }
        }
        
    }
   
}
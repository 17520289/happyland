<?php

namespace App\Http\Traits;
use App\Models\User;
use App\Models\AccountTypeDetail;
trait CheckActiveAccount {
    protected function allowAccessIfActive() {
        $user = backpack_user();
        $accountTypeDetail =  AccountTypeDetail::where('user_id', $user->id)->orderBy('id', 'desc')->first();
        if($accountTypeDetail->status == 'inactive' && $user->hasRole('Admin') != true){
            $this->crud->denyAccess($this->crud->getCurrentOperation());
        }
        $entityName = $this->crud->entity_name;
        if(($entityName == 'Role' || $entityName == 'user' || $entityName == 'Permission') && !backpack_user()->hasRole('Admin'))
        {
            $this->crud->denyAccess($this->crud->getCurrentOperation());
        }
    }
   
}
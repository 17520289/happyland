<?php

namespace App\Http\Traits;
use App\Models\User;

trait AllowAccessOnlyAdmin {
    protected function denyAccessIfNotAdmin() {
        $user = backpack_user();
        $entityName = $this->crud->entity_name;
        if(($entityName == 'Role' || $entityName == 'user' || $entityName == 'Permission') && !backpack_user()->hasRole('Admin'))
        {
            $this->crud->denyAccess($this->crud->getCurrentOperation());
        }
    }
   
}
<?php

namespace App\Http\Traits;
use App\Models\User;

trait AllowAccessOnlyAdmin {
    protected function denyAccessIfNotAdmin() {
        $user = backpack_user();
        $entityName = $this->crud->entity_name;
        if(($entityName == 'Role' || $entityName == 'user' || $entityName == 'Permission') && !backpack_user()->hasAnyRole(['Super Admin','Admin']))
        {
            $this->crud->denyAccess($this->crud->getCurrentOperation());
        }
    }
    protected function denyAccessIfNotSuperAdmin() {
        $user = backpack_user();
        $entityName = $this->crud->entity_name;
        if(($entityName == 'Role' || $entityName == 'Permission') && !backpack_user()->hasRole('Super Admin'))
        {
            $this->crud->denyAccess($this->crud->getCurrentOperation());
        }
    }
}
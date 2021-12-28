<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;


use Illuminate\Support\Str;
use App\Http\Requests\UserUpdateCrudRequest as UpdateRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Backpack\PermissionManager\app\Http\Controllers\UserCrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
use Backpack\PermissionManager\app\Http\Requests\UserStoreCrudRequest as StoreRequest;

use Illuminate\Support\Facades\Hash;
use App\Models\Address;
use App\Models\User;
use App\Models\Enrollment;
use App\Models\GroupEnrollment;
use Illuminate\Support\Facades\Validator;
use App\Http\Traits\EditProfileOperation;
use App\Http\Traits\AllowAccessOnlyAdmin;
use App\Http\Traits\CreateOperation;
use App\Http\Traits\UpdateOperation;
use Backpack\CRUD\app\Http\Requests\ChangePasswordRequest;

class UserController extends UserCrudController 
{
    
    use AllowAccessOnlyAdmin;
    use CreateOperation  { store as traitStoreCustom; }
    use UpdateOperation  { store as traitUpdateCustom; }
    use \Backpack\CRUD\app\Http\Controllers\Operations\InlineCreateOperation;
    public function setup()
    {
       
        CRUD::setModel(\App\Models\User::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/user');
        CRUD::setEntityNameStrings('user', 'users');
        $this->denyAccessIfNotAdmin();
       
        if($this->crud->getCurrentOperation() == 'update'){
            $id = \Route::current()->parameter('id');
            if((backpack_user()->id == $id) || backpack_user()->hasRole('Admin')){
                $this->crud->allowAccess('update');
            }else{
                abort(403, 'Access denied');
            }
        }
       
        if(backpack_user()->hasRole('Teacher')){
            $this->crud->allowAccess('show');
        }
       
        if(!backpack_user()->hasRole('Admin')){
            $this->crud->denyAccess( 'create');
            $this->crud->denyAccess( 'update');
            $this->crud->denyAccess( 'delete');
        }
      
      
    }
    public function setupListOperation()
    {
       
        $this->crud->addColumns([
            [
                'name'  => 'name',
                'label' => trans('backpack::permissionmanager.name'),
                'type'  => 'text',
            ],
            [
                'name'  => 'email',
                'label' => trans('backpack::permissionmanager.email'),
                'type'  => 'email',
            ],
            [ // n-n relationship (with pivot table)
                'label'     => trans('backpack::permissionmanager.roles'), // Table column heading
                'type'      => 'select_multiple',
                'name'      => 'roles', // the method that defines the relationship in your Model
                'entity'    => 'roles', // the method that defines the relationship in your Model
                'attribute' => 'name', // foreign key attribute that is shown to user
                'model'     => config('permission.models.role'), // foreign key model
            ],
            [ // n-n relationship (with pivot table)
                'label'     => trans('backpack::permissionmanager.extra_permissions'), // Table column heading
                'type'      => 'select_multiple',
                'name'      => 'permissions', // the method that defines the relationship in your Model
                'entity'    => 'permissions', // the method that defines the relationship in your Model
                'attribute' => 'name', // foreign key attribute that is shown to user
                'model'     => config('permission.models.permission'), // foreign key model
            ],
        ]);

        // Role Filter
        $this->crud->addFilter(
            [
                'name'  => 'role',
                'type'  => 'dropdown',
                'label' => trans('backpack::permissionmanager.role'),
            ],
            config('permission.models.role')::all()->pluck('name', 'id')->toArray(),
            function ($value) { // if the filter is active
                $this->crud->addClause('whereHas', 'roles', function ($query) use ($value) {
                    $query->where('role_id', '=', $value);
                });
            }
        );

        // Extra Permission Filter
        $this->crud->addFilter(
            [
                'name'  => 'permissions',
                'type'  => 'select2',
                'label' => trans('backpack::permissionmanager.extra_permissions'),
            ],
            config('permission.models.permission')::all()->pluck('name', 'id')->toArray(),
            function ($value) { // if the filter is active
                $this->crud->addClause('whereHas', 'permissions', function ($query) use ($value) {
                    $query->where('permission_id', '=', $value);
                });
            }
        );
      
        
    }

   
  
 
    public function setupCreateOperation()
    {
      
        $this->addUserFields();
      
        $this->crud->setValidation(StoreRequest::class);
        
    }

    public function setupUpdateOperation()
    {
       
        $this->addUserFields();
        $this->crud->setValidation(UpdateRequest::class);
        $this->crud->setEditView('admin.user.edit');
        
    }
        /**
     * Store a newly created resource in the database.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store()
    {
        $request = $this->crud->getRequest();
        
        $address = Address::create([
            'street' => $request->street,
            'city' => $request->city,
            'state' => $request->state,
            'postal_code' => $request->postal_code,
            'country' => $request->country,
        ]);
       
       
        $this->crud->setRequest($this->crud->validateRequest());
      
        $this->crud->setRequest($this->handlePasswordInput($this->crud->getRequest()));
       
        $this->crud->unsetValidation(); // validation has already been run
        
        $store = $this->traitStoreCustom($address->id);

       
        $entryId = $this->data['entry']->id;
   
      
        return $store;
    }
       /**
     * Handle password input fields.
     */
    protected function handlePasswordInput($request)
    {
        
        if(backpack_user()->hasRole('Admin') && backpack_user()->id != \Route::current()->parameter('id') ){
            $request->request->remove('password_confirmation');
            $request->request->remove('roles_show');
            $request->request->remove('permissions_show');
    
            // Encrypt password if specified.
            if ($request->input('password')) {
                $request->request->set('password', Hash::make($request->input('password')));
            } else {
                $request->request->remove('password');
            }
        }
        else{
            if ($request->input('password')) {
                $request->request->set('password', Hash::make($request->input('password')));
            } else {
                $request->request->remove('password');
            }
        }
        // Remove fields not present on the user.
       
       
        return $request;
    }
    /**
     * Update the specified resource in the database.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update()
    {
        $user_id = \Route::current()->parameter('id');
        $this->crud->setRequest($this->crud->validateRequest());
       $this->crud->setRequest($this->handlePasswordInput($this->crud->getRequest()));
      
        $this->crud->unsetValidation(); // validation has already been run
       
        $user = User::find($user_id);
        $request = $this->crud->getRequest();

        //update address 
        $address = Address::find($user->address_id);
        $address->street = $request->street;
        $address->city = $request->city;
        $address->state = $request->state;
        $address->postal_code = $request->postal_code;
        $address->country = $request->country;
        $address->save();
        return $this->traitUpdate();
    }


    protected function addFieldUpdatePwd(){
        $id = \Route::current()->parameter('id');
        if((backpack_user()->id == $id) && $this->crud->getCurrentOperation() == 'update'){
             //field for user update password profile  (old pass, new pass, confirm pass)
            return $updatePwd = [
               
                [
                    'name'  => 'old_password',
                    'label' => 'Old password',
                    'type'  => 'password',
                    'tab'             => 'Login Infomation',
                ],
                [
                    'name'  => 'password',
                    'label' => 'New password',
                    'type'  => 'password',
                    'tab'             => 'Login Infomation',
                ],
                [
                    'name'  => 'password_confirmation',
                    'label' => 'Confirm password',
                    'type'  => 'password',
                    'tab'             => 'Login Infomation',
                ],
            ];
        }else{
            return $updatePwd = [
                [
                    'name'  => 'password',
                    'label' => trans('backpack::permissionmanager.password'),
                    'type'  => 'password',
                    'tab'             => 'Login Infomation',
                ],
                [
                    'name'  => 'password_confirmation',
                    'label' => trans('backpack::permissionmanager.password_confirmation'),
                    'type'  => 'password',
                    'tab'             => 'Login Infomation',
                ],
            ];
        }
        
    }
    protected function addUserFields()
    {
        $fields = [
            [
                'name'  => 'name',
                'label' => trans('backpack::permissionmanager.name'),
                'type'  => 'text',
                'tab'             => 'Login Infomation',
            ],
            [
                'name'  => 'full_name',
                'label' => 'Full Name',
                'type'  => 'text',
                'tab'             => 'Login Infomation',
            ],
            [
                'name'  => 'email',
                'label' => trans('backpack::permissionmanager.email'),
                'type'  => 'email',
                'tab'             => 'Login Infomation',
            ],
        ];
        $fieldsPwd = $this->addFieldUpdatePwd();
       
        $image =  [ 
           
            [
                'label' => "Profile Image",
                'name' => "image",
                'type' => 'image',
                'crop' => true, // set to true to allow cropping, false to disable
                'aspect_ratio' => 1, // omit or set to 0 to allow any aspect ratio
                // 'disk'      => 's3_bucket', // in case you need to show images from a different disk
                // 'prefix'    => 'uploads/images/profile_pictures/' // in case your db value is only the file name (no path), you can use this to prepend your path to the image src (in HTML), before it's shown to the user;
                'tab'             => 'Login Infomation',
            ],
            [
                'name'  => 'phone',
                'label' => 'Phone',
                'type'  => 'text',
                'tab'             => 'Details',
            ]
        ];
        if($this->crud->getCurrentOperation() == 'update'){
            $user = User::find(\Route::current()->parameter('id'));
            $addressOld = Address::find($user->address_id);
        }
       
        $address = [
            [
                'name'  => 'address_id',
                'label' => 'address id',
                'type'  => 'hidden',
                'tab'             => 'Details',
            ],
            [
                'name'  => 'street',
                'label' => 'Street',
                'type'  => 'text',
                'tab'             => 'Details',
                'default' => isset($addressOld) ? $addressOld->street : '',
            ],
            [
                'name'  => 'city',
                'label' => 'City',
                'type'  => 'text',
                'tab'             => 'Details',
                'default' => isset($addressOld) ? $addressOld->city : '',
            ],
            [
                'name'  => 'state',
                'label' => 'State',
                'type'  => 'text',
                'tab'             => 'Details',
                'default' => isset($addressOld) ? $addressOld->state : '',
            ],
            [
                'name'  => 'postal_code',
                'label' => 'Postal Code',
                'type'  => 'number',
                'tab'             => 'Details',
                'default' => isset($addressOld) ? $addressOld->postal_code : 0,
            ],
            [
                'name'  => 'country',
                'label' => 'country',
                'type'  => 'text',
                'tab'             => 'Details',
                'default' => isset($addressOld) ? $addressOld->country : '',
            ],
            
        ];
       
        if(backpack_user()->hasRole('Admin') && backpack_user()->id != \Route::current()->parameter('id')){
            $permission = [[
                // two interconnected entities
                'label'             => trans('backpack::permissionmanager.user_role_permission'),
                'field_unique_name' => 'user_role_permission',
                'type'              => 'checklist_dependency',
                'name'              => ['roles', 'permissions'],
                'subfields'         => [
                    'primary' => [
                        'label'            => trans('backpack::permissionmanager.roles'),
                        'name'             => 'roles', // the method that defines the relationship in your Model
                        'entity'           => 'roles', // the method that defines the relationship in your Model
                        'entity_secondary' => 'permissions', // the method that defines the relationship in your Model
                        'attribute'        => 'name', // foreign key attribute that is shown to user
                        'model'            => config('permission.models.role'), // foreign key model
                        'pivot'            => true, // on create&update, do you need to add/delete pivot table entries?]
                        'number_columns'   => 3, //can be 1,2,3,4,6
                    ],
                    'secondary' => [
                        'label'          => ucfirst(trans('backpack::permissionmanager.permission_singular')),
                        'name'           => 'permissions', // the method that defines the relationship in your Model
                        'entity'         => 'permissions', // the method that defines the relationship in your Model
                        'entity_primary' => 'roles', // the method that defines the relationship in your Model
                        'attribute'      => 'name', // foreign key attribute that is shown to user
                        'model'          => config('permission.models.permission'), // foreign key model
                        'pivot'          => true, // on create&update, do you need to add/delete pivot table entries?]
                        'number_columns' => 3, //can be 1,2,3,4,6
                    ],
                ],
                'tab'             => 'Role & Permissions',
            ],];
        }else{
            $permission = [];
        }
        $this->crud->addFields(array_merge($fields, $fieldsPwd, $image, $address, $permission));

        
    }
    
    

}

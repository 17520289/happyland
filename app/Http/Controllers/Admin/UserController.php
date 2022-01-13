<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;

use DB;
use Illuminate\Support\Str;
use App\Http\Requests\UserUpdateCrudRequest as UpdateRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Backpack\PermissionManager\app\Http\Controllers\UserCrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
use App\Http\Requests\UserStoreCrudRequest as StoreRequest;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use App\Models\Address;
use App\Models\User;
use App\Models\Enrollment;
use App\Models\GroupEnrollment;
use App\Models\AccountType;
use Illuminate\Support\Facades\Validator;
use App\Http\Traits\EditProfileOperation;
use App\Http\Traits\AllowAccessOnlyAdmin;
use App\Http\Traits\CreateOperation;
use App\Http\Traits\UpdateOperation;
use App\Models\AccountTypeDetail;


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
        $id = \Route::current()->parameter('id');
        if($this->crud->getCurrentOperation() == 'update'){
            if((backpack_user()->id == $id) || backpack_user()->hasRole('Admin')){
                $this->crud->allowAccess('update');
            }else{
                $this->crud->denyAccess( 'create');
            }
        }
       
        if(backpack_user()->hasRole('Teacher')){
            $this->crud->allowAccess('show');
        }
       
        if(!backpack_user()->hasRole('Admin')){
            $this->crud->denyAccess( 'create');
            $this->crud->denyAccess( 'delete');
        }

        //allow teacher edit user in course
        if(backpack_user()->hasRole('Teacher')){
            $enrollment =  Enrollment::where('user_id', backpack_user()->id )->first();
            if($enrollment !=null){
                if(Enrollment::where('user_id', $id)->where('course_id', $enrollment->course_id)->first() != null ){
                    $this->crud->allowAccess('update');
                }
            }
           
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
                'type'  => 'string',
            ],
            [ // n-n relationship (with pivot table)
                'label'     => trans('backpack::permissionmanager.roles'), // Table column heading
                'type'      => 'select_multiple',
                'name'      => 'roles', // the method that defines the relationship in your Model
                'entity'    => 'roles', // the method that defines the relationship in your Model
                'attribute' => 'name', // foreign key attribute that is shown to user
                'model'     => config('permission.models.role'), // foreign key model
            ],
            // [ // n-n relationship (with pivot table)
            //     'label'     => trans('backpack::permissionmanager.extra_permissions'), // Table column heading
            //     'type'      => 'select_multiple',
            //     'name'      => 'permissions', // the method that defines the relationship in your Model
            //     'entity'    => 'permissions', // the method that defines the relationship in your Model
            //     'attribute' => 'name', // foreign key attribute that is shown to user
            //     'model'     => config('permission.models.permission'), // foreign key model
            // ],
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
      
        $this->crud->addColumn([   
            // CustomHTML
            'name'     => 'accout_type',
            'label'    => 'Account Type',
            'type'     => 'account_type',
            'escaped' => true ,
        ]);
        $this->crud->addColumn([   
            // CustomHTML
            'name'     => 'status',
            'label'    => 'Status',
            'type'     => 'string',
        ]);
        $this->crud->addColumn([   
            // CustomHTML
            'name'     => 'start_time',
            'label'    => 'Start Time',
            'type'     => 'start_time_html',
            'escaped' => true ,   
        ]);
        $this->crud->addColumn([ 
            // CustomHTML
            'name'     => 'end_time',
            'label'    => 'End Time',
            'type'     => 'end_time_html',
            'escaped' => true ,
            
      ]);

        
    }

   
  
 
    public function setupCreateOperation()
    {
      
        $this->addUserFields();
      
        $this->crud->setValidation(StoreRequest::class);
        
        $this->data['accountTypes'] = AccountType::all()->pluck('duration', 'id');
        $this->crud->setCreateView('admin.user.create');
    }

    public function setupUpdateOperation()
    {
        $user_id =  \Route::current()->parameter('id');
        $this->addUserFields();
        $this->data['accountTypeDetail'] = AccountTypeDetail::where('user_id', $user_id)->orderBy('id', 'desc')->first();
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

        if( AccountType::find($request->account_type_id) == null && $request->status == 'on'){
            \Alert::add('error', 'Account type is required.')->flash();
            return redirect()->back();
        }
        $this->crud->setRequest($this->crud->validateRequest());
      
        $this->crud->setRequest($this->handlePasswordInput($this->crud->getRequest()));
       
        $this->crud->setRequest($this->handleStatus($this->crud->getRequest()));

        $this->crud->unsetValidation(); // validation has already been run
        
        DB::beginTransaction();
        try{
            
            $address = Address::create([
                'street' => $request->street,
                'city' => $request->city,
                'state' => $request->state,
                'postal_code' => $request->postal_code,
                'country' => $request->country,
            ]);
            
            $store = $this->traitStoreCustom($address->id);
        
            $entryId = $this->data['entry']->id;
            if($request->status == 'on'){
                $this->storeAccountTypeDetail($request, $entryId);
            }
            DB::commit();
          } catch (Exception $e) {
              DB::rollBack();
              throw new Exception($e->getMessage());
          }
        
        
        return $store;
    }

    public function storeAccountTypeDetail($request, $user_id){
        $startTime = new Carbon($request->start_time);
        $endTime = new Carbon($request->start_time);
        $duration = AccountType::find($request->account_type_id)->duration;
        $endTime = $endTime->addDays($duration);
        $toDate =  Carbon::now();
        
        $status = $toDate->between($startTime, $endTime) ? 'active' : 'inactive'; 
         //Add account type for user
        $accountTypeDetail = AccountTypeDetail::create([
            'account_type_id'=> $request->account_type_id,
            'user_id' => $user_id,
            'start_time' => $request->start_time,
            'end_time'=> $endTime->toDateString(),
            'status' => $status,
        ]);
    }
  
    protected function handleStatus($request){
        if($request->status == 'on'){
            $startTime = new Carbon($request->start_time);
            $endTime = new Carbon($request->start_time);
            $acocuntType = AccountType::find($request->account_type_id);
            $toDate =  Carbon::now();
            if($acocuntType !=null ){
                $status = $toDate->between($startTime, $endTime->addDays($acocuntType->duration)) ? 'active' : 'pending'; 
            }else{
                $status= 'pending';
            }
           
            // if($request->status == 'on'){
            //     $status = $toDate->between($startTime, $endTime->addDays($duration)) ? 'active' : 'pending'; 
            // }else{
            //     $status = 'disable';
            // }
            $request->request->set('status', $status);
        }else{
            $request->request->set('status', 'disable');
        }

        return $request;
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
        $request = $this->crud->getRequest();
        $user_id = \Route::current()->parameter('id');
        $user = User::find($user_id);
        
        if( AccountType::find($request->account_type_id) == null && $request->status == 'on'){
            \Alert::add('error', 'Account type is required.')->flash();
            return redirect()->back();
        }
        $this->crud->setRequest($this->crud->validateRequest());
        $this->crud->setRequest($this->handlePasswordInput($this->crud->getRequest()));
        $this->crud->setRequest($this->handleStatus($this->crud->getRequest()));
        $this->crud->unsetValidation(); // validation has already been run

        //update status 
        $user->status = $request->status;
        $user->save();

        //update address 
        $address = Address::find($user->address_id);
        $address->street = $request->street;
        $address->city = $request->city;
        $address->state = $request->state;
        $address->postal_code = $request->postal_code;
        $address->country = $request->country;
        $address->save();

        if(backpack_user()->hasRole('Admin') && backpack_user()->id != \Route::current()->parameter('id') && $request->status != 'disable'){
              //update accountTypeDetail 
            $accountTypeDetailOld = AccountTypeDetail::where('user_id', $user_id)->orderBy('id', 'desc')->first();
            if($accountTypeDetailOld == null){
              
                $this->storeAccountTypeDetail($request, $user->id);
            }else{
                if($accountTypeDetailOld->start_time != $request->start_time." 00:00:00" || $accountTypeDetailOld->account_type_id != $request->account_type_id){
                    //update status of accountTypeDetailOld 
                    $accountTypeDetailOld->update(['status'=>'inactive']);
                    
                    //store new AccountTypeDetail
                
                    $this->storeAccountTypeDetail($request, $user->id);
                }else{
                    if($accountTypeDetailOld->status != $request->status_account){
                        $accountTypeDetailOld->update(['status'=>$request->status_account]);
                    }
                }
            }
      
        }
      
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
            $accountTypeDetail = AccountTypeDetail::where('user_id', $user->id)->orderBy('id', 'desc')->first();
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
            ],
          
            [   // radio
                'name'        => 'status_account', // the name of the db column
                'label'       => 'Status', // the input label
                'type'        => 'status_account',
                
              
                'default' => isset($accountTypeDetail) ? $accountTypeDetail->status : 'active',
                'inline'      => true,
                'tab'             => 'Active / InActive',
            ],
            
        ];
        }else{
            $permission = [];
        }
        $this->crud->addFields(array_merge($fields, $fieldsPwd, $image, $address, $permission));

        
    }


    
    

}

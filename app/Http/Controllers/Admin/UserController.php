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
use App\Models\ParentStudent;
use App\Models\Role;
use App\Models\Grade;
use Backpack\CRUD\app\Http\Requests\ChangePasswordRequest;

class UserController extends UserCrudController 
{
    
    use AllowAccessOnlyAdmin;
    
    use CreateOperation  { store as traitStoreCustom; }
    use UpdateOperation  { store as traitUpdateCustom; }
    use \Backpack\CRUD\app\Http\Controllers\Operations\InlineCreateOperation;
    public function setup()
    {
        $language = \Session::get('locale', config('app.locale'));
        // Lấy dữ liệu lưu trong Session, không có thì trả về default lấy trong config
        config(['app.locale' => $language]);

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
       
        if(!backpack_user()->hasAnyRole(['Admin','Super Admin'])){
            $this->crud->denyAccess( 'create');
            $this->crud->denyAccess( 'delete');
            $this->crud->denyAccess( 'list');
        }

        //allow teacher edit user in course
        if(backpack_user()->hasRole('Teacher')){
            $this->crud->allowAccess('show');
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
        
       
        // $this->crud->addClause('whereHas', 'roles', function ($query)  {
        //         $query->where('name', '!=', 'Super Admin');
        //       });
         
        $this->crud->addColumns([
            [
                'name'  => 'fullName',
                'label' => trans('backpack::crud.fullName'),
                'type'  => 'full_name',
                'searchLogic' => function ($query, $column, $searchTerm) {
                    $query->orWhere('name', 'like', '%'.$searchTerm.'%');
                }
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
            'label'    => trans('backpack::base.Accounttype'),
            'type'     => 'account_type',
            'escaped' => true ,
        ]);
        $this->crud->addColumn([   
            // CustomHTML
            'name'     => 'status',
            'label'    => trans('backpack::crud.status'),
            'type'     => 'string',
        ]);
        $this->crud->addColumn([   
            // CustomHTML
            'name'     => 'start_time',
            'label'    => trans('backpack::crud.startTime'),
            'type'     => 'start_time_html',
            'escaped' => true ,   
        ]);
        $this->crud->addColumn([ 
            // CustomHTML
            'name'     => 'end_time',
            'label'    => trans('backpack::crud.endTime'),
            'type'     => 'end_time_html',
            'escaped' => true ,
            
      ]);

      $this->crud->removeButton('delete');
      $this->crud->removeButton('update');
      $this->crud->addButton('line', 'update', 'view', 'admin.user.buttons.update', 'end');
      $this->crud->addButton('line', 'delete', 'view', 'admin.user.buttons.delete', 'end');
     
    
      $this->crud->setListView('admin.user.list');
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
        $this->data['accountType'] = AccountType::find($this->data['accountTypeDetail']->account_type_id ?? null);
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

            $roleStudent = array_filter($request->roles_show, function($v, $k) {
                return $v == '5'  ;
            }, ARRAY_FILTER_USE_BOTH);
            //tao quan he giua hoc sinh va phu huynh. table parent_students
            if(sizeof($roleStudent) == 1){
                ParentStudent::create([
                    "parent_id" => $request->parent_id,
                    "student_id" => $entryId,
                ]);  
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
           
            $accountType = AccountType::find($request->account_type_id);
            $endTime = $endTime->addDays($accountType->duration);
            $toDate =  Carbon::now();
            if($accountType !=null ){
                $status = $toDate->between($startTime, $endTime) ? 'active' : 'pending'; 
            }else{
                $status= 'pending';
            }
            if($toDate->greaterThanOrEqualTo($endTime)){
                $status= 'inactive';
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

        DB::beginTransaction();
        try{
            //update status 
            if(backpack_user()->id != \Route::current()->parameter('id')){
                $user->status = $this->crud->getRequest()->status;
                $user->save();
              
            }  

            //update address 
            $address = Address::find($user->address_id);
            $address->street = $request->street;
            $address->city = $request->city;
            $address->state = $request->state;
            $address->postal_code = $request->postal_code;
            $address->country = $request->country;
            $address->save();
            
            //update parent for role student
            if(backpack_user()->hasRole(['Admin', 'Super Admin']) && backpack_user()->id != \Route::current()->parameter('id')){
                    $roleStudent = array_filter($request->roles_show, function($v, $k) {
                        $nameRole = Role::where('name' , 'Student')->first();
                        return $v == $nameRole->id  ;;
                    }, ARRAY_FILTER_USE_BOTH);
                    //cap nhat hoac tao quan he giua hoc sinh va phu huynh. table parent_students
                if(sizeof($roleStudent) == 1){
                    $parentStudent = ParentStudent::where('student_id', $user_id )->first();
                    if($parentStudent != null){
                        $parentStudent->update(["parent_id"=>$request->parent_id]);
                    }else{
                        ParentStudent::create([
                            "parent_id" => $request->parent_id,
                            "student_id" => $user_id,
                        ]);  
                    }
                
                }
            }
        
          
            if(backpack_user()->hasRole('Admin') && backpack_user()->id != \Route::current()->parameter('id') && $this->crud->getRequest()->status != 'disable'){
              
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
                    }
                }
        
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage());
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
                'label' => trans('backpack::crud.firstName'),
                'type'  => 'text',
                'tab'             => 'Login Infomation',
            ],
            [
                'name'  => 'full_name',
                'label' => trans('backpack::crud.lastName'),
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
            $parentStudent = ParentStudent::where('student_id', $user->id)->first();
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
       
        if(backpack_user()->hasAnyRole(['Super Admin','Admin']) && backpack_user()->id != \Route::current()->parameter('id')){
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
                'view_namespace'=> 'admin.user.fields',
                'tab'             => 'Role & Permissions',
            ],
           
            [  // Select
                'label'     => "Parent",
                'type'      => 'select2',
                'name'      => 'parent_id', // the db column for the foreign key
             
                // optional
                // 'entity' should point to the method that defines the relationship in your Model
                // defining entity will make Backpack guess 'model' and 'attribute'
                'entity'    => 'parent',
              
                // optional - manually specify the related model and attribute
                'model'     => "App\Models\User", // related model
                'attribute' => 'name', // foreign key attribute that is shown to user
                'default'   => isset($parentStudent) ? $parentStudent->parent_id : null,
                // optional - force the related options to be a custom query, instead of all();
                'options'   => (function ($query) {
                     return $query->whereHas('roles', function ($q) {
                        $q->where('name', 'Parent');
                    })->get();
                 }), //  you can use this to filter the results show in the select
                 'view_namespace' => 'admin.user.fields',
                 'tab'             => 'Role & Permissions',
                 
             ],
          
            [   // radio
                'name'        => 'status_account', // the name of the db column
                'label'       => 'Status', // the input label
                'type'        => 'status_account',
                
              
                'default' => isset($accountTypeDetail) ? $accountTypeDetail->status : 'active',
                'inline'      => true,
                'tab'             => 'Active / Inactive',
            ],
            
        ];
        }else{
            $permission = [];
        }
        $this->crud->addFields(array_merge($fields, $fieldsPwd, $image, $address, $permission));

        
    }
    public function updateStatus(Request $request){
        
        $user = User::find($request->user_id);
        if($user == null || $user->hasRole('Super Admin')){
            return abort(404);
        }
        
        if($request->action_active == 'true'){
            $user->deleted_at = null;
            if($user->hasRole('Admin')){
                $user->status = 'active';
            }
        }else{
            $user->deleted_at = Carbon::now();
            $user->status = 'disable';
            Grade::where('user_id', $user->id)->update(['status' => 'inactive']);
        }
        $user->save();
        return response()->json(['success'=>'Successfully']);
       
    }


    
    

}

<?php

namespace App\Http\Requests;


use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use App\Models\Role;
class UserUpdateCrudRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // only allow updates if the user is logged in
        return backpack_auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
      
        $id = $this->get('id') ?? request()->route('id');
      
        $rules = [
            'email'    => 'required|unique:'.config('permission.table_names.users', 'users').',email,'.$id,
            'name'     => 'required',
            'full_name'     => 'required',
            'password' => 'confirmed',
            'roles_show' => 'required'
            
        ];
        if($this->input('status') == 'on'){
          $rules['start_time'] = 'required';
           
        }
         return $rules;
    }
    public function withValidator($validator)
    {
        $id = $this->get('id') ?? request()->route('id');
        if(backpack_user()->id == $id){
        $validator->after(function ($validator) {
            // check old password matches
            if($this->input('old_password') != ''){
                if (! Hash::check($this->input('old_password'), backpack_auth()->user()->password)) {
                    $validator->    errors()->add('old_password', trans('backpack::base.old_password_incorrect'));
                }else{
                    if($this->password != $this->password_confirmation){
                        $validator->    errors()->add('password_confirmation', 'The confirm password and new password must match.');
                    }
                }
               
            }
           
        });
        }
        $validator->after(function ($validator) {
           
            if(backpack_user()->hasAnyRole(['Super Admin','Admin']) && backpack_user()->id != \Route::current()->parameter('id') && $this->input('roles_show') != null){

                $roleStudent = array_filter($this->input('roles_show'), function($v, $k) {
                   $nameRole = Role::where('name' , 'Student')->first();
                    return $v == $nameRole->id  ;
                }, ARRAY_FILTER_USE_BOTH);
              
                if(sizeof($roleStudent) == 1){
                   
                    if($this->input('parent_id') == null){
                       
                        $validator->    errors()->add('parent_id', 'Please add parent to your student account.');
                    }
                    
                }
            }
          
       
        });
    }
}

<?php

namespace  App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreCrudRequest extends FormRequest
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
        return [
            'email'    => 'required|unique:'.config('permission.table_names.users', 'users').',email',
            'name'     => 'required',
            'password' => 'required|confirmed',
            'roles_show' => 'required'
            
        ];
    }
    public function withValidator($validator)
    {
      
        
        $validator->after(function ($validator) {
            $roleStudent = array_filter($this->input('roles_show'), function($v, $k) {
                return $v == '4'  ;
            }, ARRAY_FILTER_USE_BOTH);
            if(sizeof($roleStudent) == 1){
                if($this->input('parent_id') == null){
                    $validator->    errors()->add('old_password', 'Add student account need choose a parent.');
                }
                
            }
          
        //     if($this->input('old_password') != ''){
        //         if (! Hash::check($this->input('old_password'), backpack_auth()->user()->password)) {
        //             $validator->    errors()->add('old_password', trans('backpack::base.old_password_incorrect'));
        //         }else{
        //             if($this->password != $this->password_confirmation){
        //                 $validator->    errors()->add('password_confirmation', 'The confirm password and new password must match.');
        //             }
        //         }
               
        //     }
           
        });
         
    }
   
}

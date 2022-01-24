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
        if($this->input('roles_show') != null){
            $validator->after(function ($validator) {
                $roleStudent = array_filter($this->input('roles_show'), function($v, $k) {
                    return $v == '4'  ;
                }, ARRAY_FILTER_USE_BOTH);
                if(sizeof($roleStudent) == 1){
                    if($this->input('parent_id') == null){
                        $validator->    errors()->add('old_password', 'Add student account need choose a parent.');
                    }
                    
                }
            
            });
         }
         
    }
   
}

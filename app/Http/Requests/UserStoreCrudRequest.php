<?php

namespace  App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Role;
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
        $rules = [
            'email'    => 'required|unique:'.config('permission.table_names.users', 'users').',email',
            'name'     => 'required',
            'full_name'     => 'required',
            'password' => 'required|confirmed',
            'roles_show' => 'required'
            
        ];
        if($this->input('status') == 'on'){
          $rules['start_time'] = 'required';
           
        }
         return $rules;
    }
    public function withValidator($validator)
    {
        //   dd($this->input('roles_show'));
        if($this->input('roles_show') != null){
            $validator->after(function ($validator) {
                $roleStudent = array_filter($this->input('roles_show'), function($v, $k) {
                    $nameRole = Role::where('name' , 'Student')->first();
                    return $v == $nameRole->id  ;
                }, ARRAY_FILTER_USE_BOTH);
                if(sizeof($roleStudent) == 1){
                    if($this->input('parent_id') == null){
                        $validator->    errors()->add('parent_id', 'Please add parent to your student account.');
                    }
                    
                }
            
            });
         }
        
        
    }
   
}

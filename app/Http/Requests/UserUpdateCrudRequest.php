<?php

namespace App\Http\Requests;


use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;

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
        return [
            'email'    => 'required|unique:'.config('permission.table_names.users', 'users').',email,'.$id,
            'name'     => 'required',
            'password' => 'confirmed',
            'full_name' => 'required',
        ];
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
    }
}

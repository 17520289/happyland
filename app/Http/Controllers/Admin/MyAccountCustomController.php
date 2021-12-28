<?php

namespace App\Http\Controllers\Admin;

use Alert;
use App\Http\Requests\AccountInfoRequest;
use Backpack\CRUD\app\Http\Requests\ChangePasswordRequest;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Backpack\CRUD\app\Http\Controllers\MyAccountController;
use App\Models\Address;
use Illuminate\Support\Str;
use Intervention\Image\ImageManagerStatic as Image;

use Illuminate\Http\Request;
  

class MyAccountCustomController extends Controller
{
    protected $data = [];

    public function __construct()
    {
        $this->middleware(backpack_middleware());
    }

     /**
     * Show the personal information  to user.
     */
    public function getViewAccountInfo(){
        $this->data['title'] = trans('backpack::base.my_account');
        $this->data['user'] = $this->guard()->user();
        $this->data['address'] = Address::where('user_id', $this->data['user']->id )->first();
        
        return view('account.show_my_account', $this->data);
    }
    /**
     * Show the user a form to change their personal information & password.
     */
    public function getAccountInfoForm()
    {
        $this->data['title'] = trans('backpack::base.my_account');
        $this->data['user'] = $this->guard()->user();
        $this->data['address'] = Address::find(1);
        
        return view('account.edit_my_account', $this->data);
    }

    /**
     * Save the modified personal information for a user.
     */
    public function postAccountInfoForm(Request  $request)
    {
     
        $result = $this->guard()->user()->update($request->except(['_token']));
        // $user = $this->guard()->user();
      
        // $request->validate([
        //     'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        // ]);
       
        // $path = $request->file('image')->store('images', 'local');

        //update address
        $address = $this->guard()->user()->address;
        $address->street = $request->street;
        $address->city = $request->city;
        $address->state = $request->state;
        $address->postal_code = $request->postal_code;
        $address->country = $request->country;
        $address->save();

        if ($result) {
            Alert::success(trans('backpack::base.account_updated'))->flash();
        } else {
            Alert::error(trans('backpack::base.error_saving'))->flash();
        }

        return redirect()->back();
    }

    /**
     * Save the new password for a user.
     */
    public function postChangePasswordForm(ChangePasswordRequest $request)
    {
        $user = $this->guard()->user();
        $user->password = Hash::make($request->new_password);

        if ($user->save()) {
            Alert::success(trans('backpack::base.account_updated'))->flash();
        } else {
            Alert::error(trans('backpack::base.error_saving'))->flash();
        }

        return redirect()->back();
    }

    /**
     * Get the guard to be used for account manipulation.
     *
     * @return \Illuminate\Contracts\Auth\StatefulGuard
     */
    protected function guard()
    {
        return backpack_auth();
    }
   

}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;
use Config;
use Artisan;
class SettingsController extends Controller
{
    public function index(){
        $this->data['setting']  =  Setting::find(1);
        return view('admin.settings.index', $this->data);
    }
    public function update(Request $request)
    {
        $setting = Setting::find(1);
        if($setting != null){

            // $styles =Config::get('backpack.base.styles'); 
            // $styles[0]= $setting->themes[$request->theme];
           
            
         
            // config([ 'backpack.base.styles' => 'dfasdf' ]);
            // \Artisan::call('config:cache');
            
            $setting->update([
                'url_fb'=> $request->url_fb,
               
                ]);
    
        }else{
            Setting::create([
                'id' => 1,
                'url_fb'=>'https://www.facebook.com/',
                'themes' => [
                    'Purple' => 'packages/backpack/base/css/bundle.css',
                    'Blue' =>'packages/backpack/base/css/blue-bundle.css',
                    'Green' => 'packages/backpack/base/css/custom-backpack-bundle.css'
                  ],
            ]);
        }
        \Alert::add('success', '<strong>Got it</strong><br>This is HTML in a green bubble.')->flash();
        return  redirect()->back();
    }
}

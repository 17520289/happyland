<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
class LocalizationController extends Controller
{
    public function lang_change(Request $request)
    {
       
        App::setLocale($request->lang);
        \Session::put('locale', $request->lang);
      
        return redirect()->back();
    }
}

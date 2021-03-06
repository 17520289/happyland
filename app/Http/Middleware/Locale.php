<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Locale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(backpack_auth()->check()){
        if( \Session::get('locale') == null) \Session::put('locale', backpack_user()->lang);
        $language = \Session::get('locale', backpack_user()->lang);
        // Lấy dữ liệu lưu trong Session, không có thì trả về default lấy trong config
    
        config(['app.locale' => $language]);
        // Chuyển ứng dụng sang ngôn ngữ được chọn
    
        }
        return $next($request);
    }
}

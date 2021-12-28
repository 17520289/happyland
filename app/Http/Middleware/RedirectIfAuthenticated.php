<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @param  string|null  ...$guards
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */

    public function handle(Request $request, Closure $next, $guard = null)
    {
        $guards = empty($guards) ? [null] : $guards;

        // foreach ($guards as $guard) {
        //     if (Auth::guard($guard)->check()) {
        //         return redirect(RouteServiceProvider::HOME);
        //     }
        // }

        // return $next($request);
        if (Auth::guard($guard)->check()) {

        //     $user = auth()->user();
        //     if ($user->hasRole('Admin')) {
        //         return redirect(backpack_url('dashboard'));
        //     }
        //     if ($user->hasRole('Teacher')) {
        //         return redirect(route('teacher.dashboard'));
        //     }
            // if ($user->hasRole('Student')) {
            //     return redirect(route('student.dashboard.index'));
            // }
            // if ($user->hasRole('Parent')) {
            //     return redirect(route('parent.dashboard.index'));
            // }
            return redirect(backpack_url('dashboard'));
        }
        
        // when session expire then it reload user to login page
        if ($request->ajax()) {
            return response('Session Expire', 401);
        }

        return $next($request);
    }
   
}

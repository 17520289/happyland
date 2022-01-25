<?php

namespace App\Http\Middleware;
use Session;
use Closure;
use Illuminate\Http\Request;
use Auth;
class CheckStatus
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
         $response = $next($request);
        //If the status is not active redirect to login 
        if(Auth::check() &&  backpack_user()->status != 'active' && !backpack_user()->hasAnyRole(['Admin', 'Super Admin'])){
            $status = backpack_user()->status;
            $msg = $status == 'inactive' ? "This user's account has expired." : 'This account is not activated.';
             Session::flash('accountInactive', $msg );
             Auth::logout();
            return redirect()->route('backpack.auth.login')->with('success', 'your message,here'); 
        }
        return $response;
    }
}

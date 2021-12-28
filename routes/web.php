<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('/dashboard');
});
// Auth::routes();
// Route::group([
//     'prefix'     => 'teacher',
//     'middleware' => array_merge(
//         (array) config('backpack.base.web_middleware', 'web'),
//         (array) 'role:Teacher',
        
//     ),
//     'namespace'  => 'App\Http\Controllers\Teacher',
// ], function () { // custom Teacher routes
//     Route::crud('course', 'TeacherCourseController');
//     Route::get('dashboard', 'TeacherCourseController@test')->name('teacher.dashboard');
// }); //



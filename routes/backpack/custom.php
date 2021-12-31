<?php

use Illuminate\Support\Facades\Route;

// --------------------------
// Custom Backpack Routes
// --------------------------
// This route file is loaded automatically by Backpack\Base.
// Routes you generate using Backpack\Generators will be placed here.

Route::group([
    'prefix'     => config('backpack.base.route_prefix', 'admin'),
    'middleware' => array_merge(
        (array) config('backpack.base.web_middleware', 'web'),
        (array) backpack_middleware(),
    ),
    'namespace'  => 'App\Http\Controllers\Admin',
], function () { // custom admin routes
    Route::crud('course', 'CourseCrudController');
    Route::crud('material', 'MaterialCrudController');
    if (config('backpack.base.setup_my_account_routes')) {
        Route::get('view-account-info', 'MyAccountCustomController@getViewAccountInfo')->name('backpack.account.info.view');
        Route::get('edit-account-info', 'MyAccountCustomController@getAccountInfoForm')->name('backpack.account.info.edit');
        Route::post('edit-account-info', 'MyAccountCustomController@postAccountInfoForm')->name('backpack.account.info.store');
        Route::post('change-password', 'MyAccountCustomController@postChangePasswordForm')->name('backpack.account.password');
    }
    // Route::crud('user', 'UserCrudController');
    Route::crud('level', 'LevelCrudController');
    Route::crud('permission', 'PermissionCrudController');
    Route::crud('role', 'RoleCrudController');
    Route::crud('user', 'UserCrudController');
    Route::group(['prefix' => 'course'], function (){
        //route couse admin, student
        Route::get('/{id}/list-teacher', 'CourseCrudController@indexListTeacher')->name('course.list-teacher');
        Route::get('/{id}/ajax-list-people/role={role}', 'CourseCrudController@getListPeople')->name('course.ajax-list-people');
        Route::post('/list-people/{id}/role={role}', 'CourseCrudController@postAddPeople')->name('course.postAddPeople');
        Route::get('/{id}/list-student', 'CourseCrudController@indexListStudent')->name('course.list-student');
        Route::post('/{id}/detete-people/userId={userId}', 'CourseCrudController@deletePeopleInCourse')->name('course.deletePeople.post');

        //Route couse Student
        Route::get('/{id}', 'CourseCrudController@getCourse')->name('student.course.get');
        Route::get('/{id}/assessment', 'CourseCrudController@getAssessment')->name('student.assessment.get');
        
    });
   
}); // this should be the absolute last line of this file

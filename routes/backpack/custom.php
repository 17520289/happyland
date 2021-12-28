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
   
}); // this should be the absolute last line of this file

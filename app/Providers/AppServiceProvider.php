<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //

        $this->app->bind(
            \Backpack\CRUD\app\Http\Controllers\MyAccountController::class, 
            \App\Http\Controllers\Admin\MyAccountCustomController::class,
        );
        $this->app->bind(
            \Backpack\PermissionManager\app\Http\Controllers\UserCrudController::class, 
            \App\Http\Controllers\Admin\UserController::class,
        );
        $this->app->bind(
            \Backpack\PermissionManager\app\Http\Controllers\RoleCrudController::class, 
            \App\Http\Controllers\Admin\RoleCrudController::class,
        );
        $this->app->bind(
            \Backpack\PermissionManager\app\Http\Controllers\PermissionCrudController::class, 
            \App\Http\Controllers\Admin\PermissionCrudController::class,
        );
       

    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //

    
    }
}

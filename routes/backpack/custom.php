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
        (array) 'checkstatus',
        (array) 'locale',
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
    
    Route::crud('level', 'LevelCrudController');
    Route::crud('permission', 'PermissionCrudController');
    Route::crud('role', 'RoleCrudController');

   // Route::crud('user', 'UserCrudController');
    Route::crud('user', 'UserCrudController');
    Route::post('/user/update-status', 'UserController@updateStatus')->name('user.update-status.post');
    Route::group(['prefix' => 'course'], function (){
        // Route::get('/{id}/infomations', 'CourseCrudController@getInfomations')->name('course.infomations.get');
        Route::get('/{id}/list-teacher', 'CourseCrudController@indexListTeacher')->name('course.list-teacher');
        Route::get('/{id}/ajax-list-people/role={role}', 'CourseCrudController@getListPeople')->name('course.ajax-list-people');
        Route::post('/list-people/{id}/role={role}', 'CourseCrudController@postAddPeople')->name('course.postAddPeople');
        Route::get('/{id}/list-student', 'CourseCrudController@indexListStudent')->name('course.list-student');
        Route::post('/{id}/detete-people/userId={userId}', 'CourseCrudController@deletePeopleInCourse')->name('course.deletePeople.post');
        Route::get('/{id}/getGrades' , 'CourseCrudController@getGrades')->name('course.grades.get');
        // Route::get('/{id}', 'CourseCrudController@getCourse')->name('student.course.get');
        Route::get('/{id}/assessment', 'CourseCrudController@getAssessment')->name('student.assessment.get');
        //grades
        Route::post('/{id}/addColumnGrade', 'CourseCrudController@postAddColumnGrade')->name('course.grade.addColumn.post');
        Route::get('/{id}/ajax-grades', 'CourseCrudController@getGradesCourse')->name('course.ajax-grades.get');
        Route::post('/{id}/update-grade', 'CourseCrudController@postUpdateGrade')->name('course.update-grade.post');
        Route::post('/{id}/update-column', 'CourseCrudController@postUpdateColumn')->name('course.update-column.post');
        Route::post('/{id}/delete-column', 'CourseCrudController@postDeleteColumn')->name('course.delete-column.post');

        //show information of student
        Route::get('/{id}/student/{student_id}/show' , 'CourseCrudController@showStudent')->name('course.showStudent.get');

        //GET flashcard
        Route::get('/{id}/flash-card', 'CourseCrudController@getFlashCard')->name('course.flashCard.get');
    });
    Route::name('parent.')->prefix('parent')->group( function (){
        Route::get('/{id}/listChildren', 'ParentController@getListChildren')->name('list-children.get');
        Route::get('/{id}/ajax-listChildren', 'ParentController@ajaxListChildren')->name('ajax-listChildren.get');
        Route::get('/{id}/children/{student_id}/course', 'ParentController@getChildrenCourse')->name('childrenCourse.get');
        Route::get('/{id}/course/{course_id}/children/{student_id}/show', 'ParentController@getShowCourse')->name('showCourses.get');
        Route::get('/{id}/course/{course_id}/children/{student_id}/grades', 'ParentController@getGradesChildren')->name('gradeChildren.get');
        Route::get('/{id}/course/{course_id}/children/{student_id}/assessment', 'ParentController@getAssessment')->name('assessmentChildren.get');
        Route::get('/{id}/course/{course_id}/children/{student_id}/flash-card', 'ParentController@getFlashCard')->name('flashCard.get');
    });
    Route::name('settings.')->prefix('settings')->group( function (){
        Route::get('/', 'SettingsController@index')->name('index.get');
        Route::post('/update', 'SettingsController@update')->name('update.post');
    });
    Route::crud('account-type', 'AccountTypeCrudController');

    Route::get('change/lang', 'LocalizationController@lang_change')->name('LangChange');


}); // this should be the absolute last line of this file
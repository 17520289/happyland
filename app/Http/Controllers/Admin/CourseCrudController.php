<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\CourseRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
use App\Http\Traits\LimitAccessAccordingToUserPermissions;
use App\Models\Course;
use App\Models\Enrollment;
/**
 * Class CourseCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class CourseCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;
    use LimitAccessAccordingToUserPermissions;
    /**
     * Configure the CrudPanel object. Apply settings to all operations.
     * 
     * @return void
     */
    public function setup()
    {
        CRUD::setModel(\App\Models\Course::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/course');
        CRUD::setEntityNameStrings('course', 'courses');
        $this->denyAccessIfNoPermission();

        if(!backpack_user()->hasRole('Admin')){
            $this->crud->denyAccess( 'create');
            $this->crud->denyAccess( 'update');
            $this->crud->denyAccess( 'delete');
        }
        // $this->crud->denyAccess( 'create');
        // $this->crud->denyAccess( 'delete');
      

    }

    /**
     * Define what happens when the List operation is loaded.
     * 
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        if(!backpack_user()->hasRole('Admin')){
            $this->crud->addClause('where', 'status', '=', 'publish');
            $courseIds = Enrollment::where('user_id', backpack_user()->id)->pluck('course_id')->toArray();
            $this->crud->addClause('whereIn', 'id', $courseIds );
        }
       
        CRUD::column('id');
        CRUD::column('name');
        CRUD::column('start_date');
        CRUD::column('end_date');
        $this->crud->addColumn([
            'name' => 'status',
            'label' => 'Status',
            'type'        => 'select_from_array',
            'options'     => ['publish' => 'Publish', 'unpublish' => 'UnPublish'],
            'allows_null' => false,
            'default'     => 'publish',
        ]);
        $this->crud->addField([   
            'name' => 'status',
            'label' => 'Status',
            'type'        => 'select_from_array',
            'options'     => ['publish' => 'Publish', 'unpublish' => 'UnPublish'],
            'allows_null' => false,
            'default'     => 'unpublish',
        ]);

        // CRUD::column('status');
        //  CRUD::column('user_id');
        
        // $this->crud->setColumnDetails('user_id', ['label' => "Author", // Table column heading
        // 'type' => "string",
        // 'name' => 'user_id', // the column that contains the ID of that connected entity;
        // 'entity' => 'author', // the method that defines the relationship in your Model
        // 'attribute' => "user_id", // foreign key attribute that is shown to user
        // 'model' => "App\Models\User"]); // adjusts the properties of the passed in column (by name)
      
        // CRUD::column('created_at');
        // CRUD::column('updated_at');

        /**
         * Columns can be defined using the fluent syntax or array syntax:
         * - CRUD::column('price')->type('number');
         * - CRUD::addColumn(['name' => 'price', 'type' => 'number']); 
         */
    }

    /**
     * Define what happens when the Create operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::setValidation(CourseRequest::class);

        // CRUD::field('id');
        CRUD::field('name');
        CRUD::field('start_date');
        CRUD::field('end_date');
        CRUD::field('user_id')->type('hidden')->value(backpack_user()->id); // notice the name is the foreign key attribute
       
        $this->crud->addFields([
            [   
            'name' => 'status',
            'label' => 'Status',
            'type'        => 'select_from_array',
            'options'     => ['publish' => 'Publish', 'unpublish' => 'UnPublish'],
            'allows_null' => false,
            'default'     => 'unpublish',
            ],
            [
                'label' => "Image",
                'name' => "image",
                'type' => 'image',
                'aspect_ratio' => 1, // omit or set to 0 to allow any aspect ratio
                // 'disk'      => 's3_bucket', // in case you need to show images from a different disk
                // 'prefix'    => 'uploads/images/profile_pictures/' // in case your db value is only the file name (no path), you can use this to prepend your path to the image src (in HTML), before it's shown to the user;
               
            ],
        ],);
      
    }

    /**
     * Define what happens when the Update operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
       

    }
    protected function setupShowOperation(){
         
         $this->crud->setshowView('admin.course.show');
    }
    public function getListCourseForTeacher($user_id){
        
    }
}

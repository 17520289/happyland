<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\MaterialRequest;
use App\Http\Requests\MaterialUpdateRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
use App\Http\Traits\LimitAccessAccordingToUserPermissions;

/**
 * Class MaterialCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class MaterialCrudController extends CrudController
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
        CRUD::setModel(\App\Models\Material::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/material');
        CRUD::setEntityNameStrings('material', 'materials');
        $this->denyAccessIfNoPermission();
        if(!backpack_user()->hasPermissionTo('Delete Material')){
            $this->crud->denyAccess( 'delete');
        }
        if(!backpack_user()->hasPermissionTo('Create Material')){
            $this->crud->denyAccess( 'create');
        }
       
        if(!backpack_user()->hasPermissionTo('Update Material')){
            $this->crud->denyAccess( 'update');
        }
        if(!backpack_user()->hasPermissionTo('Show Material')){
            $this->crud->denyAccess( 'show');
        }



    }

    /**
     * Define what happens when the List operation is loaded.
     * 
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        
        $courses = backpack_user()->course()->pluck('id')->toArray();
        if(backpack_user()->hasRole('Teacher')){
            $this->crud->addClause('whereIn','course_id', $courses);
        }
        // CRUD::column('id');
        CRUD::column('title')->label(trans('backpack::crud.title'));
        // CRUD::column('description')->label(trans('backpack::crud.description'));
        // CRUD::column('content');
        CRUD::column('status')->label(trans('backpack::crud.status'));
        // CRUD::column('image')->type('image');
        // CRUD::column('course_id');
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
        
        CRUD::setValidation(MaterialRequest::class);

        CRUD::field('id')->type('hidden');
        CRUD::field('title')->label(trans('backpack::crud.title'));
        CRUD::field('content')->type('ckeditor')->label(trans('backpack::crud.content'));
        // CRUD::field('course_id');
      
        $courses = backpack_user()->course()->pluck('id')->toArray();
        $this->crud->addField(
            [  // Select
                'label'     => trans('backpack::base.course'),
                'type'      => 'select',
                'name'      => 'course_id', // the db column for the foreign key
             
                // optional 
                // 'entity' should point to the method that defines the relationship in your Model
                // defining entity will make Backpack guess 'model' and 'attribute'
                'entity'    => 'course', 
             
                // optional - manually specify the related model and attribute
                'model'     => "App\Models\Course", // related model
                'attribute' => 'name', // foreign key attribute that is shown to user
             
                // optional - force the related options to be a custom query, instead of all();
                'options'   => (function ($query) use ($courses) {
                     return $query->whereIn('id', $courses)->orderBy('name', 'ASC')->get();
                 }), //  you can use this to filter the results show in the select
             ],
        );

        $this->crud->addField([   
            'name' => 'images',
            'label' => trans('backpack::crud.images'),
            'type' => 'upload_multiple',
            
            'upload' => true,
           
        ]);
    
        $this->crud->addField([   // select_from_array
            'name'        => 'status',
            'label'       => trans('backpack::crud.status'),
            'type'        => 'select_from_array',
            'options'     => ['unpublished' => 'Unpublished', 'published' => 'Published'],
            'allows_null' => false,
            'default'     => 'unpublished',
            // 'allows_multiple' => true, // OPTIONAL; needs you to cast this to array in your model;
        ],);
    
        

        /** 
         * Laravel-Backpack/FileManager
         * 
        */
        // $this->crud->addColumn([
        //     'name'          => 'files',
        //     'label'         => 'Files',
        //     'type'          => 'browse_multiple',
        //     'multiple'   => true, // enable/disable the multiple selection functionality
        //     'sortable'   => false, // enable/disable the reordering with drag&drop
        //     'mime_types' => null, // visible mime prefixes; ex. ['image'] or ['application/pdf']
        // ]);

        // $this->crud->addField([   
        //     'name'          => 'files',
        //     'label'         => 'Files',
        //     'type'          => 'browse_multiple',
        //     'multiple'   => true, // enable/disable the multiple selection functionality
        //     'sortable'   => false, // enable/disable the reordering with drag&drop
        //     'mime_types' => null, // visible mime prefixes; ex. ['image'] or ['application/pdf']
        // ], 'both');


        // CRUD::field('created_at');
        // CRUD::field('updated_at');

        /**
         * Fields can be defined using the fluent syntax or array syntax:
         * - CRUD::field('price')->type('number');
         * - CRUD::addField(['name' => 'price', 'type' => 'number'])); 
         */
    }

    /**
     * Define what happens when the Update operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupUpdateOperation()
    {
        CRUD::setValidation(MaterialUpdateRequest::class);
        $this->setupCreateOperation();
        // $this->crud->removeField('course_id');
        
        $this->crud->setEditView('admin.material.edit');
    }
      /**
     * Define what happens when the Update operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-show
     * @return void
     */
    protected function setupShowOperation()
    {
       
        $this->crud->setShowView('admin.material.show');
    }
}

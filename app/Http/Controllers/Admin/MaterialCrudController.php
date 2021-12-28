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


    }

    /**
     * Define what happens when the List operation is loaded.
     * 
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        if(backpack_user()->hasAnyRole(['Student', 'Parent'])){
            $this->crud->addClause('where', 'status', '=', 'publish');
        }
        CRUD::column('id');
        CRUD::column('title');
        CRUD::column('description');
        // CRUD::column('content');
        CRUD::column('status');
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
        CRUD::field('title');
        CRUD::field('content')->type('ckeditor');
        CRUD::field('course_id');
        $this->crud->addField(
            [  // Select
                'label'     => "Level",
                'type'      => 'select',
                'name'      => 'level_id', // the db column for the foreign key
             
                // optional 
                // 'entity' should point to the method that defines the relationship in your Model
                // defining entity will make Backpack guess 'model' and 'attribute'
                'entity'    => 'level', 
             
                // optional - manually specify the related model and attribute
                'model'     => "App\Models\Level", // related model
                'attribute' => 'name', // foreign key attribute that is shown to user
             
                // optional - force the related options to be a custom query, instead of all();
                'options'   => (function ($query) {
                     return $query->orderBy('name', 'ASC')->get();
                 }), //  you can use this to filter the results show in the select
             ],
        );
    

        $this->crud->addField([   
            'name' => 'images',
            'label' => 'Images',
            'type' => 'upload_multiple',
            'upload' => true,
           
        ]);
    
        $this->crud->addField([   // select_from_array
            'name'        => 'status',
            'label'       => "Status",
            'type'        => 'select_from_array',
            'options'     => ['unpublish' => 'UnPublish', 'publish' => 'Publish'],
            'allows_null' => false,
            'default'     => 'unpublish',
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
        $this->crud->removeField('course_id');
        
        $this->crud->setEditView('admin.material.edit');
    }
}

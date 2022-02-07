<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\AccountTypeRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class AccountTypeCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class AccountTypeCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    /**
     * Configure the CrudPanel object. Apply settings to all operations.
     * 
     * @return void
     */
    public function setup()
    {
        CRUD::setModel(\App\Models\AccountType::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/account-type');
        CRUD::setEntityNameStrings('account type', 'account types');
        if(!backpack_user()->can('Create AccountType')){
            $this->crud->denyAccess('create');
        }
        if(!backpack_user()->can('Update AccountType')){
            $this->crud->denyAccess('update');
        }
        if(!backpack_user()->can('Delete AccountType')){
            $this->crud->denyAccess( 'delete');
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
              CRUD::column('name')->label(trans('backpack::crud.name'));
        CRUD::column('duration')->label(trans('backpack::crud.duration'));
        CRUD::column('descriptions')->label(trans('backpack::crud.description'));
        
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
        CRUD::setValidation(AccountTypeRequest::class);

        // CRUD::field('id');
        CRUD::field('name')->label(trans('backpack::crud.name'));
        // CRUD::field('duration');
        $this->crud->addField([
            'name' => 'duration',
            'label' => trans('backpack::crud.duration'),
            'type' => 'number',
        ]);
        CRUD::field('descriptions')->label(trans('backpack::crud.description'));
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
        $this->setupCreateOperation();
    }
}

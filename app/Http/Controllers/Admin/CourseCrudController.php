<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\CourseRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
use App\Http\Traits\LimitAccessAccordingToUserPermissions;
use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;
use Illuminate\Support\Facades\Hash;
use App\Models\Address;
use App\Models\User;
use DataTables;
use App\Models\GroupEnrollment;
use App\Models\AccountTypeDetail;
use App\Models\Grade;
use App\Models\ColumnScore;


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
        if(!backpack_user()->can('Create Course')){
            $this->crud->denyAccess( 'create');
        }
        if(!backpack_user()->can('Update Course')){
            $this->crud->denyAccess('update');
        }
        if(!backpack_user()->can('Delete Course')){
            $this->crud->denyAccess( 'delete');
        }
        
        if(backpack_user()->hasRole('Parent')){
            $this->allowAccessRoleParent();
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


        if(backpack_user()->hasRole(['Student', 'Parent'])){
            $enrollments = Enrollment::where('user_id', backpack_user()->id)->pluck('course_id')->toArray();
            $courses = Course::whereIn('id', $enrollments)->where('status', 'publish')->get();

            
            $this->data['courses'] = $courses;
            $this->crud->setListView('student.course.list', $this->data);
        }
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
         * - CRUD::addColumn(['name' => 'price', 'type'dd($request->name); => 'number']); 
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
        CRUD::field('description')->type('ckeditor');
       
      
      
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
    /**
     * Define what happens when the show operation is loaded.
     * override view show course
     * Edric - 29-12-2021
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupShowOperation(){
        $course_id = $this->crud->getCurrentEntryId();
        $enrollment = Enrollment::where('course_id',$course_id)->pluck('user_id')->toArray();
        $this->data['quantityStudent'] = User::whereIn('id', $enrollment)->whereHas('roles', function($q) {
            $q->where('name', 'Student');
        })->get()->count();
        $this->data['teachers'] = User::whereIn('id', $enrollment)->whereHas('roles', function($q) {
            $q->where('name', 'Teacher');
        })->get();
         $this->crud->setshowView('admin.course.show', $this->data);
    }
     /**
      * Edric - 29-12-2021

     * Show the view list student for admin, teacher.
     * 
     * @return void
     */
    public function indexListStudent(){
        return view('admin.course.list_student');
    }
      /**
      * Edric - 29-12-2021
      
     * Show the view list Teacher for admin, teacher.
     * 
     * @return void
     */
    public function indexListTeacher(){
      
        return view('admin.course.list_teacher');
    }
   

    /**
    * Edric - 29-12-2021
    * 
     * get datatable for list student, teacher
     * 
     * @param Request $request
     * @return Datatables
     */
    public function getListPeople(Request $request)
    {
       
        if ($request->ajax()) {
            $role = \Route::current()->parameter('role');
            $course_id = \Route::current()->parameter('id');
            $enrollment = Enrollment::where('course_id', $course_id)->pluck('user_id')->toArray();
          
                $data = User::whereIn('id', $enrollment)->whereHas('roles', function($q) use ($role){
                    $q->where('name', $role);
               })->get();
             
            return Datatables::of($data)
                ->addIndexColumn()
                ->addColumn('action', function($row){
                    $actionBtn = '<a href="'.route('user.edit',["id"=>$row->id]).'" class="edit btn btn-success btn-sm">Edit</a>&nbsp;&nbsp;';
                    if(backpack_user()->hasRole('Admin')){
                        $actionBtn .='<a href="javascript:;"  data-user-id="' . $row->id . '"  class="sa-params delete btn btn-danger btn-sm">Delete</a>';
                    }
                    return $actionBtn;
                })
                ->rawColumns(['action'])
                ->make(true);
        }
    }
     /**
      * Edric - 29-12-2021

     * Store a new user if user not exist, add user to course
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function postAddPeople(Request $request){

       
        $emails = explode( ',' , trim($request->emails, " ") );
        $course_id = \Route::current()->parameter('id');
        $role =  $role = \Route::current()->parameter('role');
        $regex = '/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/'; 
        $errors = [];
        foreach ($emails as $key => $email) {
            # code...
            if(!preg_match($regex, $email)){
                $errors[$email] =  "Invalid email format"; 
               
            }
        }
        
        if($this->array_has_dupes($emails)){
            $errors[] =  "There are duplicate accounts."; 
        }
        
        if( $this->checkUserExistInCourse($emails, $course_id)==true){
            $errors[$email] =  "An account with this email already exists."; 
        }
  
       
        if(sizeof($errors) != 0){
                
            return response()->json(['errors'=> $errors]);
        }else{
            foreach ($emails as $email) {
                DB::beginTransaction();
                try{
                    
                  if(User::where('email', $email)->first() === null ){
                    $this->addNewUser($email, $role);
                  }
                  $user = User::where('email' , $email)->first();
      
                  if($user->hasRole($role)){
                      Enrollment::create([
                          'user_id' => $user->id,
                          'course_id' => $course_id,
                          'start_time' =>  Carbon::now(),
                      ]);
                  }else{
                      $errors[] = "All accounts added must be.".$role."'s accounts.";
                      return response()->json(['errors'=> $errors]);
                  }
                 
                  DB::commit();
                } catch (Exception $e) {
                    DB::rollBack();
                    throw new Exception($e->getMessage());
                }
              }
        }
        return response()->json(['success'=>'Successfully added.']);
         
      }
    /**
    * Edric - 29-12-2021
    * 
     * check if the user already exists in the course.
     *
     * @param  $emails , $course_id
     * @return boolean
     */
      public function checkUserExistInCourse($emails, $course_id){
          foreach ($emails as $email) {
              $user = User::where('email' , $email)->first();
              if($user !== null){
                $enrollment = $user->enrollment()->where('course_id', $course_id)->first();
                if($enrollment !== null){
                    return true;
                }
              }
          }
          return false;
      }
       /**
    * Edric - 29-12-2021
    * 
     * Store a new user, and add address for new user 
     *
     * @param  $emails , $course_id
     * @return void
     */
      public function addNewUser($email, $role){
          DB::beginTransaction();
          try {
              $address = Address::create([
                  'street' => '',
                  'city' => '',
                  'state' => '',
                  'postal_code' => 0,
                  'country' => ''
              ]);
              $user = User::create([
                  'name' => 'name - '.$email,
                  'full_name' => 'full name - '.$email,
                  'address_id' => $address->id,
                  'email' => $email,
                  'status' => 'disable',
                  'password' => Hash::make('12345678')
              ]);
              $user->assignRole($role);
              DB::commit();
          } catch (Exception $e) {
              DB::rollBack();
              throw new Exception($e->getMessage());
          }
    }

    /**
    * Edric - 29-12-2021
    * 
     * Check the list of emails for duplicates.
     *
     * @param  $array ($emails)
     * @return boolean
     */
      public function array_has_dupes($array) {
          // streamline per @Felix
          return count($array) !== count(array_unique($array));
    }

    public function deletePeopleInCourse(Request $request){
        $enrollment = Enrollment::where('user_id', $request->userId)->where('course_id', $request->id)->first()->delete();
        
        if($enrollment){
            return response()->json(['status'=> 'success']);
        }
        return response()->json(['status'=> 'error']);
    }


    //
  
    public function getAssessment(Request $request){
        $this->data['course'] = Course::find($request->id);
        return view('student.assessment.list', $this->data);
    }

    public function getGrades(Request $request){
        $this->data['course'] = Course::find($request->id);
        $columnScores = ColumnScore::where('course_id', $request->id)->get(); 

        if(backpack_user()->hasAnyRole(['Admin', 'Teacher'])){
            $enrollment = Enrollment::where('course_id',$request->id)->pluck('user_id')->toArray();
            $users = User::whereIn('id', $enrollment)->whereHas('roles', function($q) {
                $q->where('name', 'Student');
            })->get();
            $grades = $this->data['course']->grades()->getResults()->toArray();
           
        }else{
            $users = User::where('id', backpack_user()->id)->get();
            $grades = Grade::where('user_id', backpack_user()->id)->whereIn('column_score_id',  $columnScores->pluck('id')->toArray())->get()->toArray();
           
        }

        foreach ($columnScores as $key => $column) {
            foreach ($users as $key => $user) {
                if(Grade::where('user_id', $user->id)->where('column_score_id', $column->id)->count() ==0){
                   $grades[] = [
                       'user_id' => $user->id,
                       'column_score_id' => $column->id,
                       'user' => $user,
                       'scores' => backpack_user()->hasAnyRole(['Admin', 'Teacher']) ? 0 : null,
                       'comment' =>'',

                   ];
                }
            }
        }
        
        foreach ($grades as $key=>$grade) {
            $user = User::find($grade['user_id'])->toArray();
            $grades[$key]['user'] = $user;
        }
       
        $this->data['grades'] = $grades;
       
        // dd($this->data['course']->grades()->getResults()->toArray());
        $this->data['columnScores'] = ColumnScore::where('course_id', $request->id)->get(); 
        if(backpack_user()->hasAnyRole(['Admin', 'Teacher'])){
            return view('admin.course.grades', $this->data);
        }else{
            return view('student.course.grades', $this->data);
        }
       
    }
    public function postAddColumnGrade(Request $request){
       
        //check column exist in grades
        $columnScore = ColumnScore::where('course_id', $request->course_id)->where('name', $request->name)->count();
        $col=null;
        if($columnScore == 0){
            $col = ColumnScore::create([
                'name' => $request->name,
                'description' => $request->description,
                'course_id' => $request->course_id,
            ]);
           
        }
        return $col != null ? response()->json(['status'=> 'success']) :response()->json(['status'=> 'error']);
    }
    
    public function getGradesCourse(Request $request)
    {
        
        if ($request->ajax()) {
            $course_id = $request->id;
          
            if(backpack_user()->hasAnyRole(['Admin', 'Teacher'])){
                $enrollment = Enrollment::where('course_id', $course_id)->pluck('user_id')->toArray();
                $data = User::whereIn('id', $enrollment)->whereHas('roles', function($q) {
                    $q->where('name', 'Student');
                })->get();
            }else{
                $data = User::where('id', backpack_user()->id)->get();
               
            }
    
            $columnScores = ColumnScore::where('course_id', $course_id)->get(); 
            $data->map(function ($item, $key) use($columnScores) {
                foreach ($columnScores as $key => $columnScore) {
                    $grade = Grade::where('user_id', $item->id)->where('column_score_id', $columnScore->id)->first();
                    $score = ($grade == null|| $grade->scores ==null)  ? 0 : $grade->scores;
                 
                    $actionScore = $item->id.'/'.$columnScore->id.'/'.$score;
                    $item[$columnScore->name] =  $actionScore;
                }
                return $item;
            });
         
            return Datatables::of($data)
                ->addIndexColumn()
             
                ->rawColumns(['name_profile'])
                ->make(true);
        }
    }
    public function postUpdateGrade(Request $request){
      
       $score = Grade::where('user_id', $request->userId)->where('column_score_id', $request->columnId)->first();
       
       if($score == null){
        $score = Grade::create([
            'user_id' => $request->userId,
            'column_score_id' => $request->columnId,
            'comment' => $request->comment,
            'scores' => $request->scores,
        ]);
        
       }else{
        $score->update([
            'user_id' => $request->userId,
            'column_score_id' => $request->columnId,
            'comment' => $request->comment,
            'scores' => $request->scores,
        ]);
       }
       return response()->json(['status'=> 'success']);
    }
  
}

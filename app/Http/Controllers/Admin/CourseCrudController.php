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
use App\Models\ParentStudent;


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
       
        $this->denyAccessIfNoCourse();
      
        if(!backpack_user()->can('Create Course')){
            $this->crud->denyAccess( 'create');
        }
       
        if(!backpack_user()->can('Update Course')){
            $this->crud->denyAccess('update');
        }
        if(!backpack_user()->can('Delete Course')){
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
        if(!backpack_user()->hasAnyRole(['Super Admin','Admin'])){
            $this->crud->addClause('where', 'status', '=', 'published');
            $courseIds = Enrollment::where('user_id', backpack_user()->id)->pluck('course_id')->toArray();
            $this->crud->addClause('whereIn', 'id', $courseIds );
        }
       
        // CRUD::column('id');
        CRUD::column('name')->label(trans('backpack::crud.name')); // This line;
        CRUD::column('start_date')->label(trans('backpack::crud.startDate'))->format('MM-DD-YYYY')->type('date');
        CRUD::column('end_date')->label(trans('backpack::crud.endDate'))->format('MM-DD-YYYY')->type('date');
        $this->crud->addColumn([
            'name' => 'status',
            'label' => trans('backpack::crud.status'),
            'type'        => 'select_from_array',
            'options'     => ['publish' => 'Publish', 'unpublish' => 'UnPublish'],
            'allows_null' => false,
            'default'     => 'publish',
        ]);
        $this->crud->addField([   
            'name' => 'status',
            'label' => trans('backpack::crud.status'),
            'type'        => 'select_from_array',
            'options'     => ['publish' => 'Publish', 'unpublish' => 'UnPublish'],
            'allows_null' => false,
            'default'     => 'unpublish',
        ]);


        if(backpack_user()->hasRole(['Student'])){
            $enrollments = Enrollment::where('user_id', backpack_user()->id)->pluck('course_id')->toArray();
            // $lang = \Session::get('locale', backpack_user()->lang);
            // $courses = Course::whereIn('id', $enrollments)->where('status', 'published')->orderBy('level_id')->where('lang', $lang)->get();
            $courses = Course::whereIn('id', $enrollments)->where('status', 'published')->orderBy('level_id')->get();
            
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
        CRUD::field('name')->label(trans('backpack::crud.name'));
        $this->crud->addField([   
            'name'        => 'lang', // the name of the db column
            'label'       => 'Lang', // the input label
            'type'        => 'radio',
            'options'     => [
                // the key will be stored in the db, the value will be shown as label; 
                'ENG' => "English",
                'BM' => "Bahasa Malaysia",
                'CN' => 'Bahasa Cina'
            ],
            'default' => 'ENG',
             // optional
            'inline'      => true, // show the radios all on the same line?
        ]);
        $this->crud->addField(
            [  // Select
                'label'     => trans('backpack::base.level'),
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
        
        CRUD::field('start_date')->label(trans('backpack::crud.startDate'));
        CRUD::field('end_date')->label(trans('backpack::crud.endDate'));
        CRUD::field('user_id')->type('hidden')->value(backpack_user()->id); // notice the name is the foreign key attribute
       
        $this->crud->addFields([
            [   
            'name' => 'status',
            'label' => trans('backpack::crud.status'),
            'type'        => 'select_from_array',
            'options'     => ['published' => 'Published', 'unpublished' => 'Unpublished'],
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
        CRUD::field('description')->type('ckeditor')->label(trans('backpack::crud.description'));
       
      
      
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
                ->removeColumn('full_name')
                ->addIndexColumn()
                ->addColumn('action', function($row) use ($course_id){
                    if(backpack_user()->hasAnyRole(['Admin', 'Super Admin'])){
                        $actionBtn = '<a href="'.route('user.edit',["id"=>$row->id]).'" class="edit btn btn-success btn-sm">Edit</a>&nbsp;&nbsp;';
                        $actionBtn .='<a href="javascript:;"  data-user-id="' . $row->id . '"  class="sa-params delete btn btn-danger btn-sm" title="Remove from course">Remove</a>';
                    }else{
                        $actionBtn = '<a href="'.route('course.showStudent.get',["id"=>$course_id, 'student_id'=>$row->id]).'" class="edit btn btn-success btn-sm">View</a>&nbsp;&nbsp;';
                    }
                    return $actionBtn;
                })
                ->addColumn('full_name_custom', function($row) {
                    return $row->name.' '.$row->full_name;
                })
                ->rawColumns(['action', 'full_name_custom'])
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
        DB::beginTransaction();
        try{
            foreach ($emails as $key => $email) {
                # code...
                if(!preg_match($regex, $email)){
                    $errors[$email] =  "Invalid email format"; 
                }else{
                   
                    $user = User::where('email', $email)->first();
                
                    if($user === null ){
                        // role admin duoc them moi user
                        if(backpack_user()->hasRole('Admin')){
                            $user = $this->addNewUser($email, $role);
                            $errors  = $this->addEnrollCourse($user, $course_id, $role, $errors );
                            
                        }else{
                            $errors[$email] =  "Not found."; 
                        }
                    }else{
                        $errors= $this->addEnrollCourse($user, $course_id, $role, $errors );
                       
                    }
                }
            }
           
            if(sizeof($errors) != 0){
              
                DB::rollBack();
                return response()->json(['errors'=> $errors]);
            }else{
               DB::commit();
            }
            
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        return response()->json(['success'=>'Successfully added.']);
         
      }
      /**
    * Edric - 29-12-2021
    * 
     * add people to course 
     *
     * @param  $user , $course_id, $role, $errors
     * @return void
     */
      public function addEnrollCourse($user, $course_id, $role, $errors){
        $enrollment = Enrollment::where('user_id', $user->id)->where('course_id' , $course_id)->first();
        if($enrollment == null){
            if($user->hasRole($role)){
                Enrollment::create([
                    'user_id' => $user->id,
                    'course_id' => $course_id,
                    'start_time' =>  Carbon::now(),
                ]);
            }else{
                $errors[$user->email] = "Does not have ".$role."'s role.";
            }   
        }else{
            $user = $enrollment->user()->getResults();
            if(!$user->hasRole($role)){
                $errors[$user->email] = "Does not have ".$role."'s role.";
            }
        }
        return $errors;
      }
    
      
    /**
    * Edric - 29-12-2021
    * 
     * Store a new user, and add address for new user 
     * and asign role for user
     * 
     * @param  $emails , $course_id
     * @return $user
     */
      public function addNewUser($email, $role){
         
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
          
          return $user;
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
        $this->data['allColumnScores'] = ColumnScore::where('course_id', $request->id)->withTrashed()->get(); 
        if(backpack_user()->hasAnyRole(['Super Admin','Admin', 'Teacher'])){
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
          
            if(backpack_user()->hasAnyRole(['Super Admin','Admin', 'Teacher'])){
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
                    $status = $item->status =='active'  ? 'active' : 'disable';
                    $actionScore = $item->id.'/'.$columnScore->id.'/'.$score.'/'.$status;
                    $item[$columnScore->name.'score'] =  $actionScore;
                }
                $item->full_name_custom = $item->name .' '. $item->full_name;
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
            'status' => 'active',
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
    public function showStudent(Request $request){
        $courses = backpack_user()->enrollment()->join('courses', 'courses.id', '=', 'enrollments.course_id')
        ->where('courses.status' ,'=', 'published')
        ->select('courses.id')->pluck('courses.id')->toArray();
       $enrollOfStd = Enrollment::whereIn('course_id', $courses)->where('user_id', $request->student_id)->get();
       
       if($enrollOfStd->count() == 0){
          return abort(404);
       }
       $student = User::find($request->student_id);
       $parent = ParentStudent::where('student_id',$request->student_id)
       ->join('users', 'users.id', '=', 'parent_students.parent_id')
       ->select('users.*')
       ->first();

       $this->data['course'] = Course::find($request->id);
        $columnScores = ColumnScore::where('course_id', $request->id)->get(); 
        $this->data['columnScores'] = $columnScores ; 

       $this->data['student'] = $student;
       $this->data['parent'] = $parent;
       return view('admin.user.show', $this->data);
    }
    public function getFlashCard(Request $request){
        $this->data['course'] = Course::find($request->id);
        return view('student.flash_card.index', $this->data);
    }
    public function postUpdateColumn(Request $request){
        $columns = $request->columns;
        foreach ($columns as $key => $column) {
            $update = ['name' => $column['name'],
            'description' =>  $column['description'],     
                ];
            if(!isset($column['action'])){
                $update['deleted_at'] = Carbon::now();
            }else{
                $update['deleted_at']= null;
            }
            $column = DB::table('column_scores')
                    ->where('id', $key)
                    ->update($update);
        }
        return response()->json(['success'=>'Successfully updated.']);
    }
    public function postDeleteColumn(Request $request){
        $columnId = $request->column_id;
        $columnScore = ColumnScore::where( 'id', $columnId)->forceDelete();
        Grade::where('column_score_id', $columnId)->delete();
        if($columnScore == 1){
            return response()->json(['success'=> 'Successfully!']);
        }
        return response()->json(['error'=> 'The column does not exist.']);
    }
}

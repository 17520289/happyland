<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DataTables;
use App\Models\ParentStudent;
use App\Models\AccountDetail;
use App\Models\User;
use App\Models\AccountTypeDetail;
use Carbon\Carbon;
use App\Models\Enrollment;
use App\Models\Course;
use App\Models\ColumnScore;
use App\Models\Grade;
class ParentController extends Controller
{   
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $course_id = \Route::current()->parameter('course_id');
            $student_id = \Route::current()->parameter('student_id');
            if(\Route::current()->parameter('id') != backpack_user()->id)
            {
                return abort(403);
            }
            if($course_id !=null || $student_id !=null ){
                $parentStudent = ParentStudent::where('parent_id', backpack_user()->id)->where('student_id',  $student_id)->get();
                if($parentStudent->count() == 0){
                    
                    return abort(404);

                }else{
                    if($course_id !=null){
                        $enrollment = Enrollment::where('course_id', $course_id)->where('user_id', $student_id)->get();
                        if($enrollment->count() == 0 ){
                            return abort(404);
                        }
                    }
                   
                }
            }
            return $next($request);
        });
       
    }
    //
    public function getListChildren()
    {
        return view('parent.children.index');
    }
    public function ajaxListChildren(Request $request){
        $parentId = $request->id;
        $children = ParentStudent::where('parent_id', $parentId )->get()->pluck('student_id')->toArray();
       
        $students = User::whereIn('id' , $children)->get();
        
        $students->map(function ($item, $key ) {
            $accountDetail =  AccountTypeDetail::where('user_id', $item->id)->orderBy('id', 'desc')->first();
            $item['start_time'] = $accountDetail != null ? ($accountDetail->start_time!=null ? Carbon::createFromFormat('Y-m-d H:i:s', $accountDetail->start_time )->format('m-d-Y') : '') : '';
            $item['end_time'] = $accountDetail != null ? ($accountDetail->end_time !=null ? Carbon::createFromFormat('Y-m-d H:i:s', $accountDetail->end_time )->format('m-d-Y') : '') : '';
            
            return $item;
        });
        return Datatables::of($students)
        ->addIndexColumn()
        ->addColumn('action', function($row) use ($parentId){
            $btn = '<a href="'.route('parent.childrenCourse.get' , ["id"=>$parentId, "student_id" => $row->id]).'" class="edit btn btn-primary btn-sm">View Course</a>';
            return $btn;
        })
        ->rawColumns(['action'])
        ->make(true);
    }
    public function getChildrenCourse(Request $request){
        $parentId = $request->id;
        $studentId = $request->student_id;
        $enrollments = Enrollment::where('user_id', $studentId)->pluck('course_id')->toArray();
        // $lang = User::find($studentId )->lang;
        $this->data['courses'] = Course::whereIn('id', $enrollments)->where('status', 'published')->orderBy('level_id')->get();
        $this->data['accountTypeDetail'] = AccountTypeDetail::where('user_id', $studentId)->orderBy('id', 'desc')->first();
        return view('student.course.list', $this->data);
    }
    public function getShowCourse(Request $request){
        $course_id = $request->course_id;
        $this->data['course'] = Course::find($course_id);
        $enrollment = Enrollment::where('course_id',$course_id)->pluck('user_id')->toArray();
        $this->data['quantityStudent'] = User::whereIn('id', $enrollment)->whereHas('roles', function($q) {
            $q->where('name', 'Student');
        })->get()->count();
        $this->data['teachers'] = User::whereIn('id', $enrollment)->whereHas('roles', function($q) {
            $q->where('name', 'Teacher');
        })->get();
        return view('parent.course.show', $this->data);
    }
    public function getGradesChildren(Request $request){
       
        $this->data['course'] = Course::find($request->course_id);
        $columnScores = ColumnScore::where('course_id', $request->course_id)->get(); 
        $this->data['columnScores'] = $columnScores ; 
       
        return view('student.course.grades', $this->data);
        
    }
    public function getAssessment(Request $request){
        $this->data['course'] = Course::find($request->course_id);
        return view('student.assessment.list', $this->data);
    }
    public function getFlashCard(Request $request){
        $this->data['course'] = Course::find($request->course_id);
        return view('student.flash_card.index', $this->data);
    }


}

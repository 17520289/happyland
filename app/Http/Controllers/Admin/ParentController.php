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
class ParentController extends Controller
{   
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
             if(\Route::current()->parameter('id') != backpack_user()->id)
            {
                return abort(403);
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
        $this->data['courses'] = Course::whereIn('id', $enrollments)->where('status', 'publish')->get();
        $this->data['accountTypeDetail'] = AccountTypeDetail::where('user_id', $studentId)->orderBy('id', 'desc')->first();
        return view('student.course.list', $this->data);
    }
}

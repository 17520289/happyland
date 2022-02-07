@php
        if(backpack_user()->hasRole('Parent')){
                $para = ['id'=>backpack_user()->id,'course_id' => $course->id, 'student_id'=>  \Route::current()->parameter('student_id')];
                $urlGrades=  route('parent.gradeChildren.get', $para);
                $urlInfo = route('parent.showCourses.get', $para);
                $urlAssess = route('parent.assessmentChildren.get' , $para );
        }else{
                $urlGrades = route('course.grades.get', ['id' => \Route::current()->parameter('id')]);
                $urlInfo = route('course.show', ['id' => \Route::current()->parameter('id')]);
                $urlAssess = route('student.assessment.get', ['id' => \Route::current()->parameter('id')]);
        }
   

@endphp
<ul class="list-unstyled">
    <li class="nav-item"><a class="nav-link"
            href="{{ $urlInfo }}">Infomation</a></li>

    @if (backpack_user()->status == 'active')
        @if (backpack_user()->hasAnyRole(['Super Admin','Admin', 'Teacher']))
            <li class="nav-item"><a class="nav-link"
                    href="{{ route('course.list-teacher', ['id' => \Route::current()->parameter('id')]) }}">
                    Teacher List</a></li>
            <li class="nav-item"><a class="nav-link"
                    href="{{ route('course.list-student', ['id' => \Route::current()->parameter('id')]) }}">
                    Student List</a></li>
        @endif
        <li class="nav-item"><a class="nav-link"
                href="{{ $urlGrades }}">Grades</a></li>
        <li class="nav-item"><a class="nav-link"
                href="{{ $urlAssess }}">Assessment</a>
        </li>
    @endif
</ul>

@php
        if(backpack_user()->hasRole('Parent')){
                $para = ['id'=>backpack_user()->id,'course_id' => $course->id, 'student_id'=>  \Route::current()->parameter('student_id')];
                $urlGrades=  route('parent.gradeChildren.get', $para);
                $urlInfo = route('parent.showCourses.get', $para);
                $urlAssess = route('parent.assessmentChildren.get' , $para );
                $urlFlashCard = route('parent.flashCard.get', $para);
        }else{
                $urlGrades = route('course.grades.get', ['id' => \Route::current()->parameter('id')]);
                $urlInfo = route('course.show', ['id' => \Route::current()->parameter('id')]);
                $urlAssess = route('student.assessment.get', ['id' => \Route::current()->parameter('id')]);
                $urlFlashCard = route('course.flashCard.get', ['id' => \Route::current()->parameter('id')]);
        }
   

@endphp
<ul class="list-unstyled">
    <li class="nav-item"><a class="nav-link"
            href="{{ $urlInfo }}">{{ trans('backpack::base.infomation') }}</a></li>

    @if (backpack_user()->status == 'active')
        @if (backpack_user()->hasAnyRole(['Super Admin','Admin', 'Teacher']))
            <li class="nav-item"><a class="nav-link"
                    href="{{ route('course.list-teacher', ['id' => \Route::current()->parameter('id')]) }}">
                    {{ trans('backpack::base.teacherList') }}</a></li>
            <li class="nav-item"><a class="nav-link"
                    href="{{ route('course.list-student', ['id' => \Route::current()->parameter('id')]) }}">
                    {{ trans('backpack::base.studentList') }}</a></li>
        @endif
        <li class="nav-item"><a class="nav-link"
                href="{{ $urlGrades }}">{{ trans('backpack::base.Grades') }}</a></li>
        <li class="nav-item"><a class="nav-link"
                href="{{ $urlAssess }}">{{ trans('backpack::base.Assessment') }}</a>
        </li>
        <li class="nav-item"><a class="nav-link"
                href="{{ $urlFlashCard }}">{{ trans('backpack::base.flashCard') }}</a>
        </li>
    @endif
</ul>

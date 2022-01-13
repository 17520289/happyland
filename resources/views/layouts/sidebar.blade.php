
<ul class="list-unstyled">
    <li class="nav-item"><a class="nav-link" href="{{ route('course.show', ['id'=>\Route::current()->parameter('id')]) }}">Infomations</a></li>
   @if (backpack_user()->hasAnyRole('Admin', 'Teacher'))
   <li class="nav-item"><a class="nav-link" href="{{ route('course.list-teacher', ['id'=>\Route::current()->parameter('id')]) }}">List Teacher</a></li>
   <li class="nav-item"><a class="nav-link" href="{{ route('course.list-student', ['id'=>\Route::current()->parameter('id')]) }}">List Student</a></li>
   @endif
    <li class="nav-item"><a class="nav-link" href="{{ route('student.assessment.get', ['id'=>\Route::current()->parameter('id')]) }}">Assessment</a></li>
</ul>
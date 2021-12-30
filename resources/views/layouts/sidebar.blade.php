<h4>Informations</h4>
<ul class="list-unstyled">
   @if (backpack_user()->hasAnyRole('Admin', 'Teacher'))
   <li class="nav-item"><a class="nav-link" href="{{ route('course.list-teacher', ['id'=>\Route::current()->parameter('id')]) }}">List Teacher</a></li>
   <li class="nav-item"><a class="nav-link" href="{{ route('course.list-student', ['id'=>\Route::current()->parameter('id')]) }}">List Student</a></li>
   @endif
    <li class="nav-item"><a class="nav-link" href="{{ route('student.assessment.get', ['id'=>\Route::current()->parameter('id')]) }}">Assessment</a></li>
</ul>
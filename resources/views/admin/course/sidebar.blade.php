<h4>Informations</h4>
<ul class="list-unstyled">
    <li class="nav-item"><a class="nav-link" href="{{ route('course.list-teacher', ['id'=>\Route::current()->parameter('id')]) }}">List Teacher</a></li>
    <li class="nav-item"><a class="nav-link" href="{{ route('course.list-student', ['id'=>\Route::current()->parameter('id')]) }}">List Student</a></li>
</ul>
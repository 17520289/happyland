@extends(backpack_view('blank'))
@php

    if(backpack_user()->hasRole('Parent')){
    $urlBack = route('parent.showCourses.get', ['id'=>backpack_user()->id,'course_id' => $course->id, 'student_id'=>  \Route::current()->parameter('student_id')]);;
}else{
    $urlBack = route('course.show', ['id' => $course->id]);
}
    $level = 'Level-'.$course->level->id;
@endphp
@section('header')
    <section class="container-fluid d-print-none">
        <h2><a href="{{ $urlBack }}"><i
                    class="la la-backward nav-icon"></i></a>
            <span class="text-capitalize">{{ $course->name }}</span>
            <small> >> Assessment</small>
        </h2>
    </section>

@endsection

@section('content')
    <div class="row mt-4">
        <iframe src="{{ asset('animation/'.$level.'/English/index.html') }}" width="100%" height="800" frameborder="5"></iframe>
     

    </div>
@endsection


@section('after_styles')
    <style>
        .collapse {
            padding-left: 30px;
        }

    </style>
    <link rel="stylesheet"
        href="{{ asset('packages/backpack/crud/css/crud.css') . '?v=' . config('backpack.base.cachebusting_string') }}">
    <link rel="stylesheet"
        href="{{ asset('packages/backpack/crud/css/show.css') . '?v=' . config('backpack.base.cachebusting_string') }}">
@endsection

@section('after_scripts')
    <script src="{{ asset('packages/backpack/crud/js/crud.js') . '?v=' . config('backpack.base.cachebusting_string') }}">
    </script>
    <script src="{{ asset('packages/backpack/crud/js/show.js') . '?v=' . config('backpack.base.cachebusting_string') }}">
    </script>
@endsection

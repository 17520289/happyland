@extends(backpack_view('blank'))
@php

    // if(backpack_user()->hasRole('Parent')){
    //     $urlBack = route('parent.showCourses.get', ['id'=>backpack_user()->id,'course_id' => $course->id, 'student_id'=>  \Route::current()->parameter('student_id')]);;
    // }else{
    //     $urlBack = route('course.show', ['id' => $course->id]);
    // }
    $url = 'flashcard/'.$course->lang.'/Level-'.$course->level->id.'A'.'/lesson/lesson.html';

@endphp

@section('header')
    <section class="container-fluid d-print-none">
        <h2>
            <span class="text-capitalize">{{ $course->name }}</span>
            <small> >> Flash Card</small>
        </h2>
    </section>
    <hr style="width:100%;" class="mt-1 mb-1">
@endsection

@section('content')
    <div class="row menu-top">
        @include('layouts.sidebar')
    </div>
    <div class="row mr-0 ml-0" id="div_flashCard">
        <button class="button" style="margin-left: auto"><i class="las la-compress"></i></button>
        <iframe src="{{ asset($url)}}"  id='flashCard' width="100%" height="800" frameborder="5"></iframe>
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
    <script>
    window.onload = function()
    {
        document.getElementById('div_flashCard').scrollIntoView();
    };
    $('body').removeClass("sidebar-lg-show");
    var button = document.querySelector('#div_assessment .button');
        button.addEventListener('click', fullscreen);
        // when you are in fullscreen, ESC and F11 may not be trigger by keydown listener.
        // so don't use it to detect exit fullscreen
        document.addEventListener('keydown', function(e) {
            console.log('key press' + e.keyCode);
        });
        // detect enter or exit fullscreen mode
        document.addEventListener('webkitfullscreenchange', fullscreenChange);
        document.addEventListener('mozfullscreenchange', fullscreenChange);
        document.addEventListener('fullscreenchange', fullscreenChange);
        document.addEventListener('MSFullscreenChange', fullscreenChange);

        function fullscreen() {
            // check if fullscreen mode is available
            if (document.fullscreenEnabled ||
                document.webkitFullscreenEnabled ||
                document.mozFullScreenEnabled ||
                document.msFullscreenEnabled) {

                // which element will be fullscreen
                var iframe = document.querySelector('#div_assessment iframe');
                // Do fullscreen
                if (iframe.requestFullscreen) {
                    iframe.requestFullscreen();
                } else if (iframe.webkitRequestFullscreen) {
                    iframe.webkitRequestFullscreen();
                } else if (iframe.mozRequestFullScreen) {
                    iframe.mozRequestFullScreen();
                } else if (iframe.msRequestFullscreen) {
                    iframe.msRequestFullscreen();
                }
            } else {
                document.querySelector('.error').innerHTML = 'Your browser is not supported';
            }
        }

        function fullscreenChange() {
            if (document.fullscreenEnabled ||
                document.webkitIsFullScreen ||
                document.mozFullScreen ||
                document.msFullscreenElement) {
                console.log('enter fullscreen');
            } else {
                console.log('exit fullscreen');
            }
            // force to reload iframe once to prevent the iframe source didn't care about trying to resize the window
            // comment this line and you will see
            var iframe = document.querySelector('iframe');
            iframe.src = iframe.src;
        }
    </script>
    <script src="{{ asset('packages/backpack/crud/js/crud.js') . '?v=' . config('backpack.base.cachebusting_string') }}">
    </script>
    <script src="{{ asset('packages/backpack/crud/js/show.js') . '?v=' . config('backpack.base.cachebusting_string') }}">
    </script>
@endsection

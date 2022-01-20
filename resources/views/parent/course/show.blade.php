@extends(backpack_view('blank'))

@php
$defaultBreadcrumbs = [
    backpack_user()->roles[0]->name => url(config('backpack.base.route_prefix'), 'dashboard'),
   'Children' => false,
    'Course' => false,
];
// $course = $crud->getCurrentEntry();
$url_img = $course->image != null ? $course->image : 'animation/English/public/img/background/intro.png';
// if breadcrumbs aren't defined in the CrudController, use the default breadcrumbs
 $breadcrumbs = $breadcrumbs ?? $defaultBreadcrumbs;
@endphp

@section('header')
    <section class="container-fluid ">
        <a href="javascript: window.print();" class="btn float-right"><i class="la la-print"></i></a>
        <h2>
            <span class="text-capitalize">{{$course->name}}</span>
            <small>{!! mb_ucfirst(trans('backpack::crud.preview')) . ' ' .'course' !!}.</small>
            
        </h2>

    </section>
    <hr style="width:100%;">
@endsection

@section('content')
    <div class="row">
        <div class="col-md-2">
            @include('layouts.sidebar')
        </div>
        <div class="col-md-10 infomations">
            <div class="hero-image"
                style="background-image:linear-gradient(rgba(131, 131, 131, 0.5), rgba(138, 138, 138, 0.5)), url({{ asset($url_img) }})">

            </div>
            <h3>Welcome to {{ ucwords($course->name) }} Course </h3>
            <p><b>Current Users:</b></p>
            <ul>
                <li>Teachers: {{ $teachers->count() }} 
                    @if ($teachers->count()> 0)
                         (
                        @foreach ($teachers as $teacher)
                            {{ $teacher->full_name . ',' }}
                        @endforeach
                        )
                    @endif
                </li>
                <li>Students: {{ $quantityStudent }}</li>
            </ul>
            <p><b>Start Date:</b> {{ $course->start_date ?? '' }}</p>
            <p><b>End Date:</b> {{ $course->end_date ?? '' }}</p>
            @if ($course->description != null)
                <p><b>Description: </b></p>
                {!! html_entity_decode($course->description) ?? '' !!}
            @endif

        </div><!-- /.box-body -->

    </div>


    </div>
@endsection


@section('after_styles')
    <style>
        body,
        html {
            height: 100%;
        }
        .infomations{
         height: 70vh;
         overflow-y: scroll;
        }
        /* The hero image */
        .hero-image {
            /* Use "linear-gradient" to add a darken background effect to the image (photographer.jpg). This will make the text easier to read */

            /* Set a specific height */
            height: 300px;
            margin-bottom: 20px;
            /* Position and center the image to scale nicely on all screens */
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            position: relative;
        }

        /* Place text in the middle of the image */


        p {
            margin: 0;
        }

        h3 {
            /* text-align: center; */
            margin-bottom: 20px;
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

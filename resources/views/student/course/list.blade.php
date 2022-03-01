@extends(backpack_view('blank'))
@php
if (backpack_user()->hasRole('Parent')) {
    $defaultBreadcrumbs = [
        'Parent' => url(config('backpack.base.route_prefix'), 'dashboard'),
        'Children' => route('parent.list-children.get',['id'=> \Route::current()->parameter('id')]),
        'List Course' => false,
    ];
} else {
    $defaultBreadcrumbs = [
        'Student' => url(config('backpack.base.route_prefix'), 'dashboard'),
        'Course' => backpack_url('course') ,
        'List' => false,
    ];
}

// if breadcrumbs aren't defined in the CrudController, use the default breadcrumbs
$breadcrumbs = $breadcrumbs ?? $defaultBreadcrumbs;
@endphp
@section('header')
    <div class="container-fluid">
        <h2><a href=""></a>
            <span class="text-capitalize">All Course</span>
        </h2>
    </div>
    <hr style="width:100%;">
@endsection

@section('content')
    <div  style="padding: 0 10%">
        <div class="row" style="width: 100%">
            @foreach ($courses as $course)
                <div class="col-md-3" style="margin: 0 50px">
                    <div class="card-sl">
                        <div class="" >
                                @php
                                if(backpack_user()->hasRole('Parent')){
                                    $studentId = \Route::current()->parameter('student_id');
                                $url = route('parent.showCourses.get', ['id'=>backpack_user()->id,'course_id' => $course->id, 'student_id'=> $studentId]);
                                }else{
                                $url = route('course.show', ['id' => $course->id]);
                                }
                            @endphp
                        <a href="{{$url}}" >
                            @if ($course->image != null)
                                <img width="100%" src="{{ asset($course->image) }} " />
                            @else
                                <img  width="100%" src="{{ asset('images/education.jpeg') }} " />
                            @endif
                        </a>

                        </div>

                        {{-- <div class="card-heading">
                            {{ $course->name }}
                        </div>
                        <div class="card-text">
                            Start date: {{ $course->start_date }}
                        </div>
                        @if ($accountTypeDetail != null)
                            @if ($accountTypeDetail->status == 'active')
                              @php
                                  if(backpack_user()->hasRole('Parent')){
                                      $studentId = \Route::current()->parameter('student_id');
                                    $url = route('parent.showCourses.get', ['id'=>backpack_user()->id,'course_id' => $course->id, 'student_id'=> $studentId]);
                                  }else{
                                    $url = route('course.show', ['id' => $course->id]);
                                  }
                              @endphp
                                <a href="{{$url }}" class="card-button"> Show</a>
                            @endif
                        @endif --}}


                    </div>
                </div>
            @endforeach

        </div>


    </div>

@endsection

@section('after_styles')
    <style>
        a {
            text-decoration: none;
        }

        /* Card Styles */

        .card-sl {
            margin-top: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }

        .card-image img {
            max-height: 100%;
            max-width: 100%;
            border-radius: 8px 8px 0px 0;
        }

        .card-action {
            position: relative;
            float: right;
            margin-top: -25px;
            margin-right: 20px;
            z-index: 2;
            color: #E26D5C;
            background: #fff;
            border-radius: 100%;
            padding: 15px;
            font-size: 15px;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19);
        }

        .card-action:hover {
            color: #fff;
            background: #E26D5C;
            -webkit-animation: pulse 1.5s infinite;
        }

        .card-heading {
            font-size: 18px;
            font-weight: bold;
            background: #fff;
            padding: 10px 15px;
        }

        .card-text {
            padding: 10px 15px;
            background: #fff;
            font-size: 14px;
            color: #636262;
        }

        .card-button {
            display: flex;
            justify-content: center;
            padding: 10px 0;
            width: 100%;
            background-color: #a3c3ec;
            color: #fff;
            border-radius: 0 0 8px 8px;
        }

        .card-button:hover {
            text-decoration: none;
            background-color: #1D3461;
            color: #fff;

        }


        @-webkit-keyframes pulse {
            0% {
                -moz-transform: scale(0.9);
                -ms-transform: scale(0.9);
                -webkit-transform: scale(0.9);
                transform: scale(0.9);
            }

            70% {
                -moz-transform: scale(1);
                -ms-transform: scale(1);
                -webkit-transform: scale(1);
                transform: scale(1);
                box-shadow: 0 0 0 50px rgba(90, 153, 212, 0);
            }

            100% {
                -moz-transform: scale(0.9);
                -ms-transform: scale(0.9);
                -webkit-transform: scale(0.9);
                transform: scale(0.9);
                box-shadow: 0 0 0 0 rgba(90, 153, 212, 0);
            }
        }
        }

    </style>
    <!-- DATA TABLES -->
    <link rel="stylesheet" type="text/css"
        href="{{ asset('packages/datatables.net-bs4/css/dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" type="text/css"
        href="{{ asset('packages/datatables.net-fixedheader-bs4/css/fixedHeader.bootstrap4.min.css') }}">
    <link rel="stylesheet" type="text/css"
        href="{{ asset('packages/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css') }}">

    <link rel="stylesheet"
        href="{{ asset('packages/backpack/crud/css/crud.css') . '?v=' . config('backpack.base.cachebusting_string') }}">
    <link rel="stylesheet"
        href="{{ asset('packages/backpack/crud/css/form.css') . '?v=' . config('backpack.base.cachebusting_string') }}">
    <link rel="stylesheet"
        href="{{ asset('packages/backpack/crud/css/list.css') . '?v=' . config('backpack.base.cachebusting_string') }}">
    {{-- <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"> --}}
    <!-- CRUD LIST CONTENT - crud_list_styles stack -->
    @stack('crud_list_styles')
@endsection

@section('after_scripts')
    <script>
        $(document).ready(function() {
            document.getElementById("heart").onclick = function() {
                document.querySelector(".fa-gratipay").style.color = "#E74C3C";
            };
        });
    </script>
    <script src="{{ asset('packages/backpack/crud/js/crud.js') . '?v=' . config('backpack.base.cachebusting_string') }}">
    </script>
    <script src="{{ asset('packages/backpack/crud/js/form.js') . '?v=' . config('backpack.base.cachebusting_string') }}">
    </script>
    <script src="{{ asset('packages/backpack/crud/js/list.js') . '?v=' . config('backpack.base.cachebusting_string') }}">
    </script>

    <!-- CRUD LIST CONTENT - crud_list_scripts stack -->
    @stack('crud_list_scripts')
@endsection

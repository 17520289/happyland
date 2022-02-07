@extends(backpack_view('blank'))

@php
    $widgets['before_content'][] = [
        'type'        => 'jumbotron',
        'heading'     => trans('backpack::base.welcome'),
        'content'     => 'Happy Land is Happy LMS for Happy Children.',
        'wrapper' => ['class'=>'hero-image'] 
    ];
@endphp
@section('before_styles')
    <style>
        .hero-image{
            background-image: linear-gradient(rgba(155, 155, 155, 0.5), rgba(129, 129, 129, 0.5)), url("{{asset('images/intro.png')}}");
            height: 50%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            position: relative;
        }
        .hero-image{
            height: 600px;
            color: white;
            font-size: 26px;
        }
        .hero-image h1{
            font-weight:600;
            margin-top: 150px;
        }

    </style>
@endsection
@section('content')

@endsection
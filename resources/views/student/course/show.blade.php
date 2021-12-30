@extends(backpack_view('blank'))



@section('header')
	<section class="container-fluid d-print-none">
            <h2>{{$course->name}}</h2>
		
    </section>

@endsection

@section('content')
<div class="row mt-4">
	<div class="col-md-2 ">
		@include('layouts.sidebar')
	</div>
	<div class="col-md-10">

	</div>
	
</div>
@endsection


@section('after_styles')
	<link rel="stylesheet" href="{{ asset('packages/backpack/crud/css/crud.css').'?v='.config('backpack.base.cachebusting_string') }}">
	<link rel="stylesheet" href="{{ asset('packages/backpack/crud/css/show.css').'?v='.config('backpack.base.cachebusting_string') }}">
@endsection

@section('after_scripts')
	<script src="{{ asset('packages/backpack/crud/js/crud.js').'?v='.config('backpack.base.cachebusting_string') }}"></script>
	<script src="{{ asset('packages/backpack/crud/js/show.js').'?v='.config('backpack.base.cachebusting_string') }}"></script>
@endsection

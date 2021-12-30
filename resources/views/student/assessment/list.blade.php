@extends(backpack_view('blank'))



@section('header')
	<section class="container-fluid d-print-none">
            <h2>{{$course->name}}</h2>
		
    </section>

@endsection

@section('content')
<div class="row mt-4">
	<div class="col-md-2">
		@include('layouts.sidebar')
	</div>
	<div class="col-md-10">
        <iframe src="{{asset('animation/Level-1A/index.html')}}" width="100%" height="800" frameborder="5"></iframe>
        {{-- <div id="accordion">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h3 class="mb-0">
                  <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                   <h5>Unit 1</h5>
                  </button>
                </h3>
              </div>
          
              <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body">
                    
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-header" id="headingTwo">
                <h3 class="mb-0">
                  <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <h5>Unit 2</h5>
                  </button>
                </h3>
              </div>
              <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                <div class="card-body">
                 
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-header" id="headingThree">
                <h3 class="mb-0">
                  <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    <h5>Unit 3</h5>
                  </button>
                </h3>
              </div>
              <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                <div class="card-body">
                 
                </div>
              </div>
            </div>
          </div>
        </div> --}}
        {{-- <iframe src="https://sotaydoanhtri.com/thuat-ngu/assessment-670/" frameborder="0"></iframe> --}}
	</div>
	
</div>
@endsection


@section('after_styles')
<style>
    .collapse{
        padding-left: 30px;
    }
</style>
	<link rel="stylesheet" href="{{ asset('packages/backpack/crud/css/crud.css').'?v='.config('backpack.base.cachebusting_string') }}">
	<link rel="stylesheet" href="{{ asset('packages/backpack/crud/css/show.css').'?v='.config('backpack.base.cachebusting_string') }}">
@endsection

@section('after_scripts')
	<script src="{{ asset('packages/backpack/crud/js/crud.js').'?v='.config('backpack.base.cachebusting_string') }}"></script>
	<script src="{{ asset('packages/backpack/crud/js/show.js').'?v='.config('backpack.base.cachebusting_string') }}"></script>
@endsection

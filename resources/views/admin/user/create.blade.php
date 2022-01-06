@extends(backpack_view('blank'))

@php
  $defaultBreadcrumbs = [
    trans('backpack::crud.admin') => url(config('backpack.base.route_prefix'), 'dashboard'),
    $crud->entity_name_plural => url($crud->route),
    trans('backpack::crud.add') => false,
  ];

  // if breadcrumbs aren't defined in the CrudController, use the default breadcrumbs
  $breadcrumbs = $breadcrumbs ?? $defaultBreadcrumbs;
@endphp

@section('header')
	<section class="container-fluid">
	  <h2>
        <span class="text-capitalize">{!! $crud->getHeading() ?? $crud->entity_name_plural !!}</span>
        <small>{!! $crud->getSubheading() ?? trans('backpack::crud.add').' '.$crud->entity_name !!}.</small>

        @if ($crud->hasAccess('list'))
          <small><a href="{{ url($crud->route) }}" class="d-print-none font-sm"><i class="la la-angle-double-{{ config('backpack.base.html_direction') == 'rtl' ? 'right' : 'left' }}"></i> {{ trans('backpack::crud.back_to_all') }} <span>{{ $crud->entity_name_plural }}</span></a></small>
        @endif
	  </h2>
	</section>
@endsection

@section('content')

<div class="row">
	<div class="{{ $crud->getCreateContentClass() }}">
		<!-- Default box -->

		@include('crud::inc.grouped_errors')

		  <form method="post"
		  		action="{{ url($crud->route) }}"
				@if ($crud->hasUploadFields('create'))
				enctype="multipart/form-data"
				@endif
		  		>
			  {!! csrf_field() !!}
		      <!-- load the view from the application if it exists, otherwise load the one in the package -->
			  @include('admin.user.form_content', [ 'fields' => $crud->fields(), 'action' => 'create' ])

	          @include('crud::inc.form_save_buttons')
		  </form>
	</div>
	
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"></script>  
<script>



function setEndTime(){
	var accountTypeId = $("#account_type_id").val();
	var from = $('#start_time').val();
	if(from !='' && accountTypeId != ''){
		Date.prototype.yyyymmdd = function() {
	var mm = this.getMonth() + 1; // getMonth() is zero-based
	var dd = this.getDate();

	return [this.getFullYear(),
			(mm>9 ? '' : '0') + mm,
			(dd>9 ? '' : '0') + dd
			];
	};

	var from = $('#start_time').val();
	var endTime = new Date(from);
	var duration =0;

	if(accountTypeId ==''){

	}
	var accountTypes =  {!! json_encode($accountTypes->toArray(), JSON_HEX_TAG) !!};
	if(accountTypeId !== ''){
	 duration = accountTypes[accountTypeId];
	}
	endTime.setDate(endTime.getDate() + duration);
	endTime1 = endTime.yyyymmdd();
	console.log(endTime1);
	console.log( endTime1[1]+'-'+endTime1[2]+'-'+endTime1[0]);
	document.getElementById("text").innerHTML = endTime1[1]+' / '+endTime1[2]+' / '+endTime1[0];
	}
	
}


</script>
@endsection

@section('after_scripts')

@endsection

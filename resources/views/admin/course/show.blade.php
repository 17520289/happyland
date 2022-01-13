@extends(backpack_view('blank'))

@php
$defaultBreadcrumbs = [
    backpack_user()->roles[0]->name => url(config('backpack.base.route_prefix'), 'dashboard'),
    $crud->entity_name_plural => url($crud->route),
    trans('backpack::crud.preview') => false,
];
$course = $crud->getCurrentEntry();
// if breadcrumbs aren't defined in the CrudController, use the default breadcrumbs
$breadcrumbs = $breadcrumbs ?? $defaultBreadcrumbs;
@endphp

@section('header')
    <section class="container-fluid ">
        <a href="javascript: window.print();" class="btn float-right"><i class="la la-print"></i></a>
        <h2>
            <span class="text-capitalize">{!! $crud->getHeading() ?? $crud->getCurrentEntry()->name !!}</span>
            <small>{!! $crud->getSubheading() ?? mb_ucfirst(trans('backpack::crud.preview')) . ' ' . $crud->entity_name !!}.</small>
            @if ($crud->hasAccess('list'))
                <small class=""><a href="{{ url($crud->route) }}" class="font-sm"><i
                            class="la la-angle-double-left"></i> {{ trans('backpack::crud.back_to_all') }}
                        <span>{{ $crud->entity_name_plural }}</span></a></small>
            @endif
        </h2>

    </section>
    <hr style="width:100%;">
@endsection

@section('content')
    <div class="row">
        <div class="col-md-2">
            @include('layouts.sidebar')
        </div>
        <div class="col-md-10">

            <!-- Default box -->
            <div class="row">
                @if ($crud->model->translationEnabled())
                    <div class="row">
                        <div class="col-md-12 mb-2">
                            <!-- Change translation button group -->
                            <div class="btn-group float-right">
                                <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    {{ trans('backpack::crud.language') }}:
                                    {{ $crud->model->getAvailableLocales()[request()->input('locale') ? request()->input('locale') : App::getLocale()] }}
                                    &nbsp; <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu">
                                    @foreach ($crud->model->getAvailableLocales() as $key => $locale)
                                        <a class="dropdown-item"
                                            href="{{ url($crud->route . '/' . $entry->getKey() . '/show') }}?locale={{ $key }}">{{ $locale }}</a>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    </div>

                @endif
                <div class="card no-padding no-border">
					<div class="row">
						<div class="col-md-8">
							<table class="table table-striped mb-0" style="padding:10px">
								<tbody>
									@foreach ($crud->columns() as $column)
		
										@if ($column['name'] != 'image')
											<tr>
												<td>
													<strong>{!! $column['label'] !!}:</strong>
												</td>
												<td>
													@if (!isset($column['type']))
														@include('crud::columns.text')
													@else
														@if (view()->exists('vendor.backpack.crud.columns.' . $column['type']))
															@include('vendor.backpack.crud.columns.'.$column['type'])
														@else
															@if (view()->exists('crud::columns.' . $column['type']))
																@include('crud::columns.'.$column['type'])
															@else
																@include('crud::columns.text')
															@endif
														@endif
													@endif
												</td>
											</tr>
										@endif
		
									@endforeach
									@if ($crud->buttons()->where('stack', 'line')->count())
										<tr>
											<td><strong>{{ trans('backpack::crud.actions') }}</strong></td>
											<td>
												@include('crud::inc.button_stack', ['stack' => 'line'])
											</td>
										</tr>
									@endif
								</tbody>
							</table>
						</div>
						<div class="col-md-4" style="padding: 30px">
							<img src="{{asset($course->image)}}" width="100%"  alt="">
						</div>
					</div>
                </div><!-- /.box-body -->
				
            </div><!-- /.box -->

        </div>

    </div>
@endsection


@section('after_styles')
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

@extends(backpack_view('blank'))

@php
$role =  backpack_user()->hasRole('Admin') ? trans('backpack::crud.admin') : trans('backpack::base.supperAdmin');
$defaultBreadcrumbs = [
  $role => url(config('backpack.base.route_prefix'), 'dashboard'),
    trans('backpack::base.Settings') => false,
];

// if breadcrumbs aren't defined in the CrudController, use the default breadcrumbs
$breadcrumbs = $breadcrumbs ?? $defaultBreadcrumbs;
@endphp

@section('header')
    <div class="container-fluid">
        <h2>
            <span class="text-capitalize">{{trans('backpack::base.Settings')}}</span>
        </h2>
    </div>
@endsection

@section('content')
    <!-- Default box -->
    <div class="row">
        <div class="col-md-8 bold-labels">
            <!-- Default box -->
            <form method="post" action="{{route('settings.update.post')}}">
                @csrf
                <div class="card">
                    <div class="card-body row">
                        <div class="form-group col-sm-12 " element="div"> <label>{{trans('backpack::base.fanageFacebook')}}</label>
                            <input type="text" name="url_fb" value="{{ $setting->url_fb ?? ''}}" class="form-control">
                        </div> <!-- load the view from type and view_namespace attribute if set -->                        <!-- select -->
                      
                    </div>
                </div>
                <div id="saveActions" class="form-group">
                        <button type="submit" class="btn btn-success">
                            <span class="la la-save" role="presentation" aria-hidden="true"></span> &nbsp;
                            <span data-value="save_and_back">{{trans('backpack::base.save')}}</span>

                        </button>
                        <a href="http://lms.hihi.io/course" class="btn btn-default"><span class="la la-ban"></span>
                            &nbsp;{{trans('backpack::base.cancel')}}</a>
                    </div>

                    

                </div>

            </form>
        </div>
    </div>
    </div>

@endsection

@section('after_styles')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/noty/3.1.4/noty.css"
integrity="sha512-NXUhxhkDgZYOMjaIgd89zF2w51Mub53Ru3zCNp5LTlEzMbNNAjTjDbpURYGS5Mop2cU4b7re1nOIucsVlrx9fA=="
crossorigin="anonymous" referrerpolicy="no-referrer" />

@endsection

@section('after_scripts')

@endsection

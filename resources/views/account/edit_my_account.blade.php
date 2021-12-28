@extends(backpack_view('blank'))

@section('after_styles')
    <style media="screen">
        .backpack-profile-form .required::after {
            content: ' *';
            color: red;
        }
        /*New custom hls dev css*/



    </style>
    
@endsection

@php
  $breadcrumbs = [
      trans('backpack::crud.admin') => url(config('backpack.base.route_prefix'), 'dashboard'),
      trans('backpack::base.my_account') => false,
  ];
@endphp

@section('header')
    <section class="content-header">
        <div class="container-fluid mb-3">
            <h1>{{ trans('backpack::base.my_account') }}</h1>
        </div>
    </section>
   
@endsection

@section('content')
    <div class="row">
        
        @if (session('success'))
        <div class="col-lg-8">
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        </div>
        @endif

        @if ($errors->count())
        <div class="col-lg-8">
            <div class="alert alert-danger">
                <ul class="mb-1">
                    @foreach ($errors->all() as $e)
                    <li>{{ $e }}</li>
                    @endforeach
                </ul>
            </div>
        </div>
        @endif

        {{-- UPDATE INFO FORM --}}
        <div class="col-lg-10">
            <form class="form" action="{{ route('backpack.account.info.store') }}" enctype="multipart/form-data" method="post">

                {!! csrf_field() !!}

                <div class="card padding-10">

                    <div class="card-header">
                        {{ trans('backpack::base.update_account_info') }}
                    </div>

                    <div class="card-body backpack-profile-form bold-labels">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="row">
                                    <div class="col-md-6 form-group">
                                        @php
                                            $label = trans('backpack::base.name');
                                            $field = 'name';
                                        @endphp
                                        <label class="required">{{ $label }}</label>
                                        <input required class="form-control" type="text" name="{{ $field }}" value="{{ old($field) ? old($field) : $user->$field }}">
                                    </div>
        
                                    <div class="col-md-6 form-group">
                                        @php
                                            $label = config('backpack.base.authentication_column_name');
                                            $field = backpack_authentication_column();
                                        @endphp
                                        <label class="required">{{ $label }}</label>
                                        <input required class="form-control" type="{{ backpack_authentication_column()=='email'?'email':'text' }}" name="{{ $field }}" value="{{ old($field) ? old($field) : $user->$field }}">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 form-group">
                                        @php
                                            $label = 'Display Name';
                                            $field = 'display_name';
                                        @endphp
                                        <label >{{ $label }}</label>
                                        <input  class="form-control" type="text" name="{{ $field }}" value="{{ old($field) ? old($field) : $user->$field }}">
                                    </div>
        
                                    <div class="col-md-6 form-group">
                                        @php
                                            $label = 'Phone';
                                            $field = 'phone';
                                        @endphp
                                        <label >{{ $label }}</label>
                                        <input  class="form-control" type="text" name="{{ $field }}" value="{{ old($field) ? old($field) : $user->$field }}">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 form-group">
                                        @php
                                            $label = 'Street';
                                            $field = 'street';
                                        @endphp
                                        <label >{{ $label }}</label>
                                        <input  class="form-control" type="text" name="{{ $field }}" value="{{ old($field) ? old($field) : $address->$field }}">
                                    </div>
        
                                    <div class="col-md-6 form-group">
                                        @php
                                            $label = 'City';
                                            $field = 'city';
                                        @endphp
                                        <label >{{ $label }}</label>
                                        <input  class="form-control" type="text" name="{{ $field }}" value="{{ old($field) ? old($field) : $address->$field }}">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 form-group">
                                        @php
                                            $label = 'Postal Code';
                                            $field = 'postal_code';
                                        @endphp
                                        <label >{{ $label }}</label>
                                        <input  class="form-control" type="number" name="{{ $field }}" value="{{ old($field) ? old($field) : $address->$field }}">
                                    </div>
        
                                    <div class="col-md-6 form-group">
                                        @php
                                            $label = 'State';
                                            $field = 'state';
                                        @endphp
                                        <label >{{ $label }}</label>
                                        <input  class="form-control" type="text" name="{{ $field }}" value="{{ old($field) ? old($field) : $address->$field }}">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 form-group">
                                        @php
                                            $label = 'Country';
                                            $field = 'country';
                                        @endphp
                                        <label >{{ $label }}</label>
                                        <input  class="form-control" type="text" name="{{ $field }}"  value="{{ old($field) ? old($field) : $address->$field }}">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                @php
                                
                                $label = 'Country';
                                $field =  [
                                    'label' => "Profile Image",
                                    'name' => "image",
                                    'type' => 'image',
                                    'default' => $user->image,
                                    'crop' => true, // set to true to allow cropping, false to disable
                                    'aspect_ratio' => 1, // omit or set to 0 to allow any aspect ratio
                                    // 'disk'      => 's3_bucket', // in case you need to show images from a different disk
                                    // 'prefix'    => 'uploads/images/profile_pictures/' // in case your db value is only the file name (no path), you can use this to prepend your path to the image src (in HTML), before it's shown to the user;
                                  
                                ];
                            @endphp
                            {{-- <input type="file" name="image" id="image"> --}}
                                {{-- @include('fields.image', ['field'=> $field]) --}}
                            </div>
                        </div>
                        
                    </div>

                    <div class="card-footer">
                        <button type="submit" class="btn btn-success"><i class="la la-save"></i> {{ trans('backpack::base.save') }}</button>
                        <a href="{{ backpack_url() }}" class="btn">{{ trans('backpack::base.cancel') }}</a>
                    </div>
                </div>

            </form>
        </div>
        
        {{-- CHANGE PASSWORD FORM --}}
        <div class="col-lg-10">
            <form class="form" action="{{ route('backpack.account.password') }}" method="post">

                {!! csrf_field() !!}

                <div class="card padding-10">

                    <div class="card-header">
                        {{ trans('backpack::base.change_password') }}
                    </div>

                    <div class="card-body backpack-profile-form bold-labels">
                        <div class="row">
                            <div class="col-md-4 form-group">
                                @php
                                    $label = trans('backpack::base.old_password');
                                    $field = 'old_password';
                                @endphp
                                <label class="required">{{ $label }}</label>
                                <input autocomplete="new-password" required class="form-control" type="password" name="{{ $field }}" id="{{ $field }}" value="">
                            </div>

                            <div class="col-md-4 form-group">
                                @php
                                    $label = trans('backpack::base.new_password');
                                    $field = 'new_password';
                                @endphp
                                <label class="required">{{ $label }}</label>
                                <input autocomplete="new-password" required class="form-control" type="password" name="{{ $field }}" id="{{ $field }}" value="">
                            </div>

                            <div class="col-md-4 form-group">
                                @php
                                    $label = trans('backpack::base.confirm_password');
                                    $field = 'confirm_password';
                                @endphp
                                <label class="required">{{ $label }}</label>
                                <input autocomplete="new-password" required class="form-control" type="password" name="{{ $field }}" id="{{ $field }}" value="">
                            </div>
                        </div>
                    </div>

                    <div class="card-footer">
                            <button type="submit" class="btn btn-success"><i class="la la-save"></i> {{ trans('backpack::base.change_password') }}</button>
                            <a href="{{ backpack_url() }}" class="btn">{{ trans('backpack::base.cancel') }}</a>
                    </div>

                </div>

            </form>
        </div>

    </div>
@endsection
@stack('crud_fields_scripts')
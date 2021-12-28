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
        
  

        {{-- UPDATE INFO FORM --}}
        <div class="col-lg-10">
        

                <div class="card padding-10">

                    <div class="card-header">
                        Account Info
                    </div>

                    <div class="card-body backpack-profile-form bold-labels">

                        <div class="row">
                            <div class="col-md-8">
                                <div class="row">
                                    <div class="col-md-2">
                                        <label>Name:</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>{{$user->name}}</p>
                                    </div>   
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label>Display Name:</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>{{$user->display_name}}</p>
                                    </div>   
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label>Email:</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>{{$user->email}}</p>
                                    </div>   
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label>Phone:</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>{{$user->phone}}</p>
                                    </div>   
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label>Street:</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>{{$user->street}}</p>
                                    </div>   
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label>City:</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>{{$user->city}}</p>
                                    </div>   
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label>Postal Code:</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>{{$user->postal_code}}</p>
                                    </div>   
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label>State:</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>{{$user->state}}</p>
                                    </div>   
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label>Country:</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>{{$user->country}}</p>
                                    </div>   
                                </div>
                            </div>
                            <div class="col-md-4">
                            {{-- <input type="file" name="image" id="image"> --}}
                                {{-- @include('fields.image', ['field'=> $field]) --}}
                            </div>
                        </div>
                        
                    </div>

                    <div class="card-footer">
                        <a href="{{route('backpack.account.info.edit')}}" class="btn btn-success"><i class="la la-edit"></i>Edit</a>
                        <a href="{{ backpack_url() }}" class="btn">{{ trans('backpack::base.cancel') }}</a>
                    </div>
                </div>

          
        </div>
        
        {{-- CHANGE PASSWORD FORM --}}
      

    </div>
@endsection
@stack('crud_fields_scripts')
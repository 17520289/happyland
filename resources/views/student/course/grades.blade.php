@extends(backpack_view('blank'))
@php
$breadcrumbs = [
    backpack_user()->roles[0]->name => url(config('backpack.base.route_prefix'), 'dashboard'),
    'Course' => route('course.index'),
    'Score' => false,
];
@endphp
@section('header')
    <div class="container-fluid">
        <h2><a href="{{ route('course.show', ['id' => $course->id]) }}"><i class="la la-backward nav-icon"></i></a>
            <span class="text-capitalize">{{ $course->name }}</span>
            <small> >> Grades</small>
        </h2>
    </div>
    <hr style="width:100%;">
@endsection
@section('content')
    <!-- Default box -->
    <div class="row mt-4">
        <div class="col-md-2">
            @include('layouts.sidebar')
        </div>
        <div class="col-md-10">
            <div class="row mb-2 " id="new_colums">
                <div class="col-md-12">
                    @if (backpack_user()->hasAnyRole('Admin', 'Teacher'))
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addNewCol">
                            <i class="la la-plus"></i> New Column
                        </button>
                    @endif
                </div>
            </div>
            <div class="row">
                <table class="table table-responsive-sm table-sm table-grades">
                    <thead>
                      <tr>
                        <th scope="col">#Column </th>
                        <th scope="col">Scores</th>
                        <th scope="col">Comment</th>
                        <th scope="col">Classification</th>
                      </tr>
                    </thead>
                    <tbody>
                       
                        @foreach ($columnScores as $column)
                        @php
                            $grade = \App\Models\Grade::where('user_id', backpack_user()->id)->where('column_score_id', $column->id)->first();
                        @endphp
                        <tr>
                            <td ><b>{{$column->name}}</b></td>
                            <td >{{ $grade->scores ?? '...'}}</td>
                            <td style="word-wrap: break-word;  max-width: 150px;padding-right: 30px">{{ $grade->comment ?? '...'}}</td>
                            <td  >{{ $grade->classification ?? '...'}}</td>
                          </tr>
                        @endforeach
                 
                    </tbody>
                  </table>
            </div>
        </div>
    </div>
    </div>

@endsection
@section('after_styles')
    <style>
        .table-grades td {
            height: 80px;
            margin-left: 30px;
            vertical-align: middle;
        }

    </style>
   
@endsection
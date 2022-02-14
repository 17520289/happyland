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
    <div class="row mt-4 pl-5 pr-5">
        {{-- <div class="col-md-2">
            @include('layouts.sidebar')
        </div> --}}
        <div class="col-md-12">
            <div class="row mb-2 " id="new_colums">
                <div class="col-md-12">
                    @if (backpack_user()->hasAnyRole('Super Admin','Admin', 'Teacher'))
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addNewCol">
                            <i class="la la-plus"></i> New Column
                        </button>
                    @endif
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div id="datatable_search_stack" class="mt-sm-0 mt-2 d-print-none"></div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table table-bordered yajra-datatable" width="100%">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Full Name</th>
                            @foreach ($columnScores as $columnScore)
                                <th>{{ ucwords($columnScore->name) }}</th>
                            @endforeach
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>




        </div>
    </div>
    </div>

@endsection
<div class="modal fade" id="addNewCol" tabindex="-1" role="dialog" aria-labelledby="addNewColGrade"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addNewColGrade">Add column</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="alert alert-danger" style="display:none"></div>
                <form class="" method="post" id="add-column" action="" enctype="multipart/form-data">
                    @csrf
                    <div class="form-group">
                        <label class="form-label"><b>Name:</b> </label><input id="nameCol" type="text"
                            name="name" class="form-control m-input" placeholder="Enter name" autocomplete="off">
                        <label class="form-label"><b>Description:</b> </label><input id="descriptionCol"
                            type="text" name="description" class="form-control m-input" placeholder="Enter description"
                            autocomplete="off">

                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success" id="addColumn">Save</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="bannerformmodal" tabindex="-1" role="dialog" aria-labelledby="bannerformmodal"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="viewModalLabel"><strong>Scoring</strong></h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <form class="" method="post" id="edit-grade" action="" enctype="multipart/form-data">
                <div class="modal-body">
                    <div class="alert alert-danger" style="display:none"></div>

                    @csrf
                    <div class="form-group">
                        <b>Full Name: </b><span id="full-name"></span><br>

                        <b><label for="">Scores: </label></b>
                        <input class="form-control" type="number" name="scores" min=0 id="scores">

                        <b><label>Comment: </label></b>
                        <textarea name="comment" id="comment" class="textarea form-control" id="emails" cols="40"
                            rows="5"></textarea>
                    </div>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-success" id="formSubmit">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

@section('after_styles')
    <style>

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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/noty/3.1.4/noty.css"
        integrity="sha512-NXUhxhkDgZYOMjaIgd89zF2w51Mub53Ru3zCNp5LTlEzMbNNAjTjDbpURYGS5Mop2cU4b7re1nOIucsVlrx9fA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- CRUD LIST CONTENT - crud_list_styles stack -->
    @stack('crud_list_styles')
@endsection

@section('after_scripts')
    <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.21/js/dataTables.bootstrap4.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/noty/3.1.4/noty.js"
        integrity="sha512-mgZL3SZ/vIooDg2mU2amX6NysMlthFl/jDbscSRgF/k3zmICLe6muAs7YbITZ+61FeUoo1plofYAocoR5Sa1rQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script type="text/javascript">
     
        var columnScores = {!! json_encode($columnScores->toArray()) !!};
        function getColumn(){
            var columns = [{
                data: 'DT_RowIndex',
                name: 'DT_RowIndex'
            },
            {
                data: 'full_name_custom',
                name: 'full_name_custom'
            },
            ];

                for (id in columnScores) {
                    var value = {
                        data: `${columnScores[id].name}` + 'score',
                        name: `${columnScores[id].name}`,
                        render: function(data, type) {
                            var dataId = data.split('/');
                            if(dataId[3] == 'active'){
                                var html = '<a href="#bannerformmodal" data-score="' + dataId[2] +
                                '"  data-toggle="modal" data-target="#bannerformmodal"';
                            html += 'class="view-grade" data-user-id="' + dataId[0] + '"  data-column-id="' +
                                dataId[1] + '"><p id="score[' + dataId[0] + '][' + dataId[1] + ']">' + dataId[
                                    2] + '</p></a>';
                            }else{
                                var html = '<p >' + dataId[2] + '</p>';
                            }
                        
                            return html;
                        },

                    };
                    
                    columns.push(value);
                }
          return columns;
        }

        var table = $('.yajra-datatable').DataTable({
            processing: true,
            serverSide: true,
            responsive: true,
            ajax: "{{ route('course.ajax-grades.get', ['id' => $course->id]) }}",
            columns: getColumn(),

        });


        var modal = '<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">';
        modal += '<h4 class="modal-title" id="viewModalLabel"><strong>Score</strong></h4> <button type="button" class="close"';
        modal += 'data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span>  </button></div>';
        modal += '<form class="" method="post" id="edit-grade" action="" enctype="multipart/form-data"> ';
        modal += '<div class="modal-body"><div class="alert alert-danger" style="display:none"></div> @csrf';
        modal += '<div class="form-group"><b>Full Name: </b><span id="full-name"></span><br><br><b><label for="">';
        modal += 'Scores: </label></b><input class="form-control" type="number" name="scores" min = 0 id="scores">';
        modal +=
            '<b><label>Comment: </label></b> <textarea name="comment" id="comment" class="textarea form-control" id="emails" cols="40" rows="5"></textarea> </div> </div>   <div class="modal-footer">   <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> <button type="button" class="btn btn-success" id="formSubmit" >Save</button></div></form></div></div></div>';
        $("#bannerformmodal").on("hidden.bs.modal", function() {
            console.log('test');
            $("#bannerformmodal").html("");

        });
        var grades =  @json($grades);
        
        
        $('body').on('click', '.view-grade', function() {
            var userId = $(this).data('user-id');
            var columnId = $(this).data('column-id');
            var grade = grades.filter(obj => {
                return obj.user_id === userId && obj.column_score_id ===  columnId
            }) 
            
            $("#bannerformmodal").html(modal);
            $('#scores').val(grade[0].scores);
            $('#comment').val(grade[0].comment);
            document.getElementById('full-name').innerHTML = grade[0].user.full_name;
           
            var scores = $(this).data('score');
          
           
            $('#formSubmit').click(function(e) {
                e.preventDefault();
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({

                    url: "{{ route('course.update-grade.post', ['id' => $course->id]) }}",
                    method: 'post',
                    data: {
                        userId: userId,
                        columnId: columnId,
                        comment: $('#comment').val(),
                        scores: $('#scores').val(),

                    },

                    success: function(response) {

                        if (response.errors) {
                            new Noty({
                                theme: 'light',
                                type: "warning",
                                text: "error",
                            }).show();
                        
                            // location.reload();

                        } else {
                            new Noty({
                                theme: 'light',
                                type: "success",
                                text: "success",
                            }).show();
                            $('#bannerformmodal').modal('toggle');
                            grade[0].scores = $('#scores').val();
                            grade[0].comment = $('#comment').val();

                            document.getElementById('score[' + userId + '][' + columnId + ']')
                                .innerHTML = $('#scores').val();

                            // window.setTimeout(function() {
                            //     location.reload();
                            // }, 1000);

                        }

                    },

                });
            });

        });






        $('body').on('click', '#addColumn', function() {
            var course_id = "{{ $course->id }}";
            var name = $('#nameCol').val();
            var description = $('#descriptionCol').val();
            var url = "{{ route('course.grade.addColumn.post', ['id' => ':id']) }}";
            url = url.replace(':id', course_id);
            var token = "{{ csrf_token() }}";
            $.ajax({
                type: 'POST',
                url: url,

                data: {
                    'course_id': course_id,
                    'name': name,
                    'description': description,
                    '_token': token
                },
                success: function(response) {
                    if (response.status == "success") {
                        $('#addNewCol').modal('toggle');
                        new Noty({
                            theme: 'light',
                            type: "success",
                            text: 'Added',
                        }).show();
                        window.setTimeout(function() {
                            location.reload();
                        }, 2000);
                    } else {
                        new Noty({
                            theme: 'light',
                            type: "error",
                            text: 'Error',
                        }).show();
                    }
                }
            });
        });
    </script>

@endsection

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
        <h2>
            <span class="text-capitalize">{{ $course->name }}</span>
            <small> >> Grades</small>
        </h2>
    </div>
    <hr style="width:100%;" class="mt-1 mb-1">
@endsection

@section('content')
    <!-- Default box -->
    <div class="row menu-top ">
        @include('layouts.sidebar')
    </div>
    <div class="row ">
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
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editColumn">
                            <i class="la la-edit"></i> Edit 
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
<div class="modal fade show"  id="editColumn" tabindex="-1" role="dialog" aria-labelledby="addNewColGrade"
    aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" >Edit column</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="alert alert-danger" style="display:none"></div>
                <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col" style="width: 5%;">#</th>
                        <th scope="col" style="width: 30%;">Name</th>
                        <th scope="col" >Description</th>
                        <th scope="col" style="width: 20%;">Action</th>
                      </tr>
                    </thead>
                    <form class="" id="formEditColumn" method="post" id="add-column" action="" enctype="multipart/form-data">
                    <tbody>
                        @foreach ($allColumnScores as $key=>$column)
                        <tr>
                            <th scope="row">{{$key+1}}</th>
                            <td><input class="form-control"  name="columns[{{$column->id}}][name]" type="text" value="{{$column->name ?? ''}}"></td>
                            <td><input class="form-control" name="columns[{{$column->id}}][description]" type="text" value="{{$column->description ?? ''}}"></td>
                            <td style="text-align: center">
                                <label class="switch switch-label switch-pill switch-primary mb-0 pt-1">
                                    <input class="switch-input action-delete"  name="columns[{{$column->id}}][action]"
                                        type="checkbox" @if ($column->deleted_at == null)  checked  @endif 
                                    ><span class="switch-slider" data-checked="On" data-unchecked="Off"></span>
                                </label>
                                <a href="javascript:;"  data-column-edit-id="{{$column->id}}" data-column-edit-name="{{$column->name}}" class="sa-params delete btn btn-danger btn-sm" title="Remove from course"><i class="la la-trash"></i></a>
                            </td>
                          </tr>
                        @endforeach
                    
                    </tbody>
                    </form>
                  </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success" id="editColumnGrade">Save</button>
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

@endsection

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
                            text: 'Item has already been added.',
                        }).show();
                    }
                }
            });
        });
        $('body').on('click', '#editColumnGrade', function() {
            var form = $('#formEditColumn');
            var course_id = "{{ $course->id }}";
            var url = "{{ route('course.update-column.post', ['id' => ':id']) }}";
            url = url.replace(':id', course_id);
            $.ajax({
                type: 'POST',
                url: url,
                data: form.serialize(),
                success: function(response){
                    if (response.success) {
                        new Noty({
                            theme: 'light',
                            type: "success",
                            text: response.success,
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
        $('body').on('click', '.sa-params', function() {
            var column_id = $(this).data('column-edit-id');
            var column_name = $(this).data('column-edit-name');
            var course_id = "{{ \Route::current()->parameter('id') }}";
            swal({
                    title: "Are you sure?",
                    text: "Happy Land will permanently delete this column. Do you want to continue?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        var url =
                            "{{ route('course.delete-column.post', ['id' => ':id']) }}";
                        url = url.replace(':id', course_id);
                        var token = "{{ csrf_token() }}";
                        $.ajax({
                            type: 'POST',
                            url: url,
                            data: {
                                'column_id' : column_id,
                                '_token': token
                            },
                            success: function(response) {
                                if (response.success) {
                                    swal(response.success, {
                                        icon: "success",
                                    });
                                    window.setTimeout(function() {
                                        location.reload();
                                    }, 2000);
                                } else {
                                    swal(response.error, {
                                        icon: "error",
                                    });
                                }
                            }
                        });


                    } else {

                    }
                });

        });
    </script>

@endsection

@extends(backpack_view('blank'))

@php

$course = \App\Models\Course::find(\Route::current()->parameter('id'));

// if breadcrumbs aren't defined in the CrudController, use the default breadcrumbs
$breadcrumbs = [
    backpack_user()->roles[0]->name => url(config('backpack.base.route_prefix'), 'dashboard'),
    'Courses' => route('course.index'),
    'List-Student' => false,
];

@endphp

@section('header')
    <div class="container-fluid">
        <h2><a href="{{ route('course.show', ['id' => \Route::current()->parameter('id')]) }}"><i
          class="la la-backward nav-icon"></i></a>
          <span class="text-capitalize">{{ $course->name }}</span>
            <small> >> List Student</small>
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
            <div class="row mb-2">
                @if (backpack_user()->hasRole('Admin') || backpack_user()->hasRole('Teacher'))
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addPeopleModal">
                        Add Student
                    </button>
                @endif
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <div id="datatable_search_stack" class="mt-sm-0 mt-2 d-print-none"></div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table table-bordered yajra-datatable">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Phone</th>
                            <th>Action</th>
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
<div class="modal fade" id="addPeopleModal" tabindex="-1" role="dialog" aria-labelledby="addPeopleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addPeopleModalLabel">Add Student</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="alert alert-danger" style="display:none"></div>
                <form class="image-upload" method="post"
                    action="{{ route('course.postAddPeople', ['id' => \Route::current()->parameter('id'), 'role' => 'Student']) }}"
                    enctype="multipart/form-data">
                    @csrf
                    <div class="form-group">
                        <b><label>Email Addresses (required)</label></b>

                        <textarea placeholder="lsmith@myschool.edu, mfoster@myschool.edu" name="emails"
                            class="textarea form-control" id="emails" cols="40" rows="5"></textarea>
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success" id="formSubmit">Save</button>
            </div>
        </div>
    </div>
</div>



@section('after_styles')

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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/noty/3.1.4/noty.js"
        integrity="sha512-mgZL3SZ/vIooDg2mU2amX6NysMlthFl/jDbscSRgF/k3zmICLe6muAs7YbITZ+61FeUoo1plofYAocoR5Sa1rQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            $('#formSubmit').click(function(e) {
                e.preventDefault();
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({

                    url: "{{ route('course.postAddPeople', ['id' => \Route::current()->parameter('id'), 'role' => 'Student']) }}",
                    method: 'post',
                    data: {
                        emails: $('#emails').val(),
                    },

                    success: function(response) {
                        var text = '';
                        for (const property in response.errors) {
                            text += `${property} - ${response.errors[property]}\n`;
                            
                        }
                        if (response.errors) {
                            new Noty({
                                theme: 'light',
                                type: "warning",
                                text: text,
                            }).show();

                            // location.reload();

                        } else {
                            new Noty({
                                theme: 'light',
                                type: "success",
                                text: response.success,
                            }).show();
                            window.setTimeout(function() {
                                location.reload();
                            }, 3000);
                        }

                    },
                    error: function(response) {
                        location.reload();
                    }
                });
            });
        });
    </script>

    <script src="{{ asset('packages/backpack/crud/js/crud.js') . '?v=' . config('backpack.base.cachebusting_string') }}">
    </script>
    <script src="{{ asset('packages/backpack/crud/js/form.js') . '?v=' . config('backpack.base.cachebusting_string') }}">
    </script>
    <script src="{{ asset('packages/backpack/crud/js/list.js') . '?v=' . config('backpack.base.cachebusting_string') }}">
    </script>

    <!-- CRUD LIST CONTENT - crud_list_scripts stack -->
    @stack('crud_list_scripts')
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.js"></script>
    <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.21/js/dataTables.bootstrap4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.3.1/sweetalert2.d.ts"></script>
    <script type="text/javascript">
        $(function() {
            var table = $('.yajra-datatable').DataTable({
                processing: true,
                serverSide: true,
                ajax: "{{ route('course.ajax-list-people', ['id' => \Route::current()->parameter('id'), 'role' => 'Student']) }}",
                columns: [{
                        data: 'DT_RowIndex',
                        name: 'DT_RowIndex'
                    },
                    {
                        data: 'name',
                        name: 'name'
                    },
                    {
                        data: 'email',
                        name: 'email'
                    },
                    {
                        data: 'gender',
                        name: 'gender'
                    },
                    {
                        data: 'phone',
                        name: 'phone'
                    },


                    {
                        data: 'action',
                        name: 'action',
                        orderable: true,
                        searchable: true
                    },
                ]
            });

        });
        $('body').on('click', '.sa-params', function() {
            var user_id = $(this).data('user-id');
            var course_id = "{{ \Route::current()->parameter('id') }}";
            swal({
                    title: "Are you sure?",
                    text: "Delete this person in the course!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        var url =
                            "{{ route('course.deletePeople.post', ['id' => ':id', 'userId' => ':user_id']) }}";
                        url = url.replace(':id', course_id);
                        url = url.replace(':user_id', user_id);
                        var token = "{{ csrf_token() }}";
                        $.ajax({
                            type: 'POST',
                            url: url,
                            data: {
                                '_token': token
                            },
                            success: function(response) {
                                if (response.status == "success") {
                                    swal("Teacher has been deleted!", {
                                        icon: "success",
                                    });
                                    window.setTimeout(function() {
                                        location.reload();
                                    }, 2000);
                                } else {
                                    swal("Teacher dosen't exist in course!", {
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

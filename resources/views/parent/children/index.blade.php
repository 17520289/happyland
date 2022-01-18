@extends(backpack_view('blank'))
@php
$defaultBreadcrumbs = [
    'Parent' => url(config('backpack.base.route_prefix'), 'dashboard'),
    'Children' => false,
];
// if breadcrumbs aren't defined in the CrudController, use the default breadcrumbs
$breadcrumbs = $breadcrumbs ?? $defaultBreadcrumbs;
@endphp
@section('header')
    <div class="container-fluid">
        <h2><a href=""></a>
            <span class="text-capitalize">All Children</span>
        </h2>
    </div>
    <hr style="width:100%;">
@endsection
@section('content')
    <!-- Default box -->
    <div class="row mt-4 " style="margin-left: 100px">
        <div class="row">
            <div class="col-sm-6">
                <div id="datatable_search_stack" class="mt-sm-0 mt-2 d-print-none"></div>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-bordered yajra-datatable ">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Status</th>
                        <th>Courses</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>

    </div>
    </div>

@endsection
@section('after_styles')
    <link rel="stylesheet" type="text/css"
        href="{{ asset('packages/datatables.net-bs4/css/dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" type="text/css"
        href="{{ asset('packages/datatables.net-fixedheader-bs4/css/fixedHeader.bootstrap4.min.css') }}">
    <link rel="stylesheet" type="text/css"
        href="{{ asset('packages/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css') }}">

@endsection
@push('after_scripts')
    <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.21/js/dataTables.bootstrap4.min.js"></script>
    
    <script type="text/javascript">
        var table = $('.yajra-datatable').DataTable({
            processing: true,
            responsive: true,
            serverSide: true,
            rowReorder: false,
            ajax: "{{ route('parent.ajax-listChildren.get', ['id' => \Route::current()->parameter('id')]) }}",
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
                    data: 'start_time',
                    name: 'start_time'
                },
                {
                    data: 'end_time',
                    name: 'end_time'
                },
                {
                    data: 'status',
                    name: 'status'
                },
                {
                    data: 'action',
                    name: 'action'
                },
            ],
        });
    </script>
@endpush

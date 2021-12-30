@extends(backpack_view('blank'))

@php

  $defaultBreadcrumbs = [
    trans('backpack::crud.admin') => url(config('backpack.base.route_prefix'), 'dashboard'),
    $crud->entity_name_plural => url($crud->route),
    trans('backpack::crud.list') => false,
  ];

  // if breadcrumbs aren't defined in the CrudController, use the default breadcrumbs
  $breadcrumbs = $breadcrumbs ?? $defaultBreadcrumbs;
@endphp

@section('header')
  <div class="container-fluid">
    <h2>
      <span class="text-capitalize">People</span>
      <small id="datatable_info_stack">{!! $crud->getSubheading() ?? '' !!}</small>
    </h2>
  </div>
@endsection

@section('content')
  <!-- Default box -->
  <div class="row">
    <div class="col-md-2">
      @include('admin.course.sidebar')
    </div>
   <div class="col-md-10">
      <!-- THE ACTUAL CONTENT -->
    <div class="{{ $crud->getListContentClass() }}">

      <div class="row mb-0">
        <div class="col-sm-6">
          @if (backpack_user()->hasRole('Admin'))
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addPeopleModal">
            Add Teacher
          </button>
         
          <!-- Modal -->
        
          @endif
        </div>
        <div class="col-sm-6">
          <div id="datatable_search_stack" class="mt-sm-0 mt-2 d-print-none"></div>
        </div>
      </div>

      {{-- Backpack List Filters --}}
      @if ($crud->filtersEnabled())
        @include('crud::inc.filters_navbar')
      @endif

      <table id="crudTable" class="bg-white table table-striped table-hover nowrap rounded shadow-xs border-xs mt-2" cellspacing="0">
          <thead>
            <tr>
              {{-- Table columns --}}
              @foreach ($crud->columns() as $column)
                <th
                  data-orderable="{{ var_export($column['orderable'], true) }}"
                  data-priority="{{ $column['priority'] }}"
                   {{--

                      data-visible-in-table => if developer forced field in table with 'visibleInTable => true'
                      data-visible => regular visibility of the field
                      data-can-be-visible-in-table => prevents the column to be loaded into the table (export-only)
                      data-visible-in-modal => if column apears on responsive modal
                      data-visible-in-export => if this field is exportable
                      data-force-export => force export even if field are hidden

                  --}}

                  {{-- If it is an export field only, we are done. --}}
                  @if(isset($column['exportOnlyField']) && $column['exportOnlyField'] === true)
                    data-visible="false"
                    data-visible-in-table="false"
                    data-can-be-visible-in-table="false"
                    data-visible-in-modal="false"
                    data-visible-in-export="true"
                    data-force-export="true"
                  @else
                    data-visible-in-table="{{var_export($column['visibleInTable'] ?? false)}}"
                    data-visible="{{var_export($column['visibleInTable'] ?? true)}}"
                    data-can-be-visible-in-table="true"
                    data-visible-in-modal="{{var_export($column['visibleInModal'] ?? true)}}"
                    @if(isset($column['visibleInExport']))
                       @if($column['visibleInExport'] === false)
                         data-visible-in-export="false"
                         data-force-export="false"
                       @else
                         data-visible-in-export="true"
                         data-force-export="true"
                       @endif
                     @else
                       data-visible-in-export="true"
                       data-force-export="false"
                     @endif
                  @endif
                >
                  {!! $column['label'] !!}
                </th>
              @endforeach

              @if ( $crud->buttons()->where('stack', 'line')->count() )
                <th data-orderable="false"
                    data-priority="{{ $crud->getActionsColumnPriority() }}"
                    data-visible-in-export="false"
                    >{{ trans('backpack::crud.actions') }}</th>
              @endif
            </tr>
          </thead>
          <tbody>
          </tbody>
          <tfoot>
            <tr>
              {{-- Table columns --}}
              @foreach ($crud->columns() as $column)
                <th>{!! $column['label'] !!}</th>
              @endforeach

              @if ( $crud->buttons()->where('stack', 'line')->count() )
                <th>{{ trans('backpack::crud.actions') }}</th>
              @endif
            </tr>
          </tfoot>
        </table>

        @if ( $crud->buttons()->where('stack', 'bottom')->count() )
        <div id="bottom_buttons" class="d-print-none text-center text-sm-left">
          @include('crud::inc.button_stack', ['stack' => 'bottom'])

          <div id="datatable_button_stack" class="float-right text-right hidden-xs"></div>
        </div>
        @endif

  </div>

   </div>
  </div>

@endsection
<div class="modal fade" id="addPeopleModal" tabindex="-1" role="dialog" aria-labelledby="addPeopleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
      <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="addPeopleModalLabel">Add Teacher</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
              </button>
          </div>
          <div class="modal-body">
              <div class="alert alert-danger" style="display:none"></div>
              <form class="image-upload" method="post" action="{{route('course.postAddTeacher', ['id', 1])}}" enctype="multipart/form-data">
                  @csrf
                  <div class="form-group">
                      <b><label>Email Addresses (required)</label></b>
                      
                      <textarea placeholder="lsmith@myschool.edu, mfoster@myschool.edu" name="emails" class="textarea form-control" id="emails" cols="40" rows="5"></textarea>
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
  <link rel="stylesheet" type="text/css" href="{{ asset('packages/datatables.net-bs4/css/dataTables.bootstrap4.min.css') }}">
  <link rel="stylesheet" type="text/css" href="{{ asset('packages/datatables.net-fixedheader-bs4/css/fixedHeader.bootstrap4.min.css') }}">
  <link rel="stylesheet" type="text/css" href="{{ asset('packages/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css') }}">

  <link rel="stylesheet" href="{{ asset('packages/backpack/crud/css/crud.css').'?v='.config('backpack.base.cachebusting_string') }}">
  <link rel="stylesheet" href="{{ asset('packages/backpack/crud/css/form.css').'?v='.config('backpack.base.cachebusting_string') }}">
  <link rel="stylesheet" href="{{ asset('packages/backpack/crud/css/list.css').'?v='.config('backpack.base.cachebusting_string') }}">

  <!-- CRUD LIST CONTENT - crud_list_styles stack -->
  @stack('crud_list_styles')
@endsection

@section('after_scripts')
<script type="text/javascript">
  $(document).ready(function(){
      $('#formSubmit').click(function(e){
          e.preventDefault();
          $.ajaxSetup({
              headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              }
          });
          $.ajax({
            
              url: "{{ route('course.postAddTeacher', ['id'=>1]) }}",
              method: 'post',
              data: {
                  emails: $('#emails').val(),
                  test : 'dfasdf'
              },
             
              success:  function(result){
                        if(result.errors)
                        {
                            $('.alert-danger').html('');

                            $.each(result.errors, function(key, value){
                                $('.alert-danger').show();
                                $('.alert-danger').append('<li>'+value+'</li>');
                            });
                        }
                        else
                        {
                            $('.alert-danger').hide();
                            $('#addPeopleModal').modal('hide');
                        }
                    },
           
          });
      });
  });
</script>
  @include('crud::inc.datatables_logic')
  <script src="{{ asset('packages/backpack/crud/js/crud.js').'?v='.config('backpack.base.cachebusting_string') }}"></script>
  <script src="{{ asset('packages/backpack/crud/js/form.js').'?v='.config('backpack.base.cachebusting_string') }}"></script>
  <script src="{{ asset('packages/backpack/crud/js/list.js').'?v='.config('backpack.base.cachebusting_string') }}"></script>

  <!-- CRUD LIST CONTENT - crud_list_scripts stack -->
  @stack('crud_list_scripts')
@endsection



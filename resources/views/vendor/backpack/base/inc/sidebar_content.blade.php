<!-- This file is used to store sidebar items, starting with Backpack\Base 0.9.0 -->
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('dashboard') }}"><i  class="la la-home nav-icon"></i> {{ trans('backpack::base.dashboard') }}</a></li>

@can('List Course')
<li class='nav-item'><a class='nav-link' href='{{ backpack_url('course') }}'><i class='nav-icon la la-book'></i> Course</a></li>
@endcan
@can('List Material')
<li class='nav-item'><a class='nav-link' href='{{ backpack_url('material') }}'><i class='nav-icon la la-folder-open'></i> Materials</a></li>
@endcan
@can('List AccountType')
<li class='nav-item'><a class='nav-link' href='{{ backpack_url('account-type') }}'><i class='nav-icon la la-outdent'></i> Account types</a></li>
@endcan
@can('List Level')
<li class='nav-item'><a class='nav-link' href='{{ backpack_url('level') }}'><i class='nav-icon la la-indent'></i> Levels</a></li>
@endcan
{{-- menu cho role Admin --}}
@if (backpack_user()->hasAnyRole(['Admin', 'Super Admin']))
<li class="nav-item nav-dropdown">
    <a class="nav-link nav-dropdown-toggle" href="#"><i class="nav-icon la la-users"></i> Authentication</a>
    <ul class="" style="list-style-type: none; padding-left: 0px;">
        <li class="nav-item"><a class="nav-link" href="{{ backpack_url('user') }}"><i class="nav-icon la la-user"></i> <span>Users</span></a></li>
        @if (backpack_user()->hasRole('Super Admin'))
        <li class="nav-item"><a class="nav-link" href="{{ backpack_url('role') }}"><i class="nav-icon la la-id-badge"></i> <span>Roles</span></a></li>
        <li class="nav-item"><a class="nav-link" href="{{ backpack_url('permission') }}"><i class="nav-icon la la-key"></i> <span>Permissions</span></a></li>
        @endif
    </ul>
</li>
@endif


{{-- Menu for role Parent --}}
@if (backpack_user()->hasRole('Parent'))
<li class='nav-item'><a class='nav-link' href='{{ route('parent.list-children.get', ["id" => backpack_user()->id]) }}'><i class='nav-icon la la-user'></i> Children</a></li>
@endif

{{-- Menu for role Student --}}



{{-- @endif --}}
{{-- 
@if (backpack_user()->hasPermissionTo('create course', 'backpack') )
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('elfinder') }}"><i class="nav-icon la la-files-o"></i> <span>{{ trans('backpack::crud.file_manager') }}</span></a></li>
@endif --}}
{{-- @php
    dd(backpack_user()->hasRole('Teacher'));
@endphp --}}
{{-- <li class='nav-item'><a class='nav-link' href='{{ backpack_url('user') }}'><i class='nav-icon la la-question'></i> People</a></li> --}}



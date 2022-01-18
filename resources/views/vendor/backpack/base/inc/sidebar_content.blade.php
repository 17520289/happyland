<!-- This file is used to store sidebar items, starting with Backpack\Base 0.9.0 -->
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('dashboard') }}"><i  class="la la-home nav-icon"></i> {{ trans('backpack::base.dashboard') }}</a></li>

{{-- menu cho role Admin --}}
@if (backpack_user()->hasRole('Admin'))
<li class='nav-item'><a class='nav-link' href='{{ backpack_url('course') }}'><i class='nav-icon la la-book'></i> Course</a></li>
<li class='nav-item'><a class='nav-link' href='{{ backpack_url('material') }}'><i class='nav-icon la la-folder-open'></i> Materials</a></li>
<li class='nav-item'><a class='nav-link' href='{{ backpack_url('account-type') }}'><i class='nav-icon la la-outdent'></i> Account types</a></li>
<li class='nav-item'><a class='nav-link' href='{{ backpack_url('level') }}'><i class='nav-icon la la-indent'></i> Levels</a></li>
<li class="nav-item nav-dropdown">
    <a class="nav-link nav-dropdown-toggle" href="#"><i class="nav-icon la la-users"></i> Authentication</a>
    <ul class="" style="list-style-type: none; padding-left: 0px;">
        <li class="nav-item"><a class="nav-link" href="{{ backpack_url('user') }}"><i class="nav-icon la la-user"></i> <span>Users</span></a></li>
        <li class="nav-item"><a class="nav-link" href="{{ backpack_url('role') }}"><i class="nav-icon la la-id-badge"></i> <span>Roles</span></a></li>
        <li class="nav-item"><a class="nav-link" href="{{ backpack_url('permission') }}"><i class="nav-icon la la-key"></i> <span>Permissions</span></a></li>
    </ul>
</li>
@endif

{{-- Menu for role Teacher --}}
@if (backpack_user()->hasRole('Teacher'))
<li class='nav-item'><a class='nav-link' href='{{ backpack_url('course') }}'><i class='nav-icon la la-book'></i> Course</a></li>
<li class='nav-item'><a class='nav-link' href='{{ backpack_url('material') }}'><i class='nav-icon la la-folder-open'></i> Materials</a></li>
@endif

{{-- Menu for role Parent --}}
@if (backpack_user()->hasRole('Parent'))
<li class='nav-item'><a class='nav-link' href='{{ route('parent.list-children.get', ["id" => backpack_user()->id]) }}'><i class='nav-icon la la-user'></i> Children</a></li>
@endif

{{-- Menu for role Student --}}
@if (backpack_user()->hasRole('Student'))
<li class='nav-item'><a class='nav-link' href='{{ backpack_url('course') }}'><i class='nav-icon la la-book'></i> Course</a></li>
@endif


{{-- @endif --}}
{{-- 
@if (backpack_user()->hasPermissionTo('create course', 'backpack') )
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('elfinder') }}"><i class="nav-icon la la-files-o"></i> <span>{{ trans('backpack::crud.file_manager') }}</span></a></li>
@endif --}}
{{-- @php
    dd(backpack_user()->hasRole('Teacher'));
@endphp --}}
{{-- <li class='nav-item'><a class='nav-link' href='{{ backpack_url('user') }}'><i class='nav-icon la la-question'></i> People</a></li> --}}



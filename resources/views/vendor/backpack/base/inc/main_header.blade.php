<header class="{{ config('backpack.base.header_class') }}" style="padidng: 0px; background-color: #81CC6F">
  <!-- Logo -->
  <button class="navbar-toggler sidebar-toggler d-lg-none mr-auto ml-3" type="button" data-toggle="sidebar-show" aria-label="{{ trans('backpack::base.toggle_navigation')}}">
    <span class="navbar-toggler-icon"></span>
  </button>
  <a class="navbar-brand" style="padding-left: 20px" href="{{ url(config('backpack.base.home_link')) }}" title="{{ config('backpack.base.project_name') }}">
    <img src="{{asset('images/logo.png')}}" alt="" width="35" >{!! config('backpack.base.project_logo') !!}
  </a>
  <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" data-toggle="sidebar-lg-show" aria-label="{{ trans('backpack::base.toggle_navigation')}}">
    <span class="navbar-toggler-icon"></span>
  </button>

  @include(backpack_view('inc.menu'))
</header>

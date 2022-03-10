<!-- =================================================== -->
<!-- ========== Top menu items (ordered left) ========== -->
<!-- =================================================== -->
<ul class="nav navbar-nav d-md-down-none">

    @if (backpack_auth()->check())
        <!-- Topbar. Contains the left part -->
        @include(backpack_view('inc.topbar_left_content'))
    @endif

</ul>
<!-- ========== End of top menu left items ========== -->



<!-- ========================================================= -->
<!-- ========= Top menu right items (ordered right) ========== -->
<!-- ========================================================= -->

<ul class="nav navbar-nav ml-auto @if(config('backpack.base.html_direction') == 'rtl') mr-0 @endif">
   
    <a class="nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
        @if(session()->get('locale') === 'CN')
        <i class="flag-icon flag-icon-cn h5 mb-0"   title="Chinese" width="35"></i>
       
            {{-- <img src="{{asset('images/en.png')}}" width="35"> --}}
        @elseif(session()->get('locale') === 'BM')
        <i class="flag-icon flag-icon-my h5 mb-0"  title="Malay" width="35"></i>
        @else
        <i class="flag-icon  flag-icon-us h5 mb-0"  title="English" width="35"></i>
        @endif
    </a>
    <div class="dropdown-menu dropdown-menu-right mr-4 pb-1 pt-1">
        <a class="dropdown-item" href="{{ route('LangChange') }}?lang=ENG">@if(session()->get('locale') === 'ENG') <i class="la la-check-circle" style="color: #0ace00;"></i>  @endif  <i class="flag-icon flag-icon-us h3"  title="English" ></i>&ensp; English</a>
        <a class="dropdown-item" href="{{ route('LangChange') }}?lang=BM">@if(session()->get('locale') === 'BM') <i class="la la-check-circle" style="color: #0ace00;"></i>  @endif  <i class="flag-icon flag-icon-my h3"  title="Malay" width="35"></i>&ensp;Malay</a>
        <a class="dropdown-item" href="{{ route('LangChange') }}?lang=CN">@if(session()->get('locale') === 'CN') <i class="la la-check-circle" style="color: #0ace00;"></i>  @endif <i class="flag-icon flag-icon-cn h3"  title="Chinese" width="35"></i>&ensp;Chinese</a>
    </div>
    
    @if (backpack_auth()->guest())
        <li class="nav-item"><a class="nav-link" href="{{ route('backpack.auth.login') }}">{{ trans('backpack::base.login') }}</a>
        </li>
        @if (config('backpack.base.registration_open'))
            <li class="nav-item"><a class="nav-link" href="{{ route('backpack.auth.register') }}">{{ trans('backpack::base.register') }}</a></li>
        @endif
    @else
        <!-- Topbar. Contains the right part -->
        
        @include(backpack_view('inc.topbar_right_content'))
        @include(backpack_view('inc.menu_user_dropdown'))
    @endif
</ul>

<!-- ========== End of top menu right items ========== -->

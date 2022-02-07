@if (config('backpack.base.show_powered_by') || config('backpack.base.developer_link'))
<a href="{{ \App\Models\Setting::find(1)->url_fb ?? ''}}"   style="position: absolute; right:8px; bottom: 8" target="_blank" class='nav-link'><i  class="fa fa-facebook-square fa-lg fa-2x"></i></a>
    <div class="text-muted ml-auto mr-auto">
      @if (config('backpack.base.developer_link') && config('backpack.base.developer_name'))
      {{ trans('backpack::base.handcrafted_by') }} <a rel="noopener" href="{{ config('backpack.base.developer_link') }}">{{ config('backpack.base.developer_name') }}</a>.
      @endif
      @if (config('backpack.base.show_powered_by'))
      {{ trans('backpack::base.powered_by') }} <a rel="noopener" href="#">Happyland</a>.
      @endif
    </div>
    
@endif
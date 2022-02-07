@if ($crud->hasAccess('delete') && !$entry->hasAnyRole( 'Super Admin') && backpack_user()->hasRole('Super Admin')) 
        <label class="switch switch-label switch-pill switch-primary mb-0 pt-1">
            <input class="switch-input action-delete" data-user-id="{{ $entry->id }}"
                onclick='actionDelete(this, {{ $entry->id }})' type="checkbox" @if ($entry->deleted_at == null)  checked  @endif 
            ><span class="switch-slider" data-checked="On" data-unchecked="Off"></span>
        </label>
  
@endif
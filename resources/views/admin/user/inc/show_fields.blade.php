{{-- Show the inputs --}}
@php
    $flag =0;
  
@endphp
@foreach ($fields as $field)

    <!-- load the view from type and view_namespace attribute if set -->
    @php
        $fieldsViewNamespace = $field['view_namespace'] ?? 'crud::fields';
     
    @endphp
    @if ($field['name'] == 'start_time')
        {{-- @php
            dd($field);
        @endphp --}}
    @endif
    @if (isset($field['tab']))
        @if ($flag == 0 && $field['tab'] == 'Active / InActive')
        <div class="form-group col-sm-12 required" element="div">
            <label >Account Type</label>
            <select name="account_type_id" id="account_type_id"  @include('crud::fields.inc.attributes')>
                @php
                    $accountTypes = \App\Models\AccountType::all();
                @endphp
                @foreach ($accountTypes as $accountType)
                    <option value="{{$accountType->id}}"
                        @if ($action == 'edit' && $accountTypeDetail != null)
                        @if ($accountType->id == $accountTypeDetail->account_type_id)
                            selected
                        @endif
                        @endif
                        >
                        {{$accountType->name}}
                       
                    </option>
                @endforeach
            </select>
        </div>
        @php
            $flag =1;
        @endphp
         @endif
    @endif
   
    @if ($field['type'] == 'date')
            @include('admin.user.fields.date',['field' => $field])
    @else
         @include($fieldsViewNamespace.'.'.$field['type'], ['field' => $field])  
    @endif
  
  
@endforeach


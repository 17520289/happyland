{{-- Show the inputs --}}
@php
    $flag =0;
  
@endphp
@foreach ($fields as $field)

    <!-- load the view from type and view_namespace attribute if set -->
    @php
        $fieldsViewNamespace = $field['view_namespace'] ?? 'crud::fields';
     
    @endphp
   
    @if ($field['type'] == 'status_account')
            @include('admin.user.fields.status_account',['field' => $field])
    @else
         @include($fieldsViewNamespace.'.'.$field['type'], ['field' => $field])  
    @endif
  
  
@endforeach


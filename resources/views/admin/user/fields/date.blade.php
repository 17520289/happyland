<!-- html5 date input -->

<?php
// if the column has been cast to Carbon or Date (using attribute casting)
// get the value as a date string
if (isset($field['value']) ) {
    $value = $field['value']!=null ? Carbon\Carbon::parse($field['value'])->format('Y-m-d') : '';
    // $field['value'] = $field['value']->format('Y-m-d')->toDateString();
    //  dd($value);
    if($field['name'] == 'end_time'){
        $value = $field['value'] != null ? Carbon\Carbon::parse($field['value'])->format('m / d / Y'): '';
    }
}

?>

@include('crud::fields.inc.wrapper_start')

    <label>{!! $field['label'] !!}</label>
    @include('crud::fields.inc.translatable_icon')
    @if ($field['name'] == 'start_time')
        <input
        type="date"
        name="{{ $field['name'] }}"
        value="{{ old(square_brackets_to_dots($field['name'])) ?? $value ?? $field['default'] ?? '' }}"
        @include('crud::fields.inc.attributes')
        >
    @else
        <p id="text"  @include('crud::fields.inc.attributes')>{{$value ?? ''}}</p>
    @endif
  
   

    {{-- HINT --}}
    @if (isset($field['hint']))
        <p class="help-block">{!! $field['hint'] !!}</p>
    @endif
@include('crud::fields.inc.wrapper_end')

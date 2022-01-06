@php

    $column['text'] = $column['value'] ?? '';
    $column['escaped'] = $column['escaped'] ?? false;
    $column['prefix'] = $column['prefix'] ?? '';
    $column['suffix'] = $column['suffix'] ?? '';

    if(!empty($column['text'])) {
        $column['text'] = $column['prefix'].$column['text'].$column['suffix'];
    }

    $accountTypeDetail = \App\Models\AccountTypeDetail::where('user_id', $entry->id)->orderBy('id', 'desc')->first();
   
    $end_time = $accountTypeDetail !== null ?  Carbon\Carbon::parse($accountTypeDetail->end_time)->format('m / d / Y') :'';
    // dd($start_time);
@endphp

<span>
    @includeWhen(!empty($column['wrapper']), 'crud::columns.inc.wrapper_start')
     
        <p class="badge badge-danger">{{ $end_time  }}</p>
    @includeWhen(!empty($column['wrapper']), 'crud::columns.inc.wrapper_end')
</span>

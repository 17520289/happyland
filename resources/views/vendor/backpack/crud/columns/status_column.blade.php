@php

    $column['text'] = $column['value'] ?? '';
    $column['escaped'] = $column['escaped'] ?? false;
    $column['prefix'] = $column['prefix'] ?? '';
    $column['suffix'] = $column['suffix'] ?? '';

    if(!empty($column['text'])) {
        $column['text'] = $column['prefix'].$column['text'].$column['suffix'];
    }

    $accountTypeDetail = \App\Models\AccountTypeDetail::where('user_id', $entry->id)->orderBy('id', 'desc')->first();
   $statusAccount = $accountTypeDetail !== null ?  $accountTypeDetail->status :'';
    // dd($start_time);
@endphp

<span>
    @includeWhen(!empty($column['wrapper']), 'crud::columns.inc.wrapper_start')
    @if ($statusAccount != '')
 
   {{ucwords($statusAccount)}}
    @else
    
    @endif
     
  
    @includeWhen(!empty($column['wrapper']), 'crud::columns.inc.wrapper_end')
</span>

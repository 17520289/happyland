@php
    $inputDisplay = "";
    $viewDisplay="none";
    $checked = '';
    if($action == 'edit'){
        if($crud->getCurrentEntry()->status == "disable"){
            $inputDisplay = "none";
            $viewDisplay="";
            $checked = '';
        }else{
            $checked = 'checked';
        }

        $start_time = \Carbon\Carbon::parse($accountTypeDetail->start_time ?? null)->format('Y-m-d') ;
        $end_time = \Carbon\Carbon::parse($accountTypeDetail->start_time ?? null)->addDays($accountType->duration ?? 0)->format('m/d/Y') ;
    }

  
@endphp

    <div class="form-group col-sm-12" style="padding-left: 30px" element="div" >
        <label >Enable / Disable</label>
        <br>
        <label class="switch switch-3d switch-primary">
            <input type="checkbox" class="switch-input" name="status"
             onchange="statusChanged()"
             {{$checked}}
             >
            <span class="switch-slider"></span>
        </label>
    </div>
    <hr  style="width:95%; text-align:center;">
    <div class="input-detail col-md-12" style="display: {{ $inputDisplay}}">
        <div class="form-group col-sm-12 required" element="div">
            <label >Account Type</label>
            <select name="account_type_id" onchange="setEndTime()" id="account_type_id"  @include('crud::fields.inc.attributes')>
                @php
                    $accountTypes = \App\Models\AccountType::all();
                @endphp
                @foreach ($accountTypes as $accountType)
                    <option value="{{$accountType->id}}"
                        @if ($action == 'edit' && $accountTypeDetail != null)
                        @if ($accountType->id == $accountTypeDetail->account_type_id ?? null)
                            selected
                        @endif
                        @endif
                        >
                        {{$accountType->name}}
                       
                    </option>
                @endforeach
            </select>
            
        </div>
        <div class="form-group col-sm-12 required" element="div">
            <label >Start Time</label>
            <input 
            onchange="setEndTime()"
            type="date"
            name="start_time"
            id="start_time" 
            value="{{ $start_time ?? '' }}"
            @include('crud::fields.inc.attributes')
            />
        </div>
        <div class="form-group col-sm-12 required"  element="div">
            <label >End Time</label>
            <p id="text" readonly @include('crud::fields.inc.attributes')>{{$end_time ?? ''}}</p>
        </div>
    </div>
    <div class="view-detail col-md-12" id="view-detail" style="display: {{$viewDisplay}} ">
        <div class="form-group col-md-12" element="div">
            <label >Account Type</label>
            <p id="text" readonly @include('crud::fields.inc.attributes')>{{$value ?? ''}}</p>
        </div>
        <div class="form-group col-md-12" element="div">
            <label >Start Time</label>
            <p id="text" readonly @include('crud::fields.inc.attributes')>{{$value ?? ''}}</p>
        </div>
        <div class="form-group col-md-12" element="div">
            <label >End Time</label>
            <p id="text" readonly @include('crud::fields.inc.attributes')>{{$value ?? ''}}</p>
        </div>
    </div>


<script type="text/javascript">


    function statusChanged()
    {
        if($('.switch-input').is(":checked"))  {
            $(".input-detail").show();
            $("#view-detail").hide();
        } 
        else{
            $("#view-detail").show();
            $(".input-detail").hide();
        }
       
    }
</script>
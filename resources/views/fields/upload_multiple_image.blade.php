@php
    $field['wrapper'] = $field['wrapper'] ?? $field['wrapperAttributes'] ?? [];
    $field['wrapper']['data-init-function'] = $field['wrapper']['data-init-function'] ?? 'bpFieldInitUploadMultipleElement';
    $field['wrapper']['data-field-name'] = $field['wrapper']['data-field-name'] ?? $field['name'];
@endphp

<!-- upload multiple input -->
@include('crud::fields.inc.wrapper_start')
    <label>{!! $field['label'] !!}</label>
    @include('crud::fields.inc.translatable_icon')

	{{-- Show the file name and a "Clear" button on EDIT form. --}}
	@if (isset($field['value']))
	@php
		if (is_string($field['value'])) {
			$values = json_decode($field['value'], true) ?? [];
		} else {
			$values = $field['value'];
		}
	@endphp
	@if (count($values))
    <div class="well well-sm existing-file" id="file-preview">
    	@foreach($values as $key => $file_path)
    		<div class="file-preview" >
				<a href="#" class="btn btn-light btn-sm float-right file-clear-button" title="Clear image" data-filename="{{ $file_path['link'] ?? '' }}"><i class="la la-remove"></i></a>
    			@if (isset($field['temporary']))
		            <a target="_blank" href="{{ isset($field['disk'])?asset(\Storage::disk($field['disk'])->temporaryUrl($file_path['link'], Carbon\Carbon::now()->addMinutes($field['temporary']))):asset($file_path['link']) }}">{{ $file_path['link'] }}</a>
		        @else
			
		            <a target="_blank" href="{{ isset($field['disk'])?asset(\Storage::disk($field['disk'] ?? '')->url($file_path['link'] ?? '')):asset($file_path['link'] ?? '') }}">
						<img style="max-width: 300px" src="{{ isset($field['disk'])?asset(\Storage::disk($field['disk'])->url($file_path['link'] ?? '')):asset($file_path['link'] ?? '') }}" alt="">
						<hr>
					</a>
		        @endif
		    	
		    	<div class="clearfix"></div>
	    	</div>
    	@endforeach
		<label id="insert-image" hidden></label>
	
    </div>
    @endif
    @endif
	{{-- Show the file picker on CREATE form. --}}
	<input name="{{ $field['name'] }}[]" type="hidden" value="">
	<div class="backstrap-file mt-2">
		<input
	        type="file"
	        name="{{ $field['name'] }}[]"
	        value="@if (old(square_brackets_to_dots($field['name']))) old(square_brackets_to_dots($field['name'])) @elseif (isset($field['default'])) $field['default'] @endif"
	        @include('crud::fields.inc.attributes', ['default_class' =>  isset($field['value']) && $field['value']!=null?'file_input backstrap-file-input':'file_input backstrap-file-input'])
	        multiple
			{{-- onchange="readURL(this);" --}}
			id="files"
			class="btn btn-primary	"
	    >
        <label class="backstrap-file-label" for="customFile"></label>
		
    </div>
	

    {{-- HINT --}}
    @if (isset($field['hint']))
        <p class="help-block">{!! $field['hint'] !!}</p>
    @endif
@include('crud::fields.inc.wrapper_end')

{{-- ########################################## --}}
{{-- Extra CSS and JS for this particular field --}}
{{-- If a field type is shown multiple times on a form, the CSS and JS will only be loaded once --}}
@if ($crud->fieldTypeNotLoaded($field))
    @php
        $crud->markFieldTypeAsLoaded($field);
    @endphp

    @push('crud_fields_scripts')
        <!-- no scripts -->
        <script>
			$(document).ready(function() {
			if (window.File && window.FileList && window.FileReader) {
				$("#files").on("change", function(e) {
				var files = e.target.files,
					filesLength = files.length;
				for (var i = 0; i < filesLength; i++) {
					var f = files[i]
					var fileReader = new FileReader();
					fileReader.onload = (function(e) {
					var file = e.target;
					$("<div class=\"file-preview\">" +
						'<i class="btn btn-light btn-sm float-right file-clear-button la la-remove remove " title="Clear image" style="cursor: pointer; padding: 10px" data-filename="'+e.target.result+'"></i>'+
						"<img  style='max-width: 300px' src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>" +
						'<hr>'+
						"</div>").insertAfter("#insert-image");
					$(".remove").click(function(){
						$(this).parent(".file-preview").remove();
					});
					
					// Old code here
					/*$("<img></img>", {
						class: "imageThumb",
						src: e.target.result,
						title: file.name + " | Click to remove"
					}).insertAfter("#files").click(function(){$(this).remove();});*/
					
					});
					fileReader.readAsDataURL(f);
				}
				});
			} else {
				alert("Your browser doesn't support to File API")
			}
			});
        	function bpFieldInitUploadMultipleElement(element) {
        		var fieldName = element.attr('data-field-name');
        		var clearFileButton = element.find(".file-clear-button");
        		var fileInput = element.find("input[type=file]");
        		var inputLabel = element.find("label.backstrap-file-label");

		        clearFileButton.click(function(e) {
		        	e.preventDefault();
		        	var container = $(this).parent().parent();
		        	var parent = $(this).parent();
		        	// remove the filename and button
		        	parent.remove();
		        	// if the file container is empty, remove it
		        	if ($.trim(container.html())=='') {
		        		container.remove();
		        	}
		        	$("<input type='hidden' name='clear_"+fieldName+"[]' value='"+$(this).data('filename')+"'>").insertAfter(fileInput);
		        });

		        fileInput.change(function() {
	                inputLabel.html("Files selected. After save, they will show up above.");
		        	// remove the hidden input, so that the setXAttribute method is no longer triggered
					$(this).next("input[type=hidden]:not([name='clear_"+fieldName+"[]'])").remove();
		        });
        	}
		
        </script>

		
    @endpush
@endif

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
class Material extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory;

    protected $table = 'materials';

    protected $fillable = [
        'id',
        'title',
        'description',
        'content',
        'images',
        'course_id',
        'status',
    ];
    protected $casts = ['images' => 'array'];
    public static function boot()
    {
        parent::boot();
        static::deleting(function($obj) {
            if (count((array)$obj->photos)) {
                foreach ($obj->photos as $file_path) {
                    \Storage::disk('materials')->delete($file_path);
                }
            }
        });
    }
    public function course(){
        return $this->belongsTo(Course::class);
    }
   

   
    public function setImagesAttribute($value)
    {
        
            $attribute_name = "images";
            $disk = config('backpack.base.root_disk_name');    
            $destination_path = "public/storage/materials";
            
            $this->uploadMultipleFilesToDisk($value, $attribute_name, $disk, $destination_path);
     }
     public function uploadMultipleFilesToDisk($value, $attribute_name, $disk, $destination_path)
     {
       
         if (! is_array($this->{$attribute_name})) {
             $attribute_value = json_decode($this->{$attribute_name}, true) ?? [];
         } else {
             $attribute_value = [];
              foreach($this->{$attribute_name} as $value){
                $attribute_value[] = $value['link']; 
              }
         }
        
         $files_to_clear = request()->get('clear_'.$attribute_name);
         
         // if a file has been marked for removal,
         // delete it from the disk and from the db
         if ($files_to_clear) {
             
             foreach ($files_to_clear as $key => $filename) {
                 \Storage::disk($disk)->delete($filename);
                 $attribute_value = Arr::where($attribute_value, function ($value, $key) use ($filename) {
                     return $value != $filename;
                 });
             }
             
         }
      
         // if a new file is uploaded, store it on disk and its filename in the database //  [{sst: 1, link:xxx},{sst: 2, link:yyy}]
         if (request()->hasFile($attribute_name)) {
           
             foreach (request()->file($attribute_name) as $key=>$file) {
                 if ($file->isValid()) {
                     // 1. Generate a new file name
                     $new_file_name = md5($file->getClientOriginalName().random_int(1, 9999).time()).'.'.$file->getClientOriginalExtension();
 
                     // 2. Move the new file to the correct path
                     $file_path = $file->storeAs($destination_path, $new_file_name, $disk);
                    
                     // 3. Add the public path to the database
                    // $value = (object) [
                    //     'stt' => $key+1,
                    //     'link' => Str::replaceFirst('public/', '', $file_path),
                    //   ];
                    // $attribute_value[] = $value;
                      $attribute_value[] =  Str::replaceFirst('public/', '', $file_path);
                 }
             }
         }
         $i = 0;
         $arrTem = [];
         foreach ($attribute_value as $key => $value) {
               $value1 = (object) [
                        'id' => $i+1,
                        'link' => Str::replaceFirst('public/', '', $value),
                      ];
                      $arrTem[] = $value1;
                      $i++;
         }
         $attribute_value = $arrTem;
        // dd($attribute_value);
         $this->attributes[$attribute_name] = json_encode($attribute_value);
     }
    
}

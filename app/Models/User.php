<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Str;
use Intervention\Image\ImageManagerStatic as Image;
use App\Models\Level;
use App\Models\AccountType;
use Illuminate\Database\Eloquent\SoftDeletes;
class User extends Authenticatable
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasRoles;
    use HasApiTokens, HasFactory, Notifiable;
    use SoftDeletes;
    protected $guard_name = 'backpack';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'address_id',
        'password',
        'display_name',
        'phone',
        'last_login',
        'status',
        'expired_in',
        
        'image',
        'level_id',
        'gender', 
        'full_name',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public static function boot()
    {
        parent::boot();
        static::deleting(function($obj) {
            \Storage::disk('root')->delete($obj->image);
        });
    }
   public function parent(){
    return $this->hasMany('App\Models\User', 'id');
   }
   public function enrollmentOfChildren(){
    return $this->hasManyThrough(
        'App\Models\Enrollment',
        'App\Models\ParentStudent',
        'parent_id',
        'user_id',
        'id',
        'student_id',
    );
   }
    public function accountType(){
        return $this->belongsTo(AccountType::class );
    }
    public function address()
    {
        return $this->belongsTo(Address::class);
    }
    public function enrollment(){
        return $this->hasMany('App\Models\Enrollment', 'user_id');
    }
 
    public function setImageAttribute($value)
    {
        $attribute_name = "image";
      
        // or use your own disk, defined in config/filesystems.php
        $disk = config('backpack.base.root_disk_name'); 
        // destination path relative to the disk above
        $destination_path = "public/storage/profile_images"; 

        // if the image was erased
        if ($value==null) {
            // delete the image from disk
            \Storage::disk($disk)->delete($this->{$attribute_name});

            // set null in the database column
            $this->attributes[$attribute_name] = null;
        }

        // if a base64 was sent, store it in the db
       
        if (Str::startsWith($value, 'data:image'))
        {
            
            // 0. Make the image
            $image = \Image::make($value)->encode('jpg', 90);

            // 1. Generate a filename.
            $filename = md5($value.time()).'.jpg';

            // 2. Store the image on disk.
            \Storage::disk($disk)->put($destination_path.'/'.$filename, $image->stream());

            // 3. Delete the previous image, if there was one.
            \Storage::disk($disk)->delete($this->{$attribute_name});

            // 4. Save the public path to the database
            // but first, remove "public/" from the path, since we're pointing to it 
            // from the root folder; that way, what gets saved in the db
            // is the public URL (everything that comes after the domain name)
            $public_destination_path = Str::replaceFirst('public/', '', $destination_path);
            $this->attributes[$attribute_name] = $public_destination_path.'/'.$filename;
        }
    }

}

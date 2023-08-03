<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class Menu extends BaseModel
{
    use HasFactory, HasRoles;

    protected $connection = 'centralizado';

    protected $fillable = ['title','parent_id','type','target','icon','uri','method','status'];

    public function children(){
        return $this->hasMany(Menu::class,'parent_id');
    }

    public function parent(){
        return $this->belongsTo(Menu::class,'parent_id');
    }


}

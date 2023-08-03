<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class PersonaCentralizado extends Model
{ 

    protected $connection = 'centralizado';
    protected $table ="personas";


    // protected $fillable = [
    //     'persona_id', 'rol_id', 'entidad_id', 'usuario', 'email', 'password', 'estado', 'observaciones'
    // ];

    // public function personaCentralizada() {
    //     return $this->hasMany(PersonaCentralizada::class, 'id_persona','id');
    // }

    public function user()
    {   
        return $this->belongsTo(User::class, 'id','id_persona');
        // return $this->belongsTo('App\User');
    }
}
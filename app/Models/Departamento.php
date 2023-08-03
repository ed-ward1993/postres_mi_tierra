<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    protected $table = 'postres';
    protected $fillable = [
        'idpais',
        'nombre',
        'condicion'
    ];
}

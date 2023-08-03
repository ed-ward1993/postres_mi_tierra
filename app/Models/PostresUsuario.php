<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostresUsuario extends Model
{
    use HasFactory;
    protected $table ="postres_usuario";
    protected $connection = "centralizado";
}

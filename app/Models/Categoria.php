<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $table = 'categorias';

    protected $fillable = [
        'nombre', 'descripcion', 'estado'
    ];

    // Relación con productos
    public function productos()
    {
        return $this->hasMany(Producto::class, 'id_categoria', 'id_categorias');
    }
}

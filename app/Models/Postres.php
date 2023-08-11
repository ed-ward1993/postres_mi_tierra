<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Postres extends Model
{
    protected $table = 'postres';

    protected $fillable = [
        'nombre', 'id_categoria', 'codigo_barras', 'precio', 'cantidad_stock', 'estado'
    ];

    // Relación con categoría
    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'id_categoria', 'id_categorias');
    }
}

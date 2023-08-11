<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compras_postres extends Model
{
    protected $table = 'compras_postres';

    protected $fillable = [
        'id_compra', 'id_postre', 'cantidad', 'total', 'estado'
    ];

    // Relación con compra
    public function compra()
    {
        return $this->belongsTo(Compra::class, 'id_compra', 'id_compra');
    }

    // Relación con producto
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'id_postre', 'id_postre');
    }
}

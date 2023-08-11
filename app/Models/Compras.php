<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compras extends Model
{
    protected $connection = 'dinamico';

    protected $table = 'compras';

    protected $fillable = [
        'id_usuario', 'fecha', 'medio_pago', 'comentario', 'estado'
    ];

    // Relación con productos de la compra
    public function productos()
    {
        return $this->hasMany(CompraProducto::class, 'id_compra', 'id_compra');
    }
}

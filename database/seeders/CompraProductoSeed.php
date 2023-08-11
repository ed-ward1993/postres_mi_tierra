<?php

namespace Database\Seeders;

use App\Models\Compras_postres;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompraProductoSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Compras_postres::create([
            'id_compra' => 1,
            'id_producto' => 1,
            'cantidad' => 3,
            'total' => 10500,
            'estado' => true,
        ]);

        Compras_postres::create([
            'id_compra' => 2,
            'id_producto' => 2,
            'cantidad' => 2,
            'total' => 7000,
            'estado' => true,
        ]);

        Compras_postres::create([
            'id_compra' => 3,
            'id_producto' => 3,
            'cantidad' => 3,
            'total' => 10500,
            'estado' => true,
        ]);

        Compras_postres::create([
            'id_compra' => 4,
            'id_producto' => 4,
            'cantidad' => 1,
            'total' => 3500,
            'estado' => true,
        ]);

        Compras_postres::create([
            'id_compra' => 5,
            'id_producto' => 5,
            'cantidad' => 1,
            'total' => 3500,
            'estado' => true,
        ]);
    }
}

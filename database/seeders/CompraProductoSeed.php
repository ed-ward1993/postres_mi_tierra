<?php

namespace Database\Seeders;

use App\Models\Compras_postres;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class CompraProductoSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::connection('dinamico')->table('compras_postres')->insert(
            [
                [
                    'id_compra' => 1,
                    'id_postres' => 1,
                    'cantidad' => 3,
                    'total' => 10500,
                    'estado' => true,
                ],
                [
                    'id_compra' => 2,
                    'id_postres' => 2,
                    'cantidad' => 2,
                    'total' => 7000,
                    'estado' => true,
                ],
                [
                    'id_compra' => 3,
                    'id_postres' => 3,
                    'cantidad' => 3,
                    'total' => 10500,
                    'estado' => true,
                ],
                [
                    'id_compra' => 4,
                    'id_postres' => 4,
                    'cantidad' => 1,
                    'total' => 3500,
                    'estado' => true,
                ],
                [
                    'id_compra' => 5,
                    'id_postres' => 5,
                    'cantidad' => 1,
                    'total' => 3500,
                    'estado' => true,
                ]
            ]
        );
    }
}

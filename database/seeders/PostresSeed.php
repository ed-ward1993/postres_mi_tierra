<?php

namespace Database\Seeders;

use App\Models\Postres;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class PostresSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::connection('dinamico')->table('postres')->insert(
            [
                [
                    'nombre' => 'Frutos Rojos',
                    'id_categoria' => 1,
                    'codigo_barras' => '123456789',
                    'precio' => 3500,
                    'cantidad_stock' => 20,
                    'estado' => true,
                ],
                [
                    'nombre' => 'Limon',
                    'id_categoria' => 1,
                    'codigo_barras' => '987654321',
                    'precio' => 3500,
                    'cantidad_stock' => 50,
                    'estado' => true,
                ],
                [
                    'nombre' => 'Nucita',
                    'id_categoria' => 1,
                    'codigo_barras' => '654321987',
                    'precio' => 3500,
                    'cantidad_stock' => 30,
                    'estado' => true,
                ],
                [
                    'nombre' => 'Maracuya',
                    'id_categoria' => 1,
                    'codigo_barras' => '135792468',
                    'precio' => 3500,
                    'cantidad_stock' => 10,
                    'estado' => true,
                ],
                [
                    'nombre' => 'mora',
                    'id_categoria' => 2,
                    'codigo_barras' => '864209753',
                    'precio' => 2500,
                    'cantidad_stock' => 5,
                    'estado' => true,
                ]
            ]
        );
    }
}

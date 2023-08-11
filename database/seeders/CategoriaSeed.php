<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categoria;
use Illuminate\Support\Facades\DB;


class CategoriaSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::connection('dinamico')->table('categorias')->insert(
            [
                [
                    'id_categorias' => '1',
                    'nombre' => '12 Onzas',
                    'descripcion' => 'Deliciosas Frutos Rojos ',
                    'estado' => true,
                ],
                [
                    'id_categorias' => '2',
                    'nombre' => '16 Onzas',
                    'descripcion' => 'Deliciosas Maracuya ',
                    'estado' => true,
                ],
                [
                    'id_categorias' => '3',
                    'nombre' => 'Refractarea pequeña',
                    'descripcion' => 'Deliciosas Limon ',
                    'estado' => true,
                ],
                [
                    'id_categorias' => '4',
                    'nombre' => 'Refractera mediana',
                    'descripcion' => 'Deliciosas Nucita ',
                    'estado' => true,
                ],
                [
                    'id_categorias' => '5',
                    'nombre' => 'Refracterea Grande',
                    'descripcion' => 'Deliciosas limon ',
                    'estado' => true,
                ]
            ]
        );
    }
}

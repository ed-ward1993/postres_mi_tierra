<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categoria;

class CategoriaSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Categoria::create([
            'nombre' => '12 Onzas',
            'descripcion' => 'Deliciosas Frutos Rojos ',
            'estado' => true,
        ]);

        Categoria::create([
            'nombre' => '16 Onzas',
            'descripcion' => 'Deliciosas Maracuya ',
            'estado' => true,
        ]);

        Categoria::create([
            'nombre' => 'Refractarea pequeña',
            'descripcion' => 'Deliciosas Limon ',
            'estado' => true,
        ]);

        Categoria::create([
            'nombre' => 'Refractera mediana',
            'descripcion' => 'Deliciosas Nucita ',
            'estado' => true,
        ]);

        Categoria::create([
            'nombre' => 'Refracterea Grande',
            'descripcion' => 'Deliciosas limon ',
            'estado' => true,
        ]);
    }
}
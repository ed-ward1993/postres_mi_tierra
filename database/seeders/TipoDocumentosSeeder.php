<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoDocumentosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::connection('centralizado')->table('tipos_documentos')->insert(
        	[
	        	[
	        		'id'     => 1,
	        		'nombre' => 'Cedula de Ciudadania',
	        		'estado' => 1
                ],
                [
	        		'id'     => 2,
	        		'nombre' => 'Tarjeta De Identidad',
	        		'estado' => 1
	        	],
                [
	        		'id'     => 3,
	        		'nombre' => 'Cedula de Extranjeria',
	        		'estado' => 1
	        	]
        	]
        );
    }
}

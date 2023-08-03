<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Helpers\Equivalencias;

class PostresCentralizadoSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::connection('centralizado')->table('postres')->insert([
        	[
	        	'id'		     => '1',
	        	'nombre' 	     => 'Postres de mi tierra',
	        	'nombre_db'      => 'dinamico',
	        	'url_logo' 	     => 'images/postres.png',
	        	'nit' 	         => '11121212',
	        	'direccion' 	 => 'Cl. 38 #7-33, Ibagué, Tolima',
	        	'estado' 	     => '1'
	        ]
        ]);
    }
}

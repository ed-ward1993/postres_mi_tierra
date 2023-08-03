<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(PermisosSeed::class);
        $this->call(PostresCentralizadoSeed::class);
        $this->call(TipoDocumentosSeeder::class);
        $this->call(UserSeed::class);
        $this->call(RolSeeder::class);
    }
}

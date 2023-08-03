<?php

namespace Database\Seeders;
use App\Models\Permission;

use Illuminate\Database\Seeder;

class PermisosSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Seed the default permissions
        foreach (Permission::permisosAdministrador() as $key => $permiso) {
            foreach($permiso as $perm){
                Permission::firstOrCreate(['name' => $perm,'id_componente' => $key,'guard_name' => 'web']);
            }
        }

        $this->command->info('Permisos agregados por defecto.');
    }
}

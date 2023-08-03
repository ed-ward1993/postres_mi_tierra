<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use app\RolePermission;
use Illuminate\Support\Facades\Session;

class Permission extends \Spatie\Permission\Models\Permission
{
    protected $fillable = ['name', 'guard_name','id_componente','updated_at','created_at'];

	protected $connection;
    protected $guard_name = "web";

	public function __construct(array $attributes = [])
    {
		parent::__construct($attributes);
        $this->connection = 'centralizado';
    }

    public function role_permissions()
    {
        return $this->hasOne(RolePermission::class, 'permission_id', 'permission.id');
    }


    public static function permisosAdministrador()
    {
    	return [

			'1' => [
					'view_administracion',
					'add_administracion',
					'edit_administracion',
					'delete_administracion',
			],
			'2' => [
					'view_agregar_departamento',
					'add_agregar_departamento',
					'edit_agregar_departamento',
					'delete_agregar_departamento',
			],
			'3' => [
					'view_parametrizar_rutas_vue',
					'add_parametrizar_rutas_vue',
					'edit_parametrizar_rutas_vue',
					'delete_parametrizar_rutas_vue',
			
			],
			'4' => [
					'view_parametrizar_menus',
					'add_parametrizar_menus',
					'edit_parametrizar_menus',
					'delete_parametrizar_menus',
			],
			'5' => [
					'view_roles',
					'add_roles',
					'edit_roles',
					'delete_roles',
			
			],
			'6' => [
					'view_permisos',
					'add_permisos',
					'edit_permisos',
					'delete_permisos',
			],
			'7' => [
					'view_usuarios',
					'add_usuarios',
					'edit_usuarios',
					'delete_usuarios',
			],
			'8' => [
				'view_parametros',
				'add_parametros',
				'edit_parametros',
				'delete_parametros',
			],
			'9' => [
				'view_TipoDocumento',
				'add_TipoDocumento',
				'edit_TipoDocumento',
				'delete_TipoDocumento',
			]
    	];
    }
}

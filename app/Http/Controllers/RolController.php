<?php

namespace App\Http\Controllers;

// use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Models\RolePermission;
use App\Models\Rol;
use DB;

class RolController extends Controller
{
    function __construct()
    {
        // $this->middleware('permission:view_roles')->only('index');
        // $this->middleware('permission:add_roles')->only('store');
        // $this->middleware('permission:edit_roles')->only('update');
        // $this->middleware('permission:delete_roles')->only(['inactivar','activar']);
    }

    public function index(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $buscar = $request->buscar;
        $criterio = $request->criterio;
        
        if ($buscar==''){
            $roles = Rol::orderBy('id', 'desc')->paginate(10);
        }else{
            $roles = Rol::where($criterio, 'like', '%'. $buscar . '%')->orderBy('id', 'desc')->paginate(10);
        }
        return [
            'pagination' => [
                'total'        => $roles->total(),
                'current_page' => $roles->currentPage(),
                'per_page'     => $roles->perPage(),
                'last_page'    => $roles->lastPage(),
                'from'         => $roles->firstItem(),
                'to'           => $roles->lastItem(),
            ],
            'roles' => $roles
        ];
    }

    public function store(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

            $rol = new Rol();
            $rol->name = $request->nombre;
            $rol->guard_name = 'web';
            $rol->description = $request->descripcion;
            $rol->save();

    }

    public function update(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

            $rol = Rol::findOrFail($request->id);
            $rol->name = $request->nombre;
            $rol->descripcion = $request->descripcion;
            $rol->status = 1;
            $rol->save();
    }

    public function inactivar(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

            $rol = Rol::findOrFail($request->id);
            $rol->status = 0;
            $rol->save();

    }

    public function activar(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

            $rol = Rol::findOrFail($request->id);
            $rol->status = 1;
            $rol->save();

    }

    public function obtenerRolPermisos(Request $request)
    {
        $name = $_GET['name'];
        $roles = Rol::findByName($name)->permissions;

        return ['roles_permission' => $roles];
    }

    public function updatePermisos(Request $request)
    {
        $role = Rol::where('id', $request->role)->first();

        //limpiamos los permisos existentes para este rol
        $limpiar = RolePermission::where('role_id', $request->role)->delete();

        //asignamos nuevos permisos
        $role->syncPermissions($request->permissions);

        return response()->json(['status' => 'success', 'message' => 'Se han asignados los permisos correctamente']);
    }

    public function getRoles()
    {
        \Config::set('database.default','centralizado');
        DB::purge('centralizado');        
        DB::reconnect('centralizado'); 

        $roles = DB::table('roles')->get();

       /* $roles = Rol::orderBy('id', 'desc')
        ->get();*/

        return ['roles' => $roles];
    }
}

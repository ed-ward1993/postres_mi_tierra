<?php

namespace App\Http\Controllers;

// use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\RolePermission;
use App\Models\Rol;
use App\Models\Permission;
use App\Models\TipoExamen;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\DB as FacadesDB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class RolController extends Controller
{
    function __construct()
    {

            $this->middleware('permission:view_roles')->only('index');
            $this->middleware('permission:add_roles')->only('store');
            $this->middleware('permission:edit_roles')->only('update');
            $this->middleware('permission:delete_roles')->only(['inactivar','activar']);

    }

    public function getRoles()
    {
        $roles = Rol::orderBy('id', 'asc')->get();
        return response()->json($roles);
    //     \Config::set('database.default','centralizado');
    //     DB::purge('centralizado');
    //     DB::reconnect('centralizado');

    //     $roles = DB::table('roles')->get();

    //    /* $roles = Rol::orderBy('id', 'desc')
    //     ->get();*/

    //     return ['roles' => $roles];
    }

    public function index()
    {
        $roles = Rol::orderBy('id', 'asc')
                    ->where(function($query){
                        if(request()->input('queryRoles')){
                            $searchValue = strtolower(request()->input('queryRoles'));
                            $query->whereRaw('LOWER(roles.name) LIKE ?', ["%{$searchValue}%"]);
                        }
                    });
                    $nombre_menu = Permission::select('nombre_menu')->distinct()->get();
        $permisos_menu = Permission::orderBy('id', 'asc')->get();

        return Inertia::render('Roles/Index', [
            'queryRoles' => request()->input('queryRoles'),
            'roles'  => $roles->paginate(10),
            'permisos' => $permisos_menu,
            'nombre_menu' => $nombre_menu
       ]);
    }

    public function store(Request $request)
    {
        $rol = new Rol();
        $rol->name = $request->nombre;
        $rol->guard_name = 'web';
        $rol->description = $request->description;
        $rol->save();
        // dd($rol);

        return $rol;

    }

    public function update(Request $request)
    {
        $rol = Rol::find($request->id);
        $rol->name = $request->nombre;
        $rol->description = $request->description;
        $rol->save();
        return $rol;
    }

    public function inactivar(Request $request)
    {
            $rol = Rol::findOrFail($request->id);
            $rol->status = 0;
            $rol->save();
    }

    public function activar(Request $request)
    {
            $rol = Rol::findOrFail($request->id);
            $rol->status = 1;
            $rol->save();
    }

     public function asignarPermisos(Request $request)
    {
        // dd($request);
        $rol = Rol::where('id', $request->id)->first();


        //limpiamos los permisos existentes para este rol
        // $limpiar = RolePermission::where('role_id', $rol)->delete();

        //asignamos nuevos permisos
        $rol->syncPermissions($request->permisos);

        // return response()->json(['status' => 'success', 'message' => 'Se han asignados los permisos correctamente']);
    }

    public function obtenerRolPermisos(Request $request)
    {
        $id_rol = $request->id_rol;
        $permisos = RolePermission::join('permissions','permissions.id','=','role_has_permissions.permission_id')
        ->join('roles','roles.id','=','role_has_permissions.role_id')
        ->where('role_has_permissions.role_id', '=', $id_rol)
        ->get();

        return ['permisos' => $permisos];
    }
}


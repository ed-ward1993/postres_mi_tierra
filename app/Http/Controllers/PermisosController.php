<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Permission;
use App\Models\MenuOld;
use DB;

class PermisosController extends Controller
{
    function __construct()
    {
        // $this->middleware('permission:view_permisos')->only('index');
        // $this->middleware('permission:add_permisos')->only('store');
        // $this->middleware('permission:edit_permisos')->only('update');
        // $this->middleware('permission:delete_permisos')->only('cambiarEstado');
    }

    public function index(Request $request)
    {

        if (!$request->ajax()) return redirect('/');

        $buscar = $request->buscar;
        $criterio = $request->criterio;

        if ($buscar=='')
        {
            $permission = Permission::join('menus','menus.id','=','permissions.id_componente')
                                    ->select('permissions.id as id','permissions.name','permissions.status as status','permissions.created_at as created_at','menus.id as id_menu','menus.name as nombre_menu')
                                    ->where('permissions.status','1')
                                    ->orderBy('id', 'desc')
                                    ->paginate(10);

        }
        else
        {
            $permission = Permission::join('menus','menus.id','=','permissions.id_componente')
                                    ->select('permissions.id as id','permissions.name','permissions.status as status','permissions.created_at as created_at','menus.id as id_menu','menus.name as nombre_menu')
                                    ->where('permissions.status','1')
                                    ->where('permissions.'.$criterio, 'like', '%'. $buscar . '%')
                                    ->orderBy('id', 'desc')
                                    ->paginate(10);

        }

        return [
            'pagination' => [
                'total'        => $permission->total(),
                'current_page' => $permission->currentPage(),
                'per_page'     => $permission->perPage(),
                'last_page'    => $permission->lastPage(),
                'from'         => $permission->firstItem(),
                'to'           => $permission->lastItem(),
            ],
            'permission' => $permission
        ];
    }

    public function store(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $permission = Permission::where('name', 'LIKE', '%'. $request->name)->pluck('id')->first();

        if($permission == null and $request->id_componente != 0)
        {
            $menu = MenuOld::where('id',$request->id_componente)->first();

            if(is_object($menu)){
                $var = Permission::firstOrCreate(['name' => $request->name, 'guard_name' => 'web','id_componente' => $request->id_componente]);

                $menssage = 'El permiso ' .' '.$var->name.' '. 'fue creado con exito';
                return response()->json(['status' => 'success', 'message' => $menssage]);

            }else{
                return response()->json(['status' => 'error', 'message' => 'Error asociarlo con el item del menu']);

            }
        }
        else
        {
        	return response()->json(['status' => 'error', 'message' => 'Este nombre permiso ya existe']);
        }
    }

    private function generatePermissions($attr)
    {
        $abilities = ['view', 'add', 'edit', 'delete'];
        $name = $attr;

        return array_map(function($val) use ($name) {
            return $val . '_'. $name;
        }, $abilities);
    }

    public function update(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        try
        {
            DB::beginTransaction();

            $permiso = Permission::where('id', $request->id)->first();
            $permiso->name = $request->name;
            $permiso->id_componente = $request->id_componente;
            $permiso->save();

            DB::commit();

        	return response()->json(['status' => 'success', 'message' => 'Permiso actualizado correctamente']);

        }
        catch (Exception $e)
        {
            DB::rollBack();

        	return response()->json(['status' => 'error', 'message' => 'Ocurrió un error']);

        }
    }

    public function cambiarEstado(Request $request)
    {
    	if (!$request->ajax()) return redirect('/');

        try
        {
            DB::beginTransaction();

            $pedido = Permission::where('id', $request->id)->first();
            $pedido->status = $request->estado;
            $pedido->save();

            DB::commit();

            echo json_encode('ok');

        }
        catch (Exception $e)
        {
            DB::rollBack();
            echo json_encode('no');

        }
    }

    public function obtenerPermisos()
    {

        $permisos_menu = Permission::join('menus','menus.id','=','permissions.id_componente')
                            ->select('permissions.id_componente','permissions.id as id_permiso','permissions.name','menus.id as id_menu','menus.name as nombre_menu','menus.ruta as ruta')
                            ->where('permissions.status','1')
                            ->where('menus.status','1')
                            ->groupBy('permissions.id_componente','permissions.id','permissions.name','menus.id','menus.name','menus.ruta')
                            ->get();
        $permisos = [];
        foreach($permisos_menu as $menu => $key){

            if($key->id_menu == $key->id_menu){
                if(!isset($permisos[$key->id_menu]['nombre'])){
                    $permisos[$key->id_menu] = ['nombre' => $key->nombre_menu,'ruta' => $key->ruta];
                }
                $permisos[$key->id_menu]['permisos'][]= ['name_permiso' => $key->name,'id_permiso' => $key->id_permiso];
            }
        }

    	return response()->json(['permisos' => $permisos]);
    }
}

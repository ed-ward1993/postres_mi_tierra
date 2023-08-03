<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Permission;
use App\Models\MenuOld;
use App\Models\Rol;
use App\Models\RutasVue;
use App\Helpers\Equivalencias;
use DB;
use Illuminate\Support\Facades\Auth;

class ParametrizarMenusController extends Controller
{
    function __construct()
    {
        // $this->middleware('permission:view_parametrizarMenus')->only('index');
        // $this->middleware('permission:add_parametrizarMenus')->only('store');
        // $this->middleware('permission:edit_parametrizarMenus')->only('update');
        // $this->middleware('permission:edit_parametrizarMenus')->only('update');
    }

    public function index(Request $request)
    {

    	if (!$request->ajax()) return redirect('/');

        $buscar   = $request->buscar;
        $criterio = $request->criterio;

        $menu = MenuOld::leftJoin('rutas_vue as tc','tc.id','menus.component')
                    ->leftjoin('menus as padre', 'padre.id', 'menus.menu_id')
                    ->select('menus.*', 'tc.name as component','padre.name as padre', 'padre.ruta as rutaPadre','tc.id as id_ruta','tc.component as component2',
                            'tc.path','tc.estado as estado2',DB::raw("CONCAT(tc.name,' ( ',tc.path,' ) ') as dato_com"))
                    ->orderBy('menus.id', 'desc');

        if (!$buscar=='')
        {
            $menu->where('menus.'.$criterio, 'like', '%'. $buscar . '%');
        }

        return [
            'pagination' => [
                'total'        => $menu->paginate(10)->total(),
                'current_page' => $menu->paginate(10)->currentPage(),
                'per_page'     => $menu->paginate(10)->perPage(),
                'last_page'    => $menu->paginate(10)->lastPage(),
                'from'         => $menu->paginate(10)->firstItem(),
                'to'           => $menu->paginate(10)->lastItem(),
            ],
            'menu' => $menu->paginate(10)
        ];
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $response = [
            'status'  => 'success',
            'mensaje' => ''
        ];

        if($request->id_padre == '' ){
            if($request->ubicacion_menu == ''){
                return response()->json(['status' => 'error', 'message' => 'Falta la ubicacion del menú.']);
            }
        }

        $validacion1 = MenuOld::where('name',$request->name)->first();

        if(!is_object($validacion1))
        {
            $ruta = ($request->component['id'] != null) ? '/'.$request->component['name'] :'/'. $request->name;
            $consulta = ($request->component['id'] != null) ? $request->component['name'] : $request->name;
            $permission = Permission::where('name', 'LIKE', '%'. $consulta)->pluck('id')->first();

            $menu = new MenuOld();
            $menu->name       = mb_convert_case($request->name, MB_CASE_TITLE, "UTF-8");
            if($request->component != ''){
                $menu->component  = $request->component['id'];
            }
            $menu->icon       = $request->icon;
            $menu->menu_id    = $request->id_padre;
            $menu->ubicacion  = $request->ubicacion_menu;
            $menu->ruta       = $ruta;
            $menu->save();

            if($permission == null)
            {
                $ruta = $request->ruta_padre.$ruta;
                try{
                    DB::beginTransaction();

                    $permissionsCrear = $this->generatePermissions($request->component['name']);

                    $role = Rol::where('id', '1')->first();

                    foreach ($permissionsCrear as $permission) {
                            $permiso =  Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web','id_componente' => $menu->id]);
                            $role->givePermissionTo($permiso->id);
                    }


                    $response['mensaje'] = implode(', ', $permissionsCrear);

                    DB::commit();

                } catch(Exception $e){
                    DB::rollBack();
                }

            }
            else
            {
                return response()->json(['status' => $response['status'], 'message' => 'Este nombre de componente o permiso ya existe']);
            }

        }else{
            return response()->json(['status' => 'error', 'message' => 'Este nombre de menu ya existe.']);
        }

    	return response()->json(['status' => $response['status'], 'message' =>  $response['mensaje']]);
    }

    public function update(Request $request)
    {
        $respuesta = [
                        'exito' => false,
                        'errores' => ''
                    ];
        $ruta = ($request->componente['id'] != null) ? '/'.$request->componente['name'] :'/'. $request->name;
        $menuActual = MenuOld::where('id',$request->id)->first();

        if($menuActual->menu_id > 0){ // ES UN HIJO
            $tieneHijos = MenuOld::where('menu_id',$request->id)->exists(); // verifica si el hijo tiene hijos
            if($tieneHijos){  // hijo con hijos puede cambiar nombre,
                DB::beginTransaction();
                    $cambio = MenuOld::where('id', $request->id)
                    ->update([
                        'name'           => ucwords($request->nombre),
                        'status'         => 1,
                    ]);
                    $respuesta['exito'] = true;
                DB::commit();
            }
            else{           // hijo sin hijos puede cambiar padre, nombre, ruta
                if($request->menu_padre['id'] > 0){ // va a cambiar de padre
                    DB::beginTransaction();
                        $cambio = MenuOld::where('id', $request->id)
                        ->update([
                            'name'           => ucwords($request->nombre),
                            'ruta'           => $request->menu_padre['ruta'].$ruta,
                            'component'      => $request->componente['id'],
                            'status'         => 1,
                            'menu_id'        => $request->menu_padre['id'],
                        ]);
                        $respuesta['exito'] = true;
                    DB::commit();
                }
                else{ // va a ser raiz
                    DB::beginTransaction();
                        $cambio = MenuOld::where('id', $request->id)
                        ->update([
                            'name'           => ucwords($request->nombre),
                            'component'      => $request->componente['id'],
                            'ruta'           => $ruta,
                            'icon'           => $request->icono,
                            'status'         => 1,
                            'menu_id'        => null,
                            'ubicacion'      => $request->ubicacion,
                        ]);
                        $respuesta['exito'] = true;
                    DB::commit();
                }
            }
        }
        else{ // ES UNA RAIZ
            $tieneHijos = MenuOld::where('menu_id',$request->id)->exists(); // verifica si la raiz tiene hijos
            if($tieneHijos){    // raiz con hijos solo puede cambiar nombre, icono
                DB::beginTransaction();
                    $cambio = MenuOld::where('id', $request->id)
                    ->update([
                        'name'           => ucwords($request->nombre),
                        'icon'           => $request->icono,
                        'status'         => 1,
                    ]);
                    $respuesta['exito'] = true;
                DB::commit();
            }
            else{               // raiz sin hijos puede cambiar padre, posicion, nombre, icono, ruta
                if($menuActual->menu_id == $request->menu_padre['id']){
                    DB::beginTransaction();
                        $cambio = MenuOld::where('id', $request->id)
                        ->update([
                            'name'           => ucwords($request->nombre),
                            'icon'           => $request->icono,
                            'status'         => 1,
                            'ubicacion'      => $request->ubicacion,
                            'component'      => $request->componente['id'],
                        ]);
                        $respuesta['exito'] = true;
                    DB::commit();

                }else{
                    DB::beginTransaction();
                        $menu = MenuOld::where('id', $request->id)
                        ->update([
                            'name'           => ucwords($request->nombre),
                            'component'      => $request->componente['id'],
                            'ruta'           => $request->menu_padre['ruta'].$ruta,
                            'icon'           => null,
                            'status'         => 1,
                            'menu_id'        => $request->menu_padre['id'],
                            'ubicacion'      => null,
                        ]);
                        $respuesta['exito'] = true;
                    DB::commit();

                }

            }
        }
    	return $respuesta;
    }

    public function cambiarEstado(Request $request)
    {
    	if (!$request->ajax()) return redirect('/');

        try
        {
            DB::beginTransaction();

            $pedido = MenuOld::where('id', $request->id)->first();
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

    public function consultarMenuPadre()
    {
        $menuPadre = MenuOld::where('status',1)->get();

        return ['menus' => $menuPadre];
    }

    public function consultarPermisosPadre()
    {
        if(Session('conexion') == 'centralizado')
        {
            $permisosPadre = [];
        }else{
            $permisosPadre = Permission::where('name', 'LIKE', 'view_' . '%')
                            ->where('status', '1')
                            ->select('name', 'id')
                            ->get()
                            ->toArray();
        }

        echo json_encode($permisosPadre);
    }

    private function generatePermissions($attr)
    {
        $abilities = ['view', 'add', 'edit', 'delete'];
        $name = $attr;

        return array_map(function($val) use ($name) {
            return $val . '_'. $name;
        }, $abilities);
    }

    public function getMenus(Request $request){
        $data = MenuOld::leftJoin('rutas_vue as tc','tc.id','menus.component')
                    ->where('status','1')
                    ->where('tc.name','!=','')
                    ->get();

        return ['data' => $data];
    }

    public function verificaUltimoHijo(Request $request){
        $menu = MenuOld::where('menu_id',$request->id)->doesntExist();
        return ['respuesta' => $menu];
    }

    public function getRutaRelativa(Request $request){
        $ruta = '';

        $sqlRuta =  MenuOld::join('rutas_vue as tc','tc.id','menus.component')
                        ->select('ruta')->where('tc.name','like',$request->ruta)->first();

        if($sqlRuta != null){
            $rta = explode("/", $sqlRuta->ruta);
            $nombreRuta = '';
            $ruta = [];
            for ($i=0; $i < count($rta) ; $i++) {
                if($i != 0){
                    $nombreRuta .= '/'.$rta[$i];

                    $nRuta = MenuOld::select('name')->where('ruta','like',$nombreRuta)->first();

                    $ruta[] = [
                                'nombre'     =>($nRuta != null) ? $nRuta->name : '',
                                'componente' =>$rta[$i]
                            ];
                }
            }
        }
        return $ruta;
    }

    public function getRutasVue(Request $request){

        if(Session('conexion') == 'centralizado')
        {
            $arrayRuta = MenuOld::join('rutas_vue','rutas_vue.id','menus.component')
                        ->where('estado','1')
                        ->select('rutas_vue.*', DB::raw("CONCAT(rutas_vue.name,' ( ',rutas_vue.path,' ) ') as dato_com"))
                        ->get();
        }else{
            $rutas = MenuOld::join('rutas_vue as tc','tc.id','menus.component')
                            ->join('permissions', 'permissions.id_componente', 'menus.id')
                            ->select('tc.*', DB::raw("CONCAT(tc.name,' ( ',tc.path,' ) ') as dato_com"),'permissions.name as permiso', 'menus.menu_id')
                            ->where('permissions.name', 'LIKE','view_'.'%' )
                            ->where('menus.status', 1)
                            ->get();

            foreach($rutas as $ruta){
                if(Auth::user()->can($ruta['permiso']))
                {
                    $arrayRuta[] = [
                        'id'        => $ruta->id,
                        'name'      => $ruta->name,
                        'path'      => $ruta->path,
                        'component' => $ruta->component,
                        'dato_com'  => $ruta->dato_com
                    ];
                }
            }
        }

        return $arrayRuta;
    }

    public function getRutasVueMenu(Request $request){

        $rutas = RutasVue::where('estado', 1)
                        ->select('rutas_vue.*', DB::raw("CONCAT(rutas_vue.name,' ( ',rutas_vue.path,' ) ') as dato_com"))
                        ->get();

        return $rutas;
    }
}

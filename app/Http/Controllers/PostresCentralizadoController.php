<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PostresCentralizado;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\PostresUsuario;

class PostresCentralizadoController extends Controller
{
    public function index(Request $request)
    {

    	if (!$request->ajax()) return redirect('/');

        $buscar   = $request->buscar;
        $criterio = $request->criterio;

        $postres = PostresCentralizado::orderBy('id', 'desc')
                                        ->select('postres.*');

        if (!$buscar=='')
        {
            $postres->where('menus.'.$criterio, 'like', '%'. $buscar . '%');
        }

        return [
            'pagination' => [
                'total'        => $postres->paginate(10)->total(),
                'current_page' => $postres->paginate(10)->currentPage(),
                'per_page'     => $postres->paginate(10)->perPage(),
                'last_page'    => $postres->paginate(10)->lastPage(),
                'from'         => $postres->paginate(10)->firstItem(),
                'to'           => $postres->paginate(10)->lastItem(),
            ],
            'postres' => $postres->paginate(10)
        ];
    }

    public function store(Request $request)
    {
        $response = [
            'status'  => true,
            'mensaje' => ''
        ];


        if($request->nombre != '' and $request->nombre_db != '')
        {
            try{
                DB::beginTransaction();

                $image = $request->file('imagen');

                $depto = new PostresCentralizado();
                $depto->nombre = $request->nombre;
                $depto->nombre_db = $request->nombre_db;
                $depto->url_produccion = $request->url_produccion;
                $depto->nit         = $request->nit;
                $depto->direccion   = $request->direccion;

                if($request->hasFile('imagen'))
                {
                    $filename = time() . '.' . $image->getClientOriginalExtension();
                    request()->imagen->move(public_path('/images/clinicas/'), $filename);
                    $depto->url_logo = 'images/clinicas/'. $filename;
                }
                $depto->save();

                $administradores = User::where('super_administrador','=','1')->get();
                foreach($administradores as $admin){
                    $newUserDepto = new PostresUsuario();
                    $newUserDepto->id_postres = $depto->id;
                    $newUserDepto->id_usuario      = $admin->id;
                    $newUserDepto->save();
                }

                DB::commit();
            }catch(\Exception $e){
                DB::rollBack();
            }

        }else{
            $response['mensaje'] = 'Faltan campos por completar.';
            $response['status']  = false;
        }

        return response()->json($response);
    }

    public function cambiarEstado(Request $request)
    {
    	if (!$request->ajax()) return redirect('/');

        try
        {
            DB::beginTransaction();

            $pedido = PostresCentralizado::where('id', $request->id)->first();
            $pedido->estado = $request->estado;
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

    public function update(Request $request)
    {

        $depto = PostresCentralizado::where('id', $request->id)->first();
        $depto->nombre = $request->nombre;
        $depto->nombre_db = $request->nombre_db;
        $depto->url_produccion = $request->url_produccion;
        $image = $request->file('imagen');

        if($request->hasFile('imagen'))
        {
            $filename = time() . '.' . $image->getClientOriginalExtension();
            request()->imagen->move(public_path('/images/clinicas/'), $filename);
            $depto->url_logo = 'images/clinicas/'. $filename;
        }
        $depto->save();

    	return response()->json(['status' => true]);
    }

    public function getpostres(Request $request){
        $deptos = PostresCentralizado::where('estado','1')->get();
        return $deptos;
    }


}

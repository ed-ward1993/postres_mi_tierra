<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\PostresUsuario;
use App\Models\PostresCentralizado;
use App\Http\Middleware\ChangeDb;
use App\Helpers\Equivalencias;
use Illuminate\Support\Facades\Redirect;
use JWTAuth;
use JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class CentralizadoController extends Controller
{
    protected $rutaProduccion;

    public function __construct(){
        $this->middleware('auth');
        $this->rutaProduccion = Equivalencias::urlProduccion();
        $this->rutaDinamico = Equivalencias::urlDinamico();
    }

    public function index(){
        return Redirect::to($this->rutaProduccion.'centralizadoRedirect');
    }

    public function getDeptos($id){

        $deptos = PostresUsuario::join('postresConexion','postresConexion.id','=','postres_usuario.id_postres')
                  ->where('postres_usuario.id_usuario',$id)
                  ->where('postresConexion.estado','1')
                  ->select('postresConexion.id','postresConexion.url_logo','postresConexion.nombre')
                  ->orderBy('postresConexion.id','asc')
                  ->get();

        session(['postres' => json_decode($deptos)]);

        return json_decode($deptos);
    }

    public function change(Request $request,$userId,$conexion,$token){

        // dd($request,$userId,$conexion,$token);
        if(!$this->validateSesion($token,$userId))
        {
            Auth::logout();
            $request->session()->invalidate();
            return Redirect::to($this->rutaProduccion.'?token=true')->with('sin_permisos_token','Error en el token para Acceder!');
        }

        Auth::loginUsingId($userId, true);

        $depto = PostresCentralizado::where('id',$conexion)->first();

        $activeDepto = PostresUsuario::join('usuarios','usuarios.id','=','postres_usuario.id_usuario')
                                        ->where('postres_usuario.id_usuario',Auth::id())
                                        ->where('postres_usuario.id_postres',$depto->id)
                                        ->select('postres_usuario.estado')
                                        ->first();

        if($activeDepto->estado == '0'){
            $error = 'Usuario Inactivo en el Aplicativo <b>('.$depto->nombre.')</b>';
            return back()->with('activeDepto',$error);
        }

        session(['conexion'      => $conexion,
                 'nombre_db'     => $depto->nombre_db,
                 'data_depto'    => [
                                     'logo'   => $depto->url_logo,
                                     'nombre' => $depto->nombre
                                    ],
                 'url_produccion' => $this->rutaProduccion]);



        $data =  $this->getDeptos(Auth::id());

        return redirect("/main");

    }

    public function redirectAdmin(Request $request){
        session(['conexion'     => 'centralizado',
                 'nombre_db'    => '',
                 'nombre_largo' => 'Modúlo Administración']);

        return redirect("/main");
    }

    // public function loginRedirect($conexion){

        // $depto = PostresCentralizado::where('id',$conexion)->dd();
        // $userId = Auth::user()->id;
        // $token = session('token_user');

        // return Inertia::location($depto->url_produccion.'autologin/'.$userId.'/'.$conexion.'/'.$token, 302, [
        //     'Authorization' => "Bearer {$token}"
        // ]);

    //     return Inertia::render
    // }

    private function validateSesion($token,$userId)
    {
        $response = (object)[
            'status' => false
        ];

        $tokenParts = explode(".", $token);
        $tokenHeader = base64_decode($tokenParts[0]);
        $tokenPayload = base64_decode($tokenParts[1]);
        $jwtHeader = json_decode($tokenHeader);
        $jwtPayload = json_decode($tokenPayload);
        $data = $jwtPayload->myCustomObject;
        if($data->id != $userId)
        {
            return $response->status = false;
        }

        $user = User::where('id',$userId)->first();

        if(!is_object($user)){
            return $response->status = false;
        }

        return $response;
    }

    public function getViewCentralizado()
    {
        $payload = JWTFactory::sub(Auth::user()->id)
                            ->myCustomObject(Auth::user())
                            ->make();

        $token = JWTAuth::encode($payload);
        session(['token_user'=> $token]);

        $data =  $this->getDeptos(Auth::id());
        return Inertia::render('Inicio',['postres' => $data]);
    }
}

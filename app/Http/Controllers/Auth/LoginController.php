<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\LogUserLogin;
use App\Models\User;
use JWTAuth;
use JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Redirect;
use App\Helpers\Equivalencias;
use Inertia\Inertia;

class LoginController extends Controller
{

    protected $rutaProduccion;

    public function __construct(){
        $this->rutaProduccion = Equivalencias::urlProduccion();
    }

    public function showLoginForm(){

        return Inertia::render('Auth/Login');
    }

    public function showLoginFormRedirect(Request $request,$error){
        Auth::logout();
        $request->session()->invalidate();
        return redirect("/")->with('error_token',$error);
    }

    public function login(Request $request){

        $this->validateLogin($request);

        
        $credentials = $request->only('usuario', 'password');
        $user = User::where('usuario', $request->usuario)->first();
        // dd($user->all());
        if(isset($user)){
            if($user->intentos_login == 10)
            {
                return back()->with('error','Usuario bloqueado');
            }
        }else{
            return back()->with('error','El usuario No existe');
        }


        try {
            if (! $token = JWTAuth::attempt($credentials)) {

                $userIntent = $user->intentos_login + 1;
                User::where('usuario', $request->usuario)->update(['intentos_login' => $userIntent]);

                if($userIntent == 3)
                {
                    User::where('usuario', $request->usuario)->update(['estado' => 0]);
                    return back()->with('error','Usuario bloqueado');
                }

                return back()->with('error','Error de credenciales.');
                // return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return back()->with('error','No es posible crear el token.');
            // return response()->json(['error' => 'could_not_create_token'], 500);
        }
        // $this->respondWithToken($token);

        if(Auth::attempt(['usuario' => $request->usuario, 'password' => $request->password])){
            if(Auth::user()->estado == 1){

                $new = User::findOrFail(Auth::user()->id);
                $new->ultimo_login    = Carbon::now()->toDateTimeString();
                $new->ultimo_login_ip = $request->getClientIp();
                $new->intentos_login  = 0;
                $new->save();
                $this->logUserLogin($request);

                $payload = JWTFactory::sub(Auth::user()->id)
                                    ->myCustomObject(Auth::user())
                                    ->make();

                $token = JWTAuth::encode($payload);
                // dd(json_encode($token));
                session(['token_user'=> $token]);

                return redirect()->route('centralizado');
            }
            Auth::logout();
            return back()->with('error','Usuario Inactivo');
        }

    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            //'expires_in' => auth()->factory()->getTTL() * 60
            // 'expires_in' => auth('api')->factory()->getTTL() * 60
        ])->withCookie(cookie('access_token', $token));

    }

    protected function validateLogin(Request $request){ //validar login
        $this->validate($request,[
            'usuario'   => 'required|string',
            'password'  => 'required|string'
        ]);
    }

    public function logout(Request $request){ //cerrar sesion
        Auth::logout();
        $request->session()->invalidate();
        return Redirect::to($this->rutaProduccion);
        // return redirect('/');
    }

    public function recovery(){ //carga el color del boton y el escudo a la vista recovery(necesaria?)
        // $escudo = $this->rutaEscudo();
        // $color = $this->colorBoton();
        return view('auth.recovery');
    }

    public function logUserLogin(Request $request){

        $new = new LogUserLogin();
        $new->id_usuario    = Auth::user()->id;
        $new->fecha_login   = Carbon::now()->toDateTimeString();
        $new->ip_login      = $request->getClientIp();
        $new->save();
    }

    public function getAuthenticatedUser()
    {
    try {
        if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
        }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
                return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
                return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
                return response()->json(['token_absent'], $e->getStatusCode());
        }
        return response()->json(compact('user'));
    }


}

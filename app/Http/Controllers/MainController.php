<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Events\MyEvent;
use App\Models\MenuOld;
use FontLib\Table\Type\name;
use Illuminate\Support\Facades\Artisan;
use App\Models\RutasVue;
use App\Helpers\Equivalencias;
use App\Models\Rol;
use Inertia\Inertia;

class MainController extends Controller
{
   
    

    protected  $tipo       = 'cliente';
    protected  $tipo2      = 'empleado';
    protected  $tipo3      = 'administrador';
    protected  $tipo4      = 'super_administrador';
    protected  $rolCliente  = '';
    protected  $rolEmpleado   = '';
    protected  $rolAdministrador   = '';
    protected  $rolSuperAdmin   = '';

    public function __construct(){
        $this->middleware('auth');
        $this->nameDbCent = config('database.connections.centralizado.schema');

        $rol  = Rol::get();

        foreach($rol as $role){
            if(strtolower($role->name) == $this->tipo){
                $this->rolCliente  = $role->name;
            }
            if(strtolower($role->name) == $this->tipo2){
                $this->rolEmpleado = $role->name;
            }
            if(strtolower($role->name) == $this->tipo3){
                $this->rolAdministrador = $role->name;
            }
            if(strtolower($role->name) == $this->tipo4){
                $this->rolSuperAdmin = $role->name;
            }
        }
    }

public function RolActual(){

    $rolActual = '';

    if(Auth::user()->hasRole($this->rolCliente)){
        $rolActual = 'Empresa';

    }else if(Auth::user()->hasRole($this->rolEmpleado)){
        $rolActual = 'Empresa_Sede';

    }
    else if(Auth::user()->hasRole($this->rolAdministrador)){
        $rolActual = 'Agendador';

    }
    else if(Auth::user()->super_administrador == '1' or Auth::user()->hasRole($this->rolSuperAdmin)){
        $rolActual = 'Administrador';

    }
    return [
        'roles' => $rolActual,
    ];
}

    public function index()
    {
        return Inertia::render('Home', [
            // 'citas' => $cita->paginate(6),

        ]);
    }


}

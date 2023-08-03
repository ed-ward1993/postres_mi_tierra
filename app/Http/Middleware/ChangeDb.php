<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ChangeDb
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $conexion =  $request->session()->get('conexion');

        if($conexion != 'centralizado' and $conexion != null){
           
            //se arma la conexion dinamica
            $dinamico = [
                'driver'    => config('database.connections.dinamico.driver'),
                'host'      => config('database.connections.dinamico.host'),
                'port'      => config('database.connections.dinamico.port'),
                'database'  => $request->session()->get('nombre_db'),
                'username'  => config('database.connections.dinamico.username'),
                'password'  => config('database.connections.dinamico.password'),
                'charset'   => config('database.connections.dinamico.charset'),
                'collation' => config('database.connections.dinamico.collation'),
                'prefix'    => config('database.connections.dinamico.prefix'),
                'strict'    => config('database.connections.dinamico.strict'),
            ];

            $connections = config('database.connections');
            $connections[$conexion] = $dinamico;
            config(['database.connections' => $connections]);
            \Config::set('database.default',$conexion);
            DB::purge('centralizado');        
            DB::reconnect('centralizado');         

        }else{
            \Config::set('database.default',$conexion);
        }

        return  $next($request);
    
    }
}

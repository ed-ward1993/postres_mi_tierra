<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Traits\HasRoles;
use App\Helpers\Equivalencias;
use Illuminate\Database\Eloquent\Model;
use App\Models\PersonaCentralizado;
use App\Models\PostresUsuario;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasRoles;
    use Notifiable;

    protected $connection = 'centralizado';
    protected $table ="usuarios";


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'estado', 'intentos_login'
        // 'id_persona', 'rol_id', 'entidad_id', 'usuario', 'email', 'password', 'estado', 'observaciones'
    ];

    public function persona()
    {

        return $this->belongsTo(PersonaCentralizado::class, 'id_persona','id');
    }

    public function postres()
    {
        return $this->hasMany(PostresUsuario::class,'id_usuario');
    }
    

    public function getAllPermissionsAttribute()
    {
        $permissions = [];

        if(Auth::user()->super_administrador == '0' and session('conexion') == 'centralizado')
        {
            foreach (Permission::where('status', 1)->get() as $permission) {
                if (Auth::user()->can($permission->name)) {
                    $permissions[] = $permission->name;
                }
            }
        }else if(Auth::user()->super_administrador == '1' and session('conexion') == 'centralizado'){
            foreach (Permission::where('status', 1)->get() as $permission) {
                $permissions[] = $permission->name;
            }
            // Auth::user()->assignRole('Super administrador');
        }
        return $permissions;
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}

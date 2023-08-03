<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Support\Facades\Session;

class Rol extends \Spatie\Permission\Models\Role
{   
    // use LogsActivity;
    // protected $connection;
    protected $connection;

    protected static $logAttributes = ['*'];

    protected static $logName       = 'rol';

    protected $guard_name = "web";

    protected $table = 'roles';
    protected $fillable = ['name','description', 'status', 'guard_name'];


    public function __construct(array $attributes = [])
    {
		parent::__construct($attributes);
        $this->connection = 'centralizado';
    }

    public static function rolesDefault()
    {
        $roles_array = [
            '1' => [ 
                'super_administrador'
            ],
            '2' => [
                'administrador'
            ]
        ];

    	return $roles_array;
    }

    public static function rolesDefault2()
    {
        //$roles_array = ['name' => 'Administrador'];
        $roles_array = [
            'administrador'         => '1',
            'super_administrador'   => '2',
         
        ];

        return $roles_array;
    }
   
}

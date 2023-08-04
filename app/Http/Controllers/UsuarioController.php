<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Rol;
use App\Models\PersonaCentralizado;
use App\Models\ModelHasRol;
use App\Models\TipoDocumento;
use App\Models\Password;
use Inertia\Inertia;
use Mail;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Redirect;



class UsuarioController extends Controller
{
    protected $nameDbCent;

    public function __construct()
    {

        $this->middleware('permission:view_usuarios', ['only' => ['index']]);
        $this->middleware('permission:add_usuarios', ['only' => ['create']]);
        $this->middleware('permission:edit_usuarios', ['only' => ['update']]);
        $this->middleware('permission:delete_usuarios', ['only' => ['inactivar', 'activar']]);
        $this->nameDbCent = config('database.connections.centralizado.schema');
    }

    
    
    public function index(Request $request)
    {
        // if (!$request->ajax()) return redirect('/');

            $usuarios = ModelHasRol::join($this->nameDbCent . '.usuarios as users', 'model_has_roles.model_id', '=', 'users.id')
                ->join('roles', 'roles.id', '=', 'model_has_roles.role_id')
                ->join($this->nameDbCent . '.personas as pers', 'users.id_persona', '=', 'pers.id')
                ->join($this->nameDbCent . '.tipos_documentos as tip_doc', 'pers.tipo_documento', '=', 'tip_doc.id')
                ->select(
                    'users.id',
                    'roles.id as idrol',
                    'roles.name as rol_nom',
                    'users.email as email',
                    'users.usuario as usuario',
                    'users.observaciones as observaciones',
                    'users.id_persona as persona_id',
                    'users.estado as estado',
                    'tip_doc.id AS tipo_documento',
                    'tip_doc.nombre AS n_tipo_documento',
                    'pers.numero_documento as numero_documento',
                    'pers.nombre as nombre',
                    'pers.apellido as apellidos'
                )
                ->orderBy('users.id', 'asc')
                ->where('model_has_roles.model_type', '=', 'App\Models\User')
                ->WhereIn('roles.id', ['1', '2', '4']);
        

        $tipo_documento = TipoDocumento::orderBy('id', 'ASC')->get();
        $roles_empleados = Rol::orderBy('id', 'asc')->WhereIn('roles.id', ['1', '2', '4'])->get();
        return Inertia::render('Usuarios/Index', [
            'usuarios'  => $usuarios->paginate(10),
            'tipo_documento' => $tipo_documento,
            'roles' => $roles_empleados,
        ]);
    }

    public function indexClientes(Request $request)
    {

        // if (!$request->ajax()) return redirect('/');

        $usuarios = ModelHasRol::join($this->nameDbCent . '.usuarios as users', 'model_has_roles.model_id', '=', 'users.id')
        ->join('roles', 'roles.id', '=', 'model_has_roles.role_id')
        ->join($this->nameDbCent . '.personas as pers', 'users.id_persona', '=', 'pers.id')
        ->join($this->nameDbCent . '.tipos_documentos as tip_doc', 'pers.tipo_documento', '=', 'tip_doc.id')
        ->select(
            'users.id',
            'roles.id as idrol',
            'roles.name as rol_nom',
            'users.email as email',
            'users.usuario as usuario',
            'users.observaciones as observaciones',
            'users.id_persona as persona_id',
            'users.estado as estado',
            'tip_doc.id AS tipo_documento',
            'tip_doc.nombre AS n_tipo_documento',
            'pers.numero_documento as numero_documento',
            'pers.nombre as nombre',
            'pers.apellido as apellidos',
            'pers.telefono as telefono',
            'pers.direccion as direccion'
        )
        ->orderBy('users.id', 'asc')
        ->where('model_has_roles.model_type', '=', 'App\Models\User')
        ->WhereIn('roles.id', ['3']);
        

        $tipo_documento = TipoDocumento::orderBy('id', 'ASC')->get();
        $roles_clientes = Rol::orderBy('id', 'asc')->WhereIn('roles.id', ['3'])->get();
        return Inertia::render('Usuarios/IndexClientes', [
            'usuarios'  => $usuarios->paginate(10),
            'tipo_documento' => $tipo_documento,
            'roles' => $roles_clientes,
        ]);
    }


    public function store(Request $request)
    {
        // dd($request);
        // Validar si el número de documento ya existe
        $numero_documento_existente = PersonaCentralizado::where('numero_documento', $request->numero_documento)->exists();
        if ($numero_documento_existente) {
            return back()->withErrors(['numero_documento' => 'El número de documento ya existe'])->withInput();
        }
        $usuario_existe = User::where('usuario', $request->usuario)->exists();
        if ($usuario_existe) {
            return back()->withErrors(['usuario' => 'El nombre de este usuario ya existe'])->withInput();
        }
        // dd('entre',$request->all());
        // $validated = $request->validate([
        //     'nombres' => 'required|string|max:100',
        //     'apellidos' => 'required|string|max:100',
        //     'tipo_documento' => 'required',
        //     'numero_documento' => 'required|numeric',
        //     'usuario' => 'required|string|max:100',
        //     'email' => 'required|email',
        //     'telefono' => 'required|string|max:100',
        //     'direccion' => 'required|string|max:150',
        //     'roles' => 'required',
        //     'empresas' => 'required',
        //     'sedes' => 'required',
        //     'contrasena' => ['required', Rules\Password::defaults()],

        // ]);

        // Validar rol
        $rol = Rol::select('name')
            ->where('id', $request->roles)
            ->first();
        // dd($request->roles);
        // dd($request->contrasena2);

        // Verificar si las contraseñas coinciden
        if ($request->contrasena !== $request->contrasena2) {
            return back()->withErrors(['contrasena' => 'Las contraseñas no coinciden'])->withInput();
        }

        $person = new PersonaCentralizado();
        // dd('entre');
        $person->nombre           = $request->nombres;
        $person->apellido         = $request->apellidos;
        $person->telefono         = $request->telefono;
        $person->direccion        = $request->direccion;
        $person->tipo_documento   = $request->tipo_documento;
        $person->numero_documento = $request->numero_documento;
        // $person->save($validated);
        $person->save();

        $user = new User();
        $user->id_persona           = $person->id;
        $user->usuario              = $request->usuario;
        $user->email                = $request->email;
        $user->password             = bcrypt($request->contrasena);
        $user->observaciones        = $request->observaciones;
        // $user->save($validated);
        $user->save();

        $user->assignRole($request->roles);

        $password = new Password();
        $password->usuario_id   = $user->id;
        $password->password     = $user->password;
        $password->estado       = 1;
        // $password->save($validated);
        $password->save();
    }

    public function actualizarPerfil(User $user, Request $request)
    {
        // dd($request);
         // Obtener el usuario existente por su ID
         $user = User::find($request->id);
         $numero_documento = $user->persona->numero_documento;
         // dd($numero_documento);
 
         // Verificar si el número de documento pertenece al mismo usuario
         if ($request->numero_documento != $numero_documento) {
             // Validar si el número de documento ya existe en otro usuario, excluyendo el usuario actual
             $numero_documento_existente = PersonaCentralizado::where('numero_documento', $request->numero_documento)
                 ->where('id', '!=', $user->id)
                 ->exists();
 
             if ($numero_documento_existente) {
                 return back()->withErrors(['numero_documento' => 'El número de documento ya está asociado a otro usuario'])->withInput();
             }
         }

        $validated = $request->validate([
            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'tipo_documento' => 'required',
            'numero_documento' => 'required|numeric',
            'usuario' => 'required|string|max:100',
            'email' => 'required|email',
            'contrasena' => ['nullable', Rules\Password::defaults()],

        ]);
        $user->assignRole($request->roles);
        // dd($validated);

        // Verificar si las contraseñas coinciden
        if ($request->contrasena !== $request->contrasena2) {
            return back()->withErrors(['contrasena' => 'Las contraseñas no coinciden'])->withInput();
        }
        $contrasena = $request->contrasena;
        $usuario = $request->usuario;

        $usuarioExistente = User::where('usuario', 'ILIKE', $usuario)->first();

        if ($usuarioExistente && $usuarioExistente->id != $request->id) {
            return back()->withErrors([
                'usuario' => 'El Usuario ingresado ya está registrado!'
            ])->withInput();
        }
        // dd($request->id);
        if (!$contrasena) {
            $person = PersonaCentralizado::find($request->id_persona);
            // dd($person->id);

            $person->nombre           = $request->nombres;
            $person->apellido         = $request->apellidos;
            $person->tipo_documento   = $request->tipo_documento;
            $person->numero_documento = $request->numero_documento;
            $person->save($validated);

            $user = User::find($request->id);
            $user->id_persona           = $person->id;
            $user->usuario              = $request->usuario;
            $user->email                = $request->email;
            $user->observaciones        = $request->observaciones;
            $user->save($validated);
        } else {

            $person = PersonaCentralizado::find($request->id);
            $person->nombre           = $request->nombres;
            $person->apellido         = $request->apellidos;
            $person->tipo_documento   = $request->tipo_documento;
            $person->numero_documento = $request->numero_documento;
            $person->save($validated);

            $user = User::find($request->id);
            $user->id_persona           = $person->id;
            $user->usuario              = $request->usuario;
            $user->email                = $request->email;
            $user->password             = bcrypt($request->contrasena);
            $user->observaciones        = $request->observaciones;
            $user->save($validated);
        }

        return Redirect::route('main')->with('success', 'Perfil actualizado exitosamente');
    }


    public function update(Request $request)
    {
        // Obtener el usuario existente por su ID
        $user = User::find($request->id);
        $numero_documento = $user->persona->numero_documento;
        // dd($numero_documento);

        // Verificar si el número de documento pertenece al mismo usuario
        if ($request->numero_documento != $numero_documento) {
            // Validar si el número de documento ya existe en otro usuario, excluyendo el usuario actual
            $numero_documento_existente = PersonaCentralizado::where('numero_documento', $request->numero_documento)
                ->where('id', '!=', $user->id)
                ->exists();

            if ($numero_documento_existente) {
                return back()->withErrors(['numero_documento' => 'El número de documento ya está asociado a otro usuario'])->withInput();
            }
        }

        $validated = $request->validate([
            'nombres' => 'required|string|max:100',
            'tipo_documento' => 'required',
            'numero_documento' => 'required|numeric',
            'usuario' => 'required|string|max:100',
            'email' => 'required|email',
            'roles' => 'required',
            'contrasena' => ['nullable', Rules\Password::defaults()],

        ]);

        $usuario = $request->usuario;

        $usuarioExistente = User::where('usuario', 'ILIKE', $usuario)->first();
        // dd($usuarioExistente);


        if ($usuarioExistente && $usuarioExistente->id != $request->id) {
            return back()->withErrors([
                'usuario' => 'El Usuario ingresado ya está registrado!'
            ])->withInput();
        }

        // Verificar si las contraseñas coinciden
        if ($request->contrasena !== $request->contrasena2) {
            return back()->withErrors(['contrasena' => 'Las contraseñas no coinciden'])->withInput();
        }

        // Validar rol
        $rol   = Rol::select('name')
            ->where('id', $request->roles)
            ->first();
        // dd($rol);

        $persona                    = PersonaCentralizado::findOrFail($request->persona_id);
        $persona->nombre            = $request->nombres;
        $persona->apellido          = $request->apellidos;
        $persona->tipo_documento    = $request->tipo_documento;
        $persona->numero_documento  = $request->numero_documento;
        $persona->save($validated);

        $user           = User::findOrFail($request->id);
        $user->email    = $request->email;
        if (isset($request->contrasena)) {
            $user->password = bcrypt($request->contrasena);
        }
        $user->observaciones = $request->observaciones;
        $user->save($validated);

        if (isset($request->contrasena)) {
            
            $inactiva = Password::where('usuario_id', $user->id)->where('estado', 'true')->first();
            $inactiva->estado = 'false';
            $inactiva->save($validated);

            $password = new Password();
            $password->usuario_id   = $request->id;
            $password->password     = $user->password;
            $password->estado       = 1;
            $password->save($validated);
        }

        $user->roles()->detach();
        $user->assignRole($request->roles);
    }

    public function edit(User $user, Request $request)
    {
        //
        //dd($user);
        $usuario = User::join('personas', 'usuarios.id_persona', '=', 'personas.id')
            ->join('tipos_documentos', 'personas.tipo_documento', '=', 'tipos_documentos.id')
            ->select(
                'usuarios.id',
                'usuarios.email as email',
                'usuarios.estado as estado',
                'usuarios.usuario as usuario',
                'usuarios.id_persona as persona_id',
                'usuarios.super_administrador as super_administrador',
                'tipos_documentos.id AS tipo_documento',
                'tipos_documentos.nombre AS n_tipo_documento',
                'personas.numero_documento as numero_documento',
                'personas.nombre as nombre',
                'personas.apellido as apellidos'
            )
            ->where('usuarios.id', $user->id) // Filtrar por el ID del usuario
            ->first(); // Obtener el primer resultado
        // dd($usuario);
        $tipo_documento = TipoDocumento::orderBy('id', 'ASC')->get();
        $roles = Rol::orderBy('id', 'asc')->get();
        return Inertia::render('Usuarios/Edit', [
            'user' => $user,
            'usuario' => $usuario,
            'tipo_documento' => $tipo_documento,
            'roles' => $roles,
        ]);
    }

    public function inactivar(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $user = User::findOrFail($request->id);
        $user->estado = '0';
        $user->save();
    }

    public function activar(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $user = User::findOrFail($request->id);
        $user->estado = '1';
        $user->save();
    }
}

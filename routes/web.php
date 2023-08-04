<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\PermisosController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ParametrizarMenusController;
use App\Http\Controllers\CentralizadoController;
use App\Http\Controllers\TipoDocumentoController;
use App\Http\Controllers\PostresCentralizadoController;
use App\Http\Controllers\ParametrizarRutasVueController;
use App\Http\Controllers\PasswordResetControllerWeb;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\RouteController;
use App\Http\Middleware\ChangeDb;
use App\Http\Middleware\CheckSesion;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Middleware\ValidateSesion;
use App\Http\Controllers\UsuarioController;

use Inertia\Inertia;

Route::get('/user', [UserController::class, 'index']);

    Route::get('/inicio', function () {
        return Inertia::render('Inicio');
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
        })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/', [LoginController::class,'showLoginForm'])->name('showlogin')->middleware('validateSesion')->middleware('CheckSesion');
Route::post('/login2', [LoginController::class,'login'])->name('login2');
Route::post('/logout', [LoginController::class,'logout'])->name('logout');
Route::get('/recovery', [LoginController::class,'recovery'])->name('recovery');
Route::view('/menu_gob', 'auth.menu_gob');
Route::get('/token/{error}', [LoginController::class,'showLoginFormRedirect']);
Route::get('autoLoginRedirect/{conexion}',[CentralizadoController::class,'loginRedirect'])->name('autoLoginRedirect');

Route::post('web/create', [PasswordResetControllerWeb::class,'create'])->name('password.create');
Route::get('web/password/find/{token}', [PasswordResetControllerWeb::class,'find']);
Route::post('web/reset', [PasswordResetControllerWeb::class,'reset'])->name('password.reset');

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('autologin/{userId}/{conexion}/{token}',[CentralizadoController::class,'change']);
});

Route::middleware('auth')->group(function () {

    Route::get('centralizado',[CentralizadoController::class,'index'])->name('centralizado')->middleware('validateSesion');
    Route::get('centralizadoRedirect',[CentralizadoController::class,'getViewCentralizado'])->middleware('validateSesion');
    Route::get('centralizado/{conexion}',[CentralizadoController::class,'change'])->name('changeDb');
    Route::get('administracion',[CentralizadoController::class,'redirectAdmin'])->name('administracion');

    Route::get('/menus/all',[MenuController::class,'allMenus'])->name('menus.all');//devuelve los menús jerarquicamente para un treeselect
    Route::get('/routes/all',[RouteController::class,'index'])->name('routes.index');//devuelve el select de las rutas

    Route::resource('menus',MenuController::class);//crud de menús

    Route::group(["middleware" => ["CheckDepto","ChangeDb","validateSesion"]],function ()  {

        Route::get('/main',[MainController::class, 'index'])->name('main');
        Route::get('/main/roles',[MainController::class, 'RolActual'])->name('main.rol');

        Route::get('/roles', [RolController::class,'index'])->name('roles.index');
        Route::post('/roles/guardar', [RolController::class,'store'])->name('roles.store');
        Route::post('/roles/update', [RolController::class,'update'])->name('roles.update');
        Route::put('/roles/inactivar', [RolController::class,'inactivar'])->name('roles.inactivar');
        Route::put('/roles/activar', [RolController::class,'activar'])->name('roles.activar');
        Route::put('/roles/asignarPermisos', [RolController::class,'asignarPermisos'])->name('roles.asignarPermisos');
        Route::post('/roles/obtenerRolPermisos', [RolController::class,'obtenerRolPermisos'])->name('roles.obtenerRolPermisos');
        Route::get('/rol/getrol', [RolController::class,'getRoles']);

        Route::get('/permisos', [PermisosController::class,'index'])->name('permisos.index');
        Route::post('/permisos/guardar', [PermisosController::class,'store'])->name('permisos.store');
        Route::post('/permisos/update', [PermisosController::class,'update'])->name('permisos.update');
        Route::put('/permisos/inactivar', [PermisosController::class,'inactivar'])->name('permisos.inactivar');
        Route::put('/permisos/activar', [PermisosController::class,'activar'])->name('permisos.activar');

        Route::get('/usuarios', [UsuarioController::class,'index'])->name('usuarios.index');
        Route::get('/usuarios/clientes', [UsuarioController::class,'indexClientes'])->name('usuarios.indexClientes');
        Route::get('/usuarios/edit/{user}', [UsuarioController::class,'edit'])->name('usuarios.edit');
        Route::post('/usuarios/ActualizarPerfil', [UsuarioController::class,'actualizarPerfil'])->name('usuarios.actualizarPerfil');
        Route::post('/usuarios/sedes', [UsuarioController::class,'sedes'])->name('usuarios.sedes');
        Route::post('/usuarios/guardar', [UsuarioController::class,'store'])->name('usuarios.store');
        Route::post('/usuarios/update', [UsuarioController::class,'update'])->name('usuarios.update');
        Route::put('/usuarios/inactivar', [UsuarioController::class,'inactivar'])->name('usuarios.inactivar');
        Route::put('/usuarios/activar', [UsuarioController::class,'activar'])->name('usuarios.activar');

        Route::get('/postresCentralizado', [PostresCentralizadoController::class,'index']);
        Route::post('/postresCentralizado/create', [PostresCentralizadoController::class,'store']);
        Route::post('/postresCentralizado/update', [PostresCentralizadoController::class,'update']);
        Route::put('/postresCentralizado/cambiarEstado', [PostresCentralizadoController::class,'cambiarEstado']);
        Route::get('/postresCentralizado/getpostres', [PostresCentralizadoController::class,'getpostres']);

        Route::get('/tipoDocumento',[TipoDocumentoController::class,'index']);
        Route::post('/tipoDocumento/create', [TipoDocumentoController::class,'store']);
        Route::put('/tipoDocumento/update', [TipoDocumentoController::class,'update']);
        Route::put('/tipoDocumento/inactivar', [TipoDocumentoController::class,'inactivar']);
        Route::put('/tipoDocumento/activar', [TipoDocumentoController::class,'activar']);

    });
});

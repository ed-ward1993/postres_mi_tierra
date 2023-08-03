<?php
namespace App\Helpers;

class Equivalencias
{

	private static $urlProduccion = 'http://127.0.0.1:8000/';
	private static $urlDinamico = 'http://127.0.0.1:8081/';
	// ruta que se debe poner en la base de datos para que cargue a produccion 
	// private static $urlDinamico = 'http://localhost/super_bien/sime-nuevo/public/';


	public static function urlProduccion()
	{
		// return env('APP_URL')."/super_bien/centralizado-sime/public/";
		return self::$urlProduccion;
	}

	public static function urlDinamico()
	{
		// return env('APP_URL')."/super_bien/sime-nuevo/public/";
		return self::$urlDinamico;
	}

}

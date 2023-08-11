<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriaController extends Controller
{
    //
    public function index()
    {
        $categoria = Categoria::orderBy('id_categorias', 'ASC')
        ->where(function ($query) {
            if (request()->input('queryCategorias')) {
                $searchValue = request()->input('queryCategorias');
                $query->where("categorias.nombre", "ilike", "%{$searchValue}%");
            }
        });

        return Inertia::render('Categorias/Index',[
            'queryCategorias' => request()->input('queryCategorias'),
            'categorias' => $categoria->paginate(10),
        ]);
    }
}

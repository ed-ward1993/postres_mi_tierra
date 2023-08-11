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
        $categoria = Categoria::orderBy('id_categorias', 'asc');
        return Inertia::render('Categorias/Index',[
            'categorias' => $categoria->paginate(10),
        ]);
    }
}

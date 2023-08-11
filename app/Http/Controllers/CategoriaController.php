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
        $categoria = Categoria::orderBy('id', 'asc');
        
        return Inertia::render('Categoria/Index',[
            'categorias' => $categoria->paginate(10),
        ]);
    }
}

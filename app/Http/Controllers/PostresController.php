<?php

namespace App\Http\Controllers;

use App\Models\Postres;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostresController extends Controller
{
    public function index()
    {
        $postres = Postres::orderBy('id_postres', 'asc');
        return Inertia::render('Postres/Index',[
            'postres' => $postres->paginate(10),
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMenuRequest;
use App\Http\Resources\MenuResource;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class MenuController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $menus = (new Menu())->newQuery();
        $menus->when($request->input('queryMenus'),function($query,$search){
            $query->where('title','like',"%$search%")
                ->orWhere('uri','like',"%$search%");
        })->with(['parent'])->orderBy('id','desc');
        $menus = $menus->paginate(12)->onEachSide(2)->appends(request()->query());

        return Inertia::render('Menu/Index', ['menus' => $menus, 'queryMenus' => $request->input('queryMenus'), 'page' => $request->input('page')]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function allMenus(Request $request)
    {
        $menuParent = $request->input('parent') ?? 0;
        $menus2 = Menu::where('parent_id',$menuParent)->where('status',1)->orderBy('id','asc')->get();
        $menus = $this->getMenusByRole($menus2);
        return response()->json($menus);
    }

    protected function getMenusByRole($menus){
        $selectedMenus = [];
        $user = auth()->user();
        foreach($menus as $menu){
            //if($menu->hasRole($user->roles) || $this->isChildrenMenuRole($menu)){
                $mnu = $menu;
                $children = Menu::where('parent_id',$menu->id)->where('status',1)->orderBy('id','asc')->get();
                $mnu->children = $this->getMenusByRole($children);
                $selectedMenus[] = new MenuResource($mnu);
            //}
        }
        return $selectedMenus;
    }

    protected function isChildrenMenuRole($menu)
    {
        $children = Menu::where('parent_id', $menu->id)->where('status', 1)->get();
        $user = auth()->user();
        foreach ($children as $child){
            $userRoles = $user->roles;
            if ($child->hasRole($userRoles)) {
                return true;
            } else {
                return $this->isChildrenMenuRole($child);
            }
        }
        return false;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Menu/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMenuRequest $request)
    {
        $menu = Menu::create($request->except(['roles']));

        $roles = $request->input('roles');
        $menu->roles()->sync($roles);

        return Redirect::route('menus.index')->with('message','Menú creado exitosamente');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function show(Menu $menu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function edit(Menu $menu)
    {
        $menuData = new MenuResource($menu);
        return Inertia::render('Menu/Edit', [
            'menu' => json_decode($menuData->toJson())
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function update(StoreMenuRequest $request, Menu $menu)
    {
        $data = $request->except(['roles']);
        $menu->update($data);

        $roles = $request->input('roles');
        $menu->roles()->sync($roles);

        return Redirect::route('menus.index')->with('message','Menú actualizado exitosamente');;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function destroy(Menu $menu, Request $request)
    {
        $menu->update(['status' => $request->input('status')]);

        return Redirect::route('menus.index')->with('message','Menú '.($request->input('status') == 0?'in':'').'activado exitosamente');;
    }
}

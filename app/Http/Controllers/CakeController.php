<?php

namespace App\Http\Controllers;

use App\Models\Cake;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class CakeController extends Controller
{
    public function index()
    {
        $cakes = Cake::all();
        return Inertia::render('Menu/Index', ['cakes' => $cakes]);
    }

    public function store(Request $request)
    {
        Gate::authorize('manage-inventory');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image_url' => 'nullable|url',
        ]);

        Cake::create($validated);

        return redirect()->back()->with('success', 'New cake added to the menu!');
    }

    public function update(Request $request, Cake $cake)
    {
        Gate::authorize('manage-inventory');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image_url' => 'nullable|url',
        ]);

        $cake->update($validated);

        return redirect()->back()->with('success', 'Cake details updated successfully!');
    }

    public function destroy(Cake $cake)
    {
        Gate::authorize('manage-inventory');

        $cake->delete();

        return redirect()->back()->with('success', 'Cake removed from the menu.');
    }
}
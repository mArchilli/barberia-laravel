<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $barbershopId = session('selected_barbershop_id');
        
        $products = Product::where('barbershop_id', $barbershopId)
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $barbershopId = session('selected_barbershop_id');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Product::create([
            'barbershop_id' => $barbershopId,
            'name' => $validated['name'],
            'quantity' => 0,
        ]);

        return redirect()->route('admin.products.index');
    }

    public function updateQuantity(Request $request, Product $product)
    {
        $validated = $request->validate([
            'action' => 'required|in:add,subtract',
            'amount' => 'required|integer|min:1',
        ]);

        if ($validated['action'] === 'add') {
            $product->increment('quantity', $validated['amount']);
        } else {
            $newQuantity = $product->quantity - $validated['amount'];
            $product->update(['quantity' => max(0, $newQuantity)]);
        }

        return redirect()->route('admin.products.index');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index');
    }
}

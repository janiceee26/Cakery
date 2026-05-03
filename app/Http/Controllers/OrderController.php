<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Cake;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = $request->user()->orders()->with('cakes')->orderBy('created_at', 'desc')->get();
        
        return Inertia::render('Orders/MyOrders', ['orders' => $orders]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'pickup_date' => 'required|date|after:today',
            'cake_id' => 'required|exists:cakes,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $order = $request->user()->orders()->create([
            'pickup_date' => $request->pickup_date,
            'status' => 'pending'
        ]);

        $order->cakes()->attach($request->cake_id, ['quantity' => $request->quantity]);

        return redirect()->route('orders.index')->with('success', 'Your custom cake order has been placed!');
    }

    public function destroy(Order $order)
    {
        Gate::authorize('delete', $order);

        $order->delete();

        return redirect()->back()->with('success', 'Your order was successfully cancelled.');
    }
}
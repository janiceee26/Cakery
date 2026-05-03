<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class AdminOrderController extends Controller
{
    public function index()
    {
        Gate::authorize('update-orders');

        $orders = Order::with(['user', 'cakes'])->orderBy('pickup_date', 'asc')->get();
        
        return Inertia::render('Admin/Orders/Index', ['orders' => $orders]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        Gate::authorize('update-orders');

        $request->validate([
            'status' => 'required|in:pending,baking,ready,completed'
        ]);

        $order->update(['status' => $request->status]);

        return redirect()->back()->with('success', "Order #{$order->id} status updated to {$request->status}!");
    }
}
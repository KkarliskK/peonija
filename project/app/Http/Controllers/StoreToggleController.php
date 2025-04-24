<?php

namespace App\Http\Controllers;

use App\Models\StoreSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoreToggleController extends Controller
{
    public function showStoreStatus()
    {
        $storeSettings = StoreSetting::first() ?? new StoreSetting();
        
        return Inertia::render('Admin/StoreStatus', [
            'storeSettings' => $storeSettings
        ]);
    }
    
    public function toggleStatus(Request $request)
    {
        $validated = $request->validate([
            'is_open' => 'required|boolean',
        ]);
        
        $storeSetting = StoreSetting::first();
        
        if (!$storeSetting) {
            $storeSetting = new StoreSetting();
        }
        
        $storeSetting->is_open = $validated['is_open'];
        $storeSetting->save();
        
        return back()->with('success', 'Store status updated successfully!');
    }
    
    public function updateHours(Request $request)
    {
        $validated = $request->validate([
            'is_open' => 'required|boolean',
            'working_hours' => 'required|array',
            'working_hours.*.day' => 'required|string',
            'working_hours.*.open_time' => 'required|string',
            'working_hours.*.close_time' => 'required|string',
            'working_hours.*.is_open' => 'required|boolean',
            'special_closures' => 'present|array',
            'special_closures.*.date' => 'required_with:special_closures|date',
            'special_closures.*.reason' => 'required_with:special_closures|string',
        ]);
        
        $storeSetting = StoreSetting::first();
        
        if (!$storeSetting) {
            $storeSetting = new StoreSetting();
        }
        
        $storeSetting->is_open = $validated['is_open'];
        $storeSetting->working_hours = $validated['working_hours'];
        $storeSetting->special_closures = $validated['special_closures'];
        $storeSetting->save();
        
        return back()->with('success', 'Store hours updated successfully!');
    }
}
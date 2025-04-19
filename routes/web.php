
<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// API documentation route
Route::get('/api/docs', function () {
    return view('api_docs');
});

// For API routes
Route::prefix('api')->group(function () {
    return response()->json([
        'message' => 'SyncSaga API Server', 
        'version' => '1.0',
        'status' => 'active',
        'documentation' => '/api/docs',
        'frontend_url' => env('FRONTEND_URL', 'http://localhost:8080')
    ]);
});

// Catch all routes to serve React frontend
Route::get('/{path?}', function () {
    return view('app');
})->where('path', '.*');


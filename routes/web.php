
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

// For all other routes, return a message that this is an API server
Route::get('/', function () {
    return response()->json([
        'message' => 'SyncSaga API Server', 
        'version' => '1.0',
        'status' => 'active',
        'documentation' => '/api/docs',
        'frontend_url' => env('FRONTEND_URL', 'http://localhost:8080')
    ]);
});

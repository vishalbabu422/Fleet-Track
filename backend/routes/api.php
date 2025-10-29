<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrdersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum','role:admin,dispatcher'])->group(function(){
    Route::get('/orders',[OrdersController::class,'index']);
});

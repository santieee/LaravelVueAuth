<?php
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', 'AuthController@login')->name('login');
Route::post('/register', 'AuthController@register')->name('register');
Route::post('/logout', 'AuthController@logout')->name('logout')->middleware('auth:api');
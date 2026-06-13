<?php

use Illuminate\Support\Facades\Route;

Route::get('/', [App\Http\Controllers\Public\IndexController::class, 'index'])->name('index');
Route::get('/genres/{genre_code}/movies', [App\Http\Controllers\Public\GenresController::class, 'index'])->name('genres');
Route::get('/movies/{movie_code}/play', [App\Http\Controllers\Public\MoviesController::class, 'index'])->name('movies');

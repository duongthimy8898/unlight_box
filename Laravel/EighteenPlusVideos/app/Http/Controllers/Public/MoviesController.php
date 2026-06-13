<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MoviesController extends Controller
{
    public function index($movie_code)
    {
        $locale = 'vi';
        $genres_res = Http::withoutVerifying()->get('https://topxx.vip/api/v1/genres')->json();
        $genres = collect($genres_res['data'])->map(function ($item) use ($locale) {
            $translation = collect($item['translations'])
                ->firstWhere('locale', $locale);
            $item['name'] = $translation['name'] ?? null;
            return $item;
        });

        $movie_res = Http::withoutVerifying()->get("https://topxx.vip/api/v1/movies/{$movie_code}")->json();
        $movie = $movie_res['data'];
        $trans = collect($movie['trans'])
            ->firstWhere('locale', $locale);
        $movie['title'] = $trans['title'] ?? null;
        $movie['content'] = $trans['content'] ?? null;

        $movies_by_genre = Http::withoutVerifying()->get("https://topxx.vip/api/v1/genres/{$movie['genres'][0]['code']}/movies?page=1&per_page=100")->json();
        $movies_by_genre = collect($movies_by_genre['data'])->map(function ($item) use ($locale) {
            $trans = collect($item['trans'])
                ->firstWhere('locale', $locale);
            $item['title'] = $trans['title'] ?? null;
            $item['content'] = $trans['content'] ?? null;
            return $item;
        })->reject(function ($item) use ($movie) {
            return $item['code'] === $movie['code'];
        })->values();

        // dd($movie);
        return view('movies.play', [
            'genres' => $genres,
            'movie' => $movie,
            'same_genre_movies' => $movies_by_genre,
        ]);
    }
}

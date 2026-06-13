<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class IndexController extends Controller
{
    public function index()
    {
        $locale = 'vi';
        $genres_res = Http::withoutVerifying()->get('https://topxx.vip/api/v1/genres')->json();
        $genres = collect($genres_res['data'])->map(function ($item) use ($locale) {
            $translation = collect($item['translations'])
                ->firstWhere('locale', $locale);
            $item['name'] = $translation['name'] ?? null;
            return $item;
        });

        $today_movies_res = Http::withoutVerifying()->get('https://topxx.vip/api/v1/movies/today?page=1&per_page=100')->json();
        $today_movies = collect($today_movies_res['data'])->map(function ($item) use ($locale) {
            $translation = collect($item['trans'])
                ->firstWhere('locale', $locale);
            $item['title'] = $translation['title'] ?? null;
            $item['content'] = $translation['content'] ?? null;
            return $item;
        });

        $latest_movies_res = Http::withoutVerifying()->get('https://topxx.vip/api/v1/movies/latest?page=1&per_page=100')->json();
        $latest_movies = collect($latest_movies_res['data'])->map(function ($item) use ($locale) {
            $translation = collect($item['trans'])
                ->firstWhere('locale', $locale);
            $item['title'] = $translation['title'] ?? null;
            $item['content'] = $translation['content'] ?? null;
            return $item;
        });
        return view('index', [
            'genres' => $genres,
            'today_movies' => $today_movies,
            'latest_movies' => $latest_movies,
        ]);
    }
}

<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GenresController extends Controller
{
    public function index(Request $request, $genre_code)
    {
        $page = $request->query("page", 1);
        $locale = 'vi';
        $genres_res = Http::withoutVerifying()->get('https://topxx.vip/api/v1/genres')->json();
        $genres = collect($genres_res['data'])->map(function ($item) use ($locale) {
            $translation = collect($item['translations'])
                ->firstWhere('locale', $locale);
            $item['name'] = $translation['name'] ?? null;
            return $item;
        });
        $movies_by_genre_res = Http::withoutVerifying()->get("https://topxx.vip/api/v1/genres/{$genre_code}/movies?page={$page}&per_page=60")->json();
        $movies_by_genre = collect($movies_by_genre_res['data'])->map(function ($item) use ($locale) {
            $translation = collect($item['trans'])
                ->firstWhere('locale', $locale);
            $item['title'] = $translation['title'] ?? null;
            $item['content'] = $translation['content'] ?? null;
            return $item;
        });
        $meta = $movies_by_genre_res['meta'];
        $pagination = collect($meta['links'])->map(function ($item) use ($genre_code, $meta) {
            $label = $item['label'];
            if (str_contains($label, "Previous") || str_contains($label, "Next"))
                if ($item['url'] === null)
                    $item['url'] = null;
                else
                    if ($item['url'] !== null && str_contains($label, "Previous"))
                        $item['url'] = "/genres/{$genre_code}/movies?page=" . ($meta['current_page'] - 1) . "&per_page={$meta['per_page']}";
                    else
                        $item['url'] = "/genres/{$genre_code}/movies?page=" . ($meta['current_page'] + 1) . "&per_page={$meta['per_page']}";
            else
                $item['url'] = "/genres/{$genre_code}/movies?page={$label}&per_page={$meta['per_page']}";
            return $item;
        });
        return view('genres', [
            'genre' => $genres->firstWhere('code', $genre_code),
            'genres' => $genres,
            'movies_by_genre' => $movies_by_genre,
            'pagination' => $pagination
        ]);
    }
}

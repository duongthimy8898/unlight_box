<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->

    <!-- Styles / Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>

<body class="bg-[#0a0a0a] w-full min-h-screen">
    @include('fragments.header')
    <main class="mt-4 w-full max-w-[960px] mx-auto">
        @include('fragments.genres-section')
        <section id="movies-by-genre" class="mt-4 px-2">
            <h2 class="text-xl text-white">{{ 'Thể loại ' . $genre['name'] }}</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-4">
                @foreach ($movies_by_genre as $movie)
                    <a href="/movies/{{ $movie['code'] }}/play"
                        class="w-full h-auto bg-[#1a1a1a] hover:bg-[#3a3a3a] focus:bg-[#3a3a3a] rounded-[6px] transition overflow-hidden">
                        <img src="{{ $movie['thumbnail'] }}" alt="" class="w-full h-auto aspect-3/4 object-cover">
                        <div class="py-1.5 px-2">
                            <p class="text-center text-white text-sm line-clamp-3">{{ $movie['title'] }}</p>
                        </div>
                    </a>
                @endforeach
            </div>
        </section>
        <section id="pagination" class="px-2">
            <div class="w-full flex flex-row flex-wrap gap-1 items-center justify-center mt-4">
                @foreach ($pagination as $page)
                    @if ($page['url'] === '...' || $page['url'] === null)
                        <button
                            class="px-3 py-1 rounded-[4px] text-sm {{ $page['active'] ? 'bg-[#555]' : 'bg-[#1a1a1a]' }} text-white">{!! $page['label'] !!}</button>
                    @else
                        <a href="{{ $page['url'] }}"
                            class="px-3 py-1 rounded-[4px] text-sm {{ $page['active'] ? 'bg-[#555]' : 'bg-[#1a1a1a] hover:bg-[#333]' }} text-white">{!! $page['label'] !!}</a>
                    @endif
                @endforeach

            </div>
        </section>
    </main>
    @include('fragments.footer')
</body>

</html>

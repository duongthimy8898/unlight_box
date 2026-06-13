<section class="w-full px-2">
    <div class="w-full flex justify-center flex-row flex-wrap gap-2">
        @foreach ($genres as $genre)
            <a class="bg-[#1a1a1a] px-2 py-1 rounded-[12px] text-sm flex justify-center items-center gap-1 text-white"
                href="/genres/{{ $genre['code'] }}/movies">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4">
                    <path fill-rule="evenodd"
                        d="M4.5 2A2.5 2.5 0 0 0 2 4.5v3.879a2.5 2.5 0 0 0 .732 1.767l7.5 7.5a2.5 2.5 0 0 0 3.536 0l3.878-3.878a2.5 2.5 0 0 0 0-3.536l-7.5-7.5A2.5 2.5 0 0 0 8.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                        clip-rule="evenodd" />
                </svg>
                <span>{{ $genre['name'] }}</span>
            </a>
        @endforeach
    </div>
</section>

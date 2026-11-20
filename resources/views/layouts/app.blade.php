<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'SoundGrid')</title>
    <link rel="icon" type="image/png" href="{{ asset('images/SoundGrid logo.png') }}" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
      rel="stylesheet"
    />

    @vite(['resources/css/app.css', 'resources/js/app.js'])
  </head>
  <body>
    <div id="app">
      <div class="app-shell">
        @include('partials.sidebar')

        <main class="app-main">
          @include('partials.topbar')

          <div class="view-container">
            @yield('content')
          </div>
        </main>

        @include('partials.player')
      </div>
    </div>

    @stack('scripts')
  </body>
</html>

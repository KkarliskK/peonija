<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Peonija') }}</title>

    <!-- Fallback Meta Tags for SEO (in case JS doesn't load) -->
    <meta name="description" content="Ziedu veikals Peonija, Telpaugi, Ziedu kompozīcijas, griezti ziedi.">
    <meta name="keywords" content="Peonija, ziedu-veikals, ziedi, ziedu-veikals-cesis">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])

    <!-- Inertia Head for Dynamic Meta Tags -->
    @inertiaHead
    
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-BWS6Z558YH"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-BWS6Z558YH');
    </script>
</head>

<body class="font-sans antialiased h-dvh dark:bg-gray-900">
    <!-- Inertia renders your React components -->
    @inertia

    <!-- Stripe JavaScript Library -->
    <script src="https://js.stripe.com/v3/"></script>

</body>

</html>

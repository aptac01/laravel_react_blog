@php
    use Illuminate\Support\Facades\Vite;
@endphp

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel 10 vite with react</title>

{{--    {{--}}
{{--        Vite::useHotFile(public_path('hot'))--}}
{{--            ->useBuildDirectory('build')--}}
{{--            ->useManifestFilename('manifest.json')--}}
{{--            ->withEntryPoints(['resources/css/app.css', 'resources/js/app.jsx'])--}}
{{--            ->createAssetPathsUsing(function (string $path, ?bool $secure) {--}}
{{--//                return env('APP_URL') . "/_vite_/{$path}";--}}
{{--                return env('APP_URL') . "/{$path}";--}}
{{--            })--}}
{{--    }}--}}

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])

{{--    <link rel="stylesheet" href="@vite/resources/css/app.css">--}}
{{--    <script type="module" src="@vite/resources/js/app.jsx"></script>--}}

{{--    <script type="module" src="http://192.168.56.104:3000/resources/js/app.jsx"></script>--}}

{{--    <style>--}}
{{--        {!! Vite::content('resources/css/app.css') !!}--}}
{{--    </style>--}}
{{--    <script>--}}
{{--        {!! Vite::content('resources/js/app.jsx') !!}--}}
{{--    </script>--}}

{{--    <script type="module" src="/resources/js/app.jsx"></script>--}}

</head>

<body>
<div id="app"></div>
<script>
    window.Laravel = <?php echo json_encode([
        'csrfToken' => csrf_token(),
    ]); ?>
</script>
</body>

</html>
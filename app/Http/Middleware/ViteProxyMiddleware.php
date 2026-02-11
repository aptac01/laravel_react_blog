<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ViteProxyMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->is('vite/*')) {
            $response = Http::withOptions([
                'timeout' => 30,
            ])->get('http://app:3000' . $request->path());

            return response($response->body(), $response->status())
                ->withHeaders($response->headers());
        }

        return $next($request);
    }
}
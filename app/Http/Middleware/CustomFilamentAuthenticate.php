<?php

namespace App\Http\Middleware;

use Filament\Http\Middleware\Authenticate as FilamentAuthenticateBase;

class CustomFilamentAuthenticate extends FilamentAuthenticateBase
{
    /**
     * Handle an incoming request.
     */
    public function handle($request, $next)
    {
        // If user is not authenticated, redirect to login page
        if (!auth()->check()) {
            return redirect('/login');
        }

        // If user is authenticated but not an admin, deny access
        $user = auth()->user();
        if ($user->role !== 'admin') {
            abort(403, 'Unauthorized access to admin panel.');
        }

        return $next($request);
    }
}

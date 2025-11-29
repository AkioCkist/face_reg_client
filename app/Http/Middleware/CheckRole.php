<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!$request->user()) {
            return redirect()->route('login');
        }

        $userRole = $request->user()->role;

        // If user has no role set, redirect to dashboard which will handle it
        if (empty($userRole)) {
            return redirect('/dashboard');
        }

        // Check if user has the required role
        if ($userRole !== $role) {
            // Log for debugging
            \Log::warning('Role mismatch', [
                'user_id' => $request->user()->id,
                'user_role' => $userRole,
                'required_role' => $role,
            ]);

            abort(403, "Unauthorized access. Your role is '{$userRole}', but '{$role}' is required.");
        }

        return $next($request);
    }
}

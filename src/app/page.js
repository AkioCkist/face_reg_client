import Image from "next/image";
import Link from "next/link";
import { Logo } from "../components/ui";

export default function Home() {
  return (
    <div className="font-sans min-h-screen relative overflow-hidden">
      {/* Ambient Background with Gradient Orbs */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Floating gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse animate-delay-0"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse animate-delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-cyan-300/10 to-blue-300/10 rounded-full blur-2xl animate-pulse animate-delay-500"></div>
      </div>

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
        <div className={
          `w-full h-full bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] bg-repeat`
        }></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid grid-rows-[1px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-2 sm:p-20">
        <main className="flex flex-col gap-[40px] row-start-2 items-center sm:items-start">
          {/* Header Section with Enhanced Styling */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-full blur-xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                <Logo size="large" />
              </div>
            </div>

            <div className="text-center space-y-3">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent leading-tight">
                Face Recognition
                <br className="sm:hidden" />
                <span className="block sm:inline"> Attendance System</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto"></div>
            </div>
          </div>

          {/* Centered Description and Buttons */}
          <div className="flex flex-col items-center w-full">
            {/* Description with Card Styling */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/50 max-w-2xl mx-auto">
              <p className="text-lg text-gray-700 text-center leading-relaxed">
                A modern solution for classroom attendance tracking using
                <span className="font-semibold text-blue-700"> facial recognition technology</span>.
                Sign in to access your dashboard and streamline your attendance management.
              </p>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex gap-6 items-center flex-col sm:flex-row mt-8 justify-center w-full">
              <Link
                href="/login"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-base h-14 px-8 flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 w-full sm:w-auto min-w-[160px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Sign In</span>
                <svg
                  className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>

              <Link
                href="/dashboard_teacher"
                className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm text-gray-800 font-semibold text-base h-14 px-8 flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gray-500/20 border border-gray-200/50 hover:bg-white/90 w-full sm:w-auto min-w-[160px]"
              >
                <span className="relative z-10">View Dashboard</span>
                <svg
                  className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 w-full max-w-4xl">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/70 transition-colors duration-300 border border-white/50">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">AI Recognition</h3>
              <p className="text-sm text-gray-600">
                Advanced facial recognition for accurate attendance
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/70 transition-colors duration-300 border border-white/50">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Real-time Tracking
              </h3>
              <p className="text-sm text-gray-600">
                Instant attendance recording and updates
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/70 transition-colors duration-300 border border-white/50">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Smart Analytics</h3>
              <p className="text-sm text-gray-600">
                Comprehensive reports and insights
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
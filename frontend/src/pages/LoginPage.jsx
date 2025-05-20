import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen grid bg-base-100">
      {/* Form Container */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-lg space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-2xl">
              <UsersRound className="size-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-base-content">Welcome Back</h1>
            <p className="text-base-content/70 text-lg">
              Sign in to your account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="form-control">
              <label className="label pl-1.5">
                <span className="label-text font-medium text-base-content/80">
                  Email
                </span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="input input-bordered w-full pl-4 pr-4 h-12 rounded-xl border-base-content/20 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label pl-1.5">
                <span className="label-text font-medium text-base-content/80">
                  Password
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-4 pr-12 h-12 rounded-xl border-base-content/20 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-base-200 rounded-lg transition-colors z-10"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/60" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/60" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full h-12 rounded-xl text-lg font-semibold transition-all hover:scale-[0.98]"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin mr-2" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Signup Link */}
          <div className="text-center pt-6">
            <p className="text-base text-base-content/70">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="link link-primary font-semibold hover:underline underline-offset-4"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
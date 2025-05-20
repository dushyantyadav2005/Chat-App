import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, User, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.password) {
      toast.error("Please create a password");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      signup(formData);
    }
  };

  return (
    <div className="min-h-screen grid  bg-base-100">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-lg space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-2xl">
              <UsersRound className="size-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-base-content">
              Join Our Community
            </h1>
            <p className="text-base-content/70 text-lg">
              Create your account to get started
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div className="form-control">
              <label className="label pl-1.5">
                <span className="label-text font-medium text-base-content/80">
                  Full Name
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="input input-bordered w-full pl-12 pr-4 h-12 rounded-xl border-base-content/20 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  disabled={isSigningUp}
                  autoComplete="name"
                />
              </div>
            </div>

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
                  className="input input-bordered w-full pl-12 pr-4 h-12 rounded-xl border-base-content/20 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isSigningUp}
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
                  className="input input-bordered w-full pl-12 pr-12 h-12 rounded-xl border-base-content/20 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={isSigningUp}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-base-200 rounded-xl p-2 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/60" />
                  ) : (
                    <Eye className="size-5 text-base-content/60" />
                  )}
                </button>
              </div>
              <label className="label">
                <span className="label-text-alt text-base-content/50">
                  Minimum 6 characters
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full h-12 rounded-xl text-lg font-semibold transition-all hover:scale-[0.98]"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin mr-2" />
                  Creating Account...
                </>
              ) : (
                "Get Started"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center pt-6">
            <p className="text-base text-base-content/70">
              Already have an account?{" "}
              <Link
                to="/login"
                className="link link-primary font-semibold hover:underline underline-offset-4"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>

    
      </div>
   
  );
};

export default SignUpPage;
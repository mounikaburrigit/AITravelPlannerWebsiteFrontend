import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { loadUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      return toast.error("Email is required");
    }

    if (!formData.password.trim()) {
      return toast.error("Password is required");
    }

    try {
      setLoading(true);

      const res = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem(
        "token",
        res.data.token
      );

      await loadUser();

      toast.success("Welcome back!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      value: "10K+",
      label: "Trips Planned",
    },
    {
      value: "150+",
      label: "Destinations",
    },
    {
      value: "24/7",
      label: "AI Assistant",
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden p-10">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 min-h-screen items-center">
          {/* LEFT SIDE */}
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="hidden lg:block"
          >
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 mb-8">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-300 text-sm font-medium">
                  AI Powered Travel Planning
                </span>
              </div>

              <h1 className="text-6xl font-black text-white leading-tight">
                Plan Smarter.
                <br />
                Travel Better.
              </h1>

              <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                Create AI-powered itineraries,
                optimize travel budgets,
                discover destinations, and
                manage unforgettable journeys
                from one intelligent platform.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-10">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="
                      rounded-3xl
                      border
                      border-white/10
                      bg-white/5
                      backdrop-blur-xl
                      p-5
                    "
                  >
                    <h3 className="text-2xl font-bold text-white">
                      {item.value}
                    </h3>

                    <p className="text-sm text-slate-400 mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mt-10 space-y-4">
                {[
                  "AI itinerary generation",
                  "Smart budget planning",
                  "Trip sharing & PDF export",
                  "Personalized travel recommendations",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <div className="h-2 w-2 rounded-full bg-cyan-400" />

                    <span className="text-slate-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="flex justify-center"
          >
            <div
              className="
                w-full
                max-w-md
                rounded-4xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-3xl
                shadow-[0_20px_80px_rgba(0,0,0,0.45)]
                p-8
                md:p-10
              "
            >
              <div className="text-center">
                <h2 className="text-3xl font-black text-white">
                  Welcome Back
                </h2>

                <p className="text-slate-400 mt-3">
                  Access your travel dashboard
                  and continue your journey.
                </p>
              </div>

              <button
                type="button"
                className="
                  w-full
                  mt-8
                  h-14
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  hover:bg-white/10
                  transition-all
                  flex
                  items-center
                  justify-center
                  gap-3
                  text-white
                  font-medium
                "
              >
                <FaGoogle />
                Continue with Google
              </button>

              <div className="flex items-center gap-4 my-7">
                <div className="flex-1 h-px bg-white/10" />

                <span className="text-xs text-slate-500 uppercase">
                  OR
                </span>

                <div className="flex-1 h-px bg-white/10" />
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Email */}
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">
                    Email Address
                  </label>

                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="
                        w-full
                        h-14
                        pl-12
                        pr-4
                        rounded-2xl
                        bg-white/5
                        border
                        border-white/10
                        text-white
                        placeholder:text-slate-500
                        focus:outline-none
                        focus:border-cyan-400
                        focus:ring-4
                        focus:ring-cyan-400/10
                        transition-all
                      "
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">
                    Password
                  </label>

                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="
                        w-full
                        h-14
                        pl-12
                        pr-12
                        rounded-2xl
                        bg-white/5
                        border
                        border-white/10
                        text-white
                        placeholder:text-slate-500
                        focus:outline-none
                        focus:border-cyan-400
                        focus:ring-4
                        focus:ring-cyan-400/10
                        transition-all
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                        hover:text-white
                      "
                    >
                      {showPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={
                        formData.rememberMe
                      }
                      onChange={handleChange}
                    />

                    Remember me
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-cyan-300 text-sm hover:text-cyan-200"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  disabled={loading}
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    bg-linear-to-r
                    from-cyan-400
                    via-sky-400
                    to-emerald-400
                    text-slate-950
                    font-bold
                    shadow-lg
                    shadow-cyan-500/20
                  "
                >
                  {loading
                    ? "Signing In..."
                    : "Continue Journey"}
                </motion.button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-slate-400 text-sm">
                  Don't have an account?
                  <Link
                    to="/register"
                    className="ml-2 text-cyan-300 font-semibold hover:text-cyan-200"
                  >
                    Create Account
                  </Link>
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="grid grid-cols-2 gap-3 text-xs text-slate-500">
                  <div>✓ AI Itineraries</div>
                  <div>✓ Budget Planner</div>
                  <div>✓ PDF Export</div>
                  <div>✓ Trip Sharing</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
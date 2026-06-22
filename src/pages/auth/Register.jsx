import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { registerUser } from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getPasswordStrength = () => {
    const password = formData.password;

    if (password.length < 6)
      return {
        width: "25%",
        text: "Weak",
      };

    if (password.length < 10)
      return {
        width: "60%",
        text: "Medium",
      };

    return {
      width: "100%",
      text: "Strong",
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Verification email sent successfully");

      navigate("/verify-email-sent");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          w-full
          max-w-lg
          rounded-4xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-3xl
          p-8
        "
      >
        <div className="text-center">
          <h1 className="text-4xl font-black text-white">
            Create Your Travel Command Center
          </h1>

          <p className="text-slate-400 mt-4">
            Build smarter trips with AI-powered planning and personalized
            recommendations.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-8">
          {[
            "✈️ Smart Itineraries",
            "🌍 Discover Places",
            "💰 Budget Planning",
            "📄 PDF Export",
          ].map((item) => (
            <div
              key={item}
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-3
                text-sm
                text-slate-300
              "
            >
              {item}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="
            w-full
            mt-6
            h-14
            rounded-2xl
            border
            border-white/10
            bg-white/5
            text-white
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <FaGoogle />
          Continue with Google
        </button>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Full Name
            </label>

            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
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

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
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
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a secure password"
                required
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
                onClick={() => setShowPassword(!showPassword)}
                className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-slate-400
          hover:text-white
          transition
        "
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-slate-400
          hover:text-white
          transition
        "
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Password Strength */}
          <div className="space-y-2">
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                style={{
                  width: strength.width,
                }}
                className={`
          h-full
          transition-all
          duration-500
          ${
            strength.text === "Weak"
              ? "bg-red-400"
              : strength.text === "Medium"
                ? "bg-yellow-400"
                : "bg-emerald-400"
          }
        `}
              />
            </div>

            <p className="text-xs text-slate-400">
              Password Strength:
              <span className="ml-1 font-medium">{strength.text}</span>
            </p>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 text-sm text-slate-400">
            <input type="checkbox" required className="mt-1" />

            <span>I agree to the Terms of Service and Privacy Policy.</span>
          </label>

          {/* Submit */}
          <motion.button
            whileHover={{
              scale: 1.01,
            }}
            whileTap={{
              scale: 0.98,
            }}
            disabled={loading}
            type="submit"
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
      hover:shadow-cyan-500/40
      transition-all
    "
          >
            {loading ? "Creating Account..." : "Start My Journey"}
          </motion.button>
        </form>

        <div className="text-center mt-8">
          <span className="text-slate-400">Already have an account?</span>

          <Link to="/login" className="ml-2 text-cyan-300 font-semibold">
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";

import { forgotPassword } from "../../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Email is required");
    }

    try {
      setLoading(true);

      const { data } = await forgotPassword({
        email,
      });

      toast.success(
        data.message || "Reset link sent successfully"
      );

      setEmailSent(true);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden flex items-center justify-center px-4">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          relative
          z-10
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
        {/* Header */}
        <div className="text-center">
          <div
            className="
              inline-flex
              items-center
              px-4
              py-2
              rounded-full
              bg-cyan-500/10
              border
              border-cyan-500/20
              text-cyan-300
              text-sm
              font-medium
              mb-5
            "
          >
            AI Travel Planner
          </div>

          <h1 className="text-3xl font-black text-white">
            Forgot Password?
          </h1>

          <p className="mt-3 text-slate-400 leading-relaxed">
            Enter your email address and we'll send
            you a secure password reset link.
          </p>
        </div>

        {/* Success State */}
        {emailSent ? (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="
              mt-8
              rounded-3xl
              border
              border-emerald-500/20
              bg-emerald-500/10
              p-6
              text-center
            "
          >
            <div className="text-5xl mb-3">
              ✉️
            </div>

            <h3 className="text-xl font-bold text-white">
              Check Your Inbox
            </h3>

            <p className="text-slate-300 mt-2">
              We've sent a password reset link
              to:
            </p>

            <p className="text-cyan-300 mt-2 font-medium break-all">
              {email}
            </p>

            <Link
              to="/login"
              className="
                inline-flex
                items-center
                gap-2
                mt-6
                text-cyan-300
                hover:text-cyan-200
                transition
              "
            >
              <FaArrowLeft />
              Back to Login
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-white font-semibold">
                  Secure
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Reset Process
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-white font-semibold">
                  Instant
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Email Delivery
                </p>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="you@example.com"
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
                  ? "Sending Link..."
                  : "Send Reset Link"}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <Link
                to="/login"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-slate-400
                  hover:text-white
                  transition
                "
              >
                <FaArrowLeft />
                Back to Login
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
import { useState } from "react";
import {
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { resetPassword } from "../../services/authService";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
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

    if (password.length < 6) {
      return {
        width: "25%",
        text: "Weak",
        color: "bg-red-400",
      };
    }

    if (password.length < 10) {
      return {
        width: "60%",
        text: "Medium",
        color: "bg-yellow-400",
      };
    }

    return {
      width: "100%",
      text: "Strong",
      color: "bg-emerald-400",
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      return toast.error(
        "Passwords do not match"
      );
    }

    if (formData.password.length < 6) {
      return toast.error(
        "Password must be at least 6 characters"
      );
    }

    try {
      setLoading(true);

      const { data } = await resetPassword(
        token,
        {
          password: formData.password,
        }
      );

      toast.success(data.message);

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Reset password failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const strength =
    getPasswordStrength();

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden flex items-center justify-center px-4 py-10">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute bottom-16 right-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
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
          max-w-lg
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
        {success ? (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="text-center"
          >
            <FaCheckCircle className="mx-auto text-6xl text-emerald-400 mb-5" />

            <h2 className="text-3xl font-black text-white">
              Password Updated
            </h2>

            <p className="text-slate-400 mt-3">
              Your password has been
              successfully reset.
            </p>

            <p className="text-slate-500 text-sm mt-2">
              Redirecting to login...
            </p>
          </motion.div>
        ) : (
          <>
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
                Create New Password
              </h1>

              <p className="text-slate-400 mt-3">
                Choose a strong password
                to secure your account.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 mt-8"
            >
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  New Password
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
                    value={
                      formData.password
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter new password"
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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Confirm Password
                </label>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={
                      formData.confirmPassword
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Confirm password"
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
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>
                </div>
              </div>

              {/* Strength */}
              <div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    style={{
                      width:
                        strength.width,
                    }}
                    className={`h-full transition-all duration-500 ${strength.color}`}
                  />
                </div>

                <p className="text-xs text-slate-400 mt-2">
                  Password Strength:
                  <span className="ml-1 font-medium">
                    {strength.text}
                  </span>
                </p>
              </div>

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
                "
              >
                {loading
                  ? "Updating Password..."
                  : "Reset Password"}
              </motion.button>
            </form>

            <div className="text-center mt-8">
              <Link
                to="/login"
                className="
                  text-cyan-300
                  hover:text-cyan-200
                  transition
                "
              >
                Back to Login
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ResetPassword;
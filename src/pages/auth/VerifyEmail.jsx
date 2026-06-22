import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { verifyEmail } from "../../services/authService";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] =
    useState("loading");

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } =
          await verifyEmail(token);

        setStatus("success");

        setMessage(
          data.message ||
            "Email verified successfully"
        );

        toast.success(
          data.message ||
            "Email verified successfully"
        );

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        setStatus("error");

        setMessage(
          error?.response?.data?.message ||
            "Verification failed"
        );

        toast.error(
          error?.response?.data?.message ||
            "Verification failed"
        );
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden flex items-center justify-center px-4">
      {/* Background Glow */}
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
          text-center
        "
      >
        {/* Badge */}
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
            mb-6
          "
        >
          AI Travel Planner
        </div>

        {/* Loading */}
        {status === "loading" && (
          <>
            <FaSpinner className="mx-auto text-6xl text-cyan-400 animate-spin mb-6" />

            <h1 className="text-3xl font-black text-white">
              Verifying Email
            </h1>

            <p className="text-slate-400 mt-3">
              Please wait while we verify
              your email address...
            </p>
          </>
        )}

        {/* Success */}
        {status === "success" && (
          <>
            <motion.div
              initial={{
                scale: 0.8,
              }}
              animate={{
                scale: 1,
              }}
            >
              <FaCheckCircle className="mx-auto text-7xl text-emerald-400 mb-6" />
            </motion.div>

            <h1 className="text-3xl font-black text-white">
              Email Verified
            </h1>

            <p className="text-slate-400 mt-3">
              {message}
            </p>

            <p className="text-sm text-slate-500 mt-2">
              Redirecting to login...
            </p>

            <div className="mt-6 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: "100%",
                }}
                transition={{
                  duration: 3,
                }}
                className="h-full bg-emerald-400"
              />
            </div>
          </>
        )}

        {/* Error */}
        {status === "error" && (
          <>
            <FaTimesCircle className="mx-auto text-7xl text-red-400 mb-6" />

            <h1 className="text-3xl font-black text-white">
              Verification Failed
            </h1>

            <p className="text-slate-400 mt-3">
              {message}
            </p>

            <Link
              to="/login"
              className="
                inline-block
                mt-8
                px-6
                py-3
                rounded-2xl
                bg-linear-to-r
                from-cyan-400
                to-sky-400
                text-slate-950
                font-bold
              "
            >
              Back To Login
            </Link>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
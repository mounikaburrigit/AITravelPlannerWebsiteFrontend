import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelopeOpenText } from "react-icons/fa";

const VerifyEmailSent = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          w-full
          max-w-lg
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-3xl
          p-8
          text-center
        "
      >
        <FaEnvelopeOpenText className="mx-auto text-6xl text-cyan-400 mb-6" />

        <h1 className="text-4xl font-black text-white">
          Verify Your Email
        </h1>

        <p className="text-slate-400 mt-4">
          We have sent a verification link to
          your email address.
        </p>

        <p className="text-slate-500 mt-2">
          Please verify your account before
          logging in.
        </p>

        <Link
          to="/login"
          className="
            inline-flex
            mt-8
            px-6
            py-3
            rounded-2xl
            bg-cyan-400
            text-slate-950
            font-bold
          "
        >
          Back To Login
        </Link>
      </motion.div>
    </div>
  );
};

export default VerifyEmailSent;
const AuthButton = ({
  text,
  type = "submit",
  loading = false,
}) => {
  return (
    <button
      type={type}
      disabled={loading}
      className="
        w-full
        py-3
        rounded-xl
        font-semibold
        bg-linear-to-r
        from-cyan-500
        to-blue-600
        hover:scale-105
        transition-all
        duration-300
        text-white
      "
    >
      {loading ? "Please wait..." : text}
    </button>
  );
};

export default AuthButton;
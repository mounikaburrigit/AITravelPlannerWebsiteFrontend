const AuthCard = ({ children, title }) => {
  return (
    <div
      className="
        w-full
        max-w-md
        p-8
        rounded-3xl
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        shadow-2xl
      "
    >
      <h1
        className="
          text-3xl
          font-bold
          text-white
          text-center
          mb-6
        "
      >
        {title}
      </h1>

      {children}
    </div>
  );
};

export default AuthCard;
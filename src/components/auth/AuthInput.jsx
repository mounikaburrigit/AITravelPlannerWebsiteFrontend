const AuthInput = ({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        px-4
        py-3
        rounded-xl
        bg-white/10
        border
        border-white/20
        backdrop-blur-lg
        text-white
        placeholder-gray-300
        focus:outline-none
        focus:ring-2
        focus:ring-cyan-400
      "
    />
  );
};

export default AuthInput;
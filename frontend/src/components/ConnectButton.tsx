interface ConnectButtonProps {
  className?: string;
  variant?: 'default' | 'primary' | 'outline';
  size?: 'default' | 'lg';
  fullWidth?: boolean;
}

export default function ConnectButton({ 
  className = "", 
  variant = "default",
  size = "default",
  fullWidth = false
}: ConnectButtonProps) {
  const baseStyles = "transition-colors duration-200";
  
  const variantStyles = {
    default: "",
    primary: "bg-gradient-to-r from-blue-600 to-teal-400 hover:opacity-90 text-white font-medium",
    outline: "border border-gray-300 hover:border-blue-500 hover:text-blue-500"
  };
  
  const sizeStyles = {
    default: "",
    lg: "py-3 px-6 text-lg"
  };
  
  const widthStyle = fullWidth ? "w-full" : "";
  
  const buttonStyle = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`;
  
  return (
    <div className={buttonStyle}>
      <w3m-button />
    </div>
  );
}

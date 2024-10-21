interface ButtonProps {
  type: "submit" | "reset" | "button" | undefined;
  label: string;
  onClick?: () => void; 
  className?: string;
  [key: string]: any;
}

export default function Button({ type, label, onClick, className = "", ...rest }: ButtonProps) {
  return (
      <button
          className={`button ${className}`}
          type={type}
          onClick={onClick}
          {...rest}
      >
          {label}
      </button>
  );
}

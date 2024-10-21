interface InputBoxProps {
  type: string;
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  [key: string]: any;
}

export default function InputBox({
  type,
  value,
  placeholder,
  onChange,
  className = "",
  ...rest
}: InputBoxProps) {
  return (
      <input
          className={`input input-${type} ${className}`}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...rest}
      />
  );
}

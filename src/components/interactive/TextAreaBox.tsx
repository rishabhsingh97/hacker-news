interface TextAreaBoxProps {
  content: string;
  setContent: (value: string) => void;
  placeholder: string;
  className?: string;
}

export default function TextAreaBox({
  content,
  setContent,
  placeholder,
  className = "",
}: TextAreaBoxProps) {
  return (
      <textarea
          className={`textarea ${className}`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          rows={4}
          cols={50}
      />
  );
}

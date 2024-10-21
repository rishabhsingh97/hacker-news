interface TextProps {
    text: string;
    className?: string;
    [key: string]: any;
}

export function H1({ text, className = "", ...rest }: TextProps) {
    return <h1 className={`text-heading text-h1 ${className}`} {...rest}>{text}</h1>;
}

export function H2({ text, className = "", ...rest }: TextProps) {
    return <h2 className={`text-heading text-h2 ${className}`} {...rest}>{text}</h2>;
}

export function H3({ text, className = "", ...rest }: TextProps) {
    return <h3 className={`text-heading text-h3 ${className}`} {...rest}>{text}</h3>;
}

export function H4({ text, className = "", ...rest }: TextProps) {
    return <h4 className={`text-heading text-h4 ${className}`} {...rest}>{text}</h4>;
}

export function H5({ text, className = "", ...rest }: TextProps) {
    return <h5 className={`text-heading text-h5 ${className}`} {...rest}>{text}</h5>;
}

export function H6({ text, className = "", ...rest }: TextProps) {
    return <h6 className={`text-heading text-h6 ${className}`} {...rest}>{text}</h6>;
}

export function P({ text, className = "", ...rest }: TextProps) {
    return <p className={`text-heading text-p ${className}`} {...rest}>{text}</p>;
}

export function Span({ text, className = "", ...rest }: TextProps) {
    return <span className={`text-heading text-span ${className}`} {...rest}>{text}</span>;
}

export function Strong({ text, className = "", ...rest }: TextProps) {
    return <strong className={`text-heading text-strong ${className}`} {...rest}>{text}</strong>;
}

export function Em({ text, className = "", ...rest }: TextProps) {
    return <em className={`text-heading text-em ${className}`} {...rest}>{text}</em>;
}

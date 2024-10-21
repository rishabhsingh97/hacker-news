import { ReactNode, FormEvent, HTMLAttributes } from 'react';
import Button from '../interactive/Button';
import { H2 } from './textTags';
import ErrorMsg from '../ui/errorMsg';

interface DivProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

interface CardContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

interface SectionProps extends HTMLAttributes<HTMLElement> {
    title?: string;
    children: ReactNode;
    className?: string;
}

interface FormProps extends HTMLAttributes<HTMLFormElement> {
    title?: string;
    children: ReactNode;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    error: string | null;
    className?: string;
}

export function Div({ children, className = "", ...rest }: DivProps) {
    return (
        <div className={`container ${className}`} {...rest}>
            {children}
        </div>
    );
}

export function CardContainer({ children, className = "", ...rest }: CardContainerProps) {
    return (
        <div className={`card-container ${className}`} {...rest}>
            {children}
        </div>
    );
}

export function Section({ title, children, className = "", ...rest }: SectionProps) {
    return (
        <section className={`section ${className}`} {...rest}>
            {title && <H2 id="section-title" text={title} />}
            <div className="section-content">
                {children}
            </div>
        </section>
    );
}

export function Form({ title, children, onSubmit, error, className = "", ...rest }: FormProps) {
    return (
        <form className={`form ${className}`} onSubmit={onSubmit} {...rest}>
            {title && <H2 id="section-title" text={title} />}
            {children}
            <ErrorMsg error={error} />
            <Button className="button" type="submit" id="submit-button" label="Submit" />
        </form>
    );
}

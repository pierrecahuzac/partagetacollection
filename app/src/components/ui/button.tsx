import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean
}

const Button = ({ children, className, onClick, type = 'button', disabled }: ButtonProps) => {
    return (
        <button className={className} onClick={onClick} type={type} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;

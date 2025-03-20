// components/GradientButton.tsx
import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: ReactNode;
  className?: string;
}

const GradientButton = ({ 
  href, 
  children, 
  className = '',
  ...props 
}: GradientButtonProps) => {
  const baseClasses = `
    relative inline-flex items-center justify-center px-8 py-4
    font-medium text-white text-lg transition-all duration-300
    rounded-lg shadow-lg hover:shadow-xl
    bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
    hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
    transform hover:scale-105 active:scale-95
  `;
  
  const combinedClasses = `${baseClasses} ${className}`.trim();
  
  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }
  
  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default GradientButton;
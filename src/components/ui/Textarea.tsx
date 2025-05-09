import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  helperText,
  error,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const textareaBaseClasses = 'bg-gray-800 text-gray-100 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500 transition-all duration-200';
  const textareaErrorClasses = error ? 'border-red-500' : 'border-gray-700';
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`mb-4 ${widthClass}`}>
      {label && (
        <label className="block text-green-400 text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          className={`${textareaBaseClasses} ${textareaErrorClasses} py-2 px-3 w-full min-h-[100px] ${className}`}
          {...props}
        />
      </div>
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-400">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Textarea;
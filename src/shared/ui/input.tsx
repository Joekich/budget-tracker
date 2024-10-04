interface InputProps {
  placeholder: string;
  type?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const Input = ({ placeholder, type = 'text', className = '', value, onChange }: InputProps) => (
  <input type={type} placeholder={placeholder} className={className} value={value} onChange={onChange} />
);

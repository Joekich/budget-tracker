interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const Button = ({ label, onClick, className = '', disabled = false }: ButtonProps) => (
  <button type="button" disabled={disabled} className={className} onClick={onClick}>
    {label}
  </button>
);

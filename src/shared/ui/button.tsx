interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const Button = ({ label, onClick }: ButtonProps) => (
  <button type="button" style={{ padding: '10px 20px', fontSize: '16px' }} onClick={onClick}>
    {label}
  </button>
);

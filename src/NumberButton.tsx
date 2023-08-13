type NumberButtonProps = {
  number: string;
  onClick: (number: string) => void;
};

export default function NumberButton({ number, onClick }: NumberButtonProps) {
  return <button onClick={() => onClick(number)}>{number}</button>;
}

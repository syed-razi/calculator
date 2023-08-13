type ExpressionButtonProps = {
  expressionToken: string;
  onClick: (expressionToken: string) => void;
};

export default function ExpressionButton({
  expressionToken,
  onClick,
}: ExpressionButtonProps) {
  return (
    <button onClick={() => onClick(expressionToken)}>{expressionToken}</button>
  );
}

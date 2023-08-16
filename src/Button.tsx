interface ButtonProps {
  label: string;
  frontColour?: string;
  backColour?: string;
  textColour?: string;
  onClick: () => any;
}
export default function Button({
  label,
  frontColour = "bg-neutral-200",
  backColour = "bg-neutral-400",
  textColour = "text-neutral-700",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`h-2/3 w-3/4 cursor-pointer place-self-center rounded-lg border-none ${backColour} p-0 outline-offset-4`}
      onClick={onClick}
    >
      <div
        className={`mx-auto h-full w-full -translate-y-2 transform rounded-lg ${frontColour} pt-3 ${textColour} active:-translate-y-1`}
      >
        {label}
      </div>
    </button>
  );
}

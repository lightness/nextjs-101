export default function LinkButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="text-white underline cursor-pointer disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

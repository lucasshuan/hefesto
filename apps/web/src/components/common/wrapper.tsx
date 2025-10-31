export function Wrapper({ className = '', ...props }) {
  return (
    <div
      className={`mx-auto w-full max-w-[106rem] px-4 ${className}`}
      {...props}
    />
  )
}

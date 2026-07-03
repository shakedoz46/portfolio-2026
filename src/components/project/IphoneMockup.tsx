interface IphoneMockupProps {
  children: React.ReactNode
  className?: string
}

export default function IphoneMockup({ children, className = '' }: IphoneMockupProps) {
  return (
    <div className={`mx-auto w-full max-w-[240px] ${className}`}>
      <div className="rounded-[24px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_8px_rgba(0,0,0,0.04)]">
        {children}
      </div>
    </div>
  )
}

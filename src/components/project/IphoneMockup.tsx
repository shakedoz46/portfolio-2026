interface IphoneMockupProps {
  children: React.ReactNode
  className?: string
}

/** Thin iPhone-style bezel — matches iPad mockup language */
export default function IphoneMockup({ children, className = '' }: IphoneMockupProps) {
  return (
    <div className={`mx-auto w-full max-w-[240px] ${className}`}>
      <div
        className="rounded-[32px] p-[4px] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.15)]"
        style={{
          background: 'linear-gradient(145deg, #4a4a4c 0%, #2c2c2e 45%, #1d1d1f 100%)',
        }}
      >
        <div className="rounded-[28px] overflow-hidden bg-[#0a0a0a] ring-1 ring-white/[0.08]">
          <div className="p-[2px]">
            <div className="rounded-[24px] overflow-hidden bg-background scale-[0.96] origin-center">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface IpadMockupProps {
  children: React.ReactNode
  className?: string
  size?: 'full' | 'compact'
  openSide?: 'left' | 'right'
}

export default function IpadMockup({
  children,
  className = '',
  size = 'full',
  openSide,
}: IpadMockupProps) {
  const isCompact = size === 'compact'

  const radius = openSide === 'left'
    ? 'rounded-r-[24px] rounded-l-none'
    : openSide === 'right'
      ? 'rounded-l-[24px] rounded-r-none'
      : 'rounded-[24px]'

  return (
    <div className={`mx-auto w-full ${isCompact ? 'max-w-[280px]' : 'max-w-4xl'} ${className}`}>
      <div
        className={`${radius} overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_8px_rgba(0,0,0,0.04)]`}
      >
        {children}
      </div>
    </div>
  )
}

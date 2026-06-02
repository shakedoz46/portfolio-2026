interface IpadMockupProps {
  children: React.ReactNode
  className?: string
  size?: 'full' | 'compact'
  /** Same bezel as default; padding and radius omitted on the open edge only */
  openSide?: 'left' | 'right'
}

const bezelGradient = 'linear-gradient(145deg, #4a4a4c 0%, #2c2c2e 45%, #1d1d1f 100%)'

const OUTER_BEZEL_FULL = 'p-[4px]'
const OUTER_BEZEL_FULL_MD = 'p-[5px] md:p-[6px]'
const OUTER_BEZEL_OPEN_LEFT = 'pt-[4px] pr-[4px] pb-[4px] pl-0'
const OUTER_BEZEL_OPEN_LEFT_MD = 'pt-[5px] pr-[5px] pb-[5px] pl-0 md:pt-[6px] md:pr-[6px] md:pb-[6px] md:pl-0'
const OUTER_BEZEL_OPEN_RIGHT = 'pt-[4px] pl-[4px] pb-[4px] pr-0'
const OUTER_BEZEL_OPEN_RIGHT_MD = 'pt-[5px] pl-[5px] pb-[5px] pr-0 md:pt-[6px] md:pr-[6px] md:pb-[6px] md:pl-0'

const INNER_GAP = 'p-[2px]'
const INNER_GAP_OPEN_LEFT = 'pt-[2px] pr-[2px] pb-[2px] pl-0'
const INNER_GAP_OPEN_RIGHT = 'pt-[2px] pl-[2px] pb-[2px] pr-0'

/** Thin iPad-style bezel — matches across case studies */
export default function IpadMockup({
  children,
  className = '',
  size = 'full',
  openSide,
}: IpadMockupProps) {
  const isCompact = size === 'compact'
  const openLeft = openSide === 'left'
  const openRight = openSide === 'right'

  const outerBezel = openLeft
    ? isCompact
      ? OUTER_BEZEL_OPEN_LEFT
      : OUTER_BEZEL_OPEN_LEFT_MD
    : openRight
      ? isCompact
        ? OUTER_BEZEL_OPEN_RIGHT
        : OUTER_BEZEL_OPEN_RIGHT_MD
      : isCompact
        ? OUTER_BEZEL_FULL
        : OUTER_BEZEL_FULL_MD

  const outerRadius = openLeft
    ? 'rounded-r-[24px] rounded-l-none'
    : openRight
      ? 'rounded-l-[24px] rounded-r-none'
      : 'rounded-[24px]'

  const frameRadius = openLeft
    ? 'rounded-r-[19px] md:rounded-r-[20px] rounded-l-none'
    : openRight
      ? 'rounded-l-[19px] md:rounded-l-[20px] rounded-r-none'
      : 'rounded-[19px] md:rounded-[20px]'

  const screenRadius = openLeft
    ? 'rounded-r-[16px] rounded-l-none'
    : openRight
      ? 'rounded-l-[16px] rounded-r-none'
      : 'rounded-[16px]'

  const innerGap = openLeft
    ? INNER_GAP_OPEN_LEFT
    : openRight
      ? INNER_GAP_OPEN_RIGHT
      : INNER_GAP

  const scaleClass = isCompact ? 'scale-[0.94]' : 'scale-[0.965]'
  const screenScale = openLeft
    ? `${scaleClass} origin-left`
    : openRight
      ? `${scaleClass} origin-right`
      : `${scaleClass} origin-center`

  const frameRing = openLeft
    ? 'ring-1 ring-white/[0.08] ring-l-0'
    : openRight
      ? 'ring-1 ring-white/[0.08] ring-r-0'
      : 'ring-1 ring-white/[0.08]'

  return (
    <div
      className={`mx-auto w-full ${isCompact ? 'max-w-[280px]' : 'max-w-4xl'} ${className}`}
    >
      <div
        className={`${outerRadius} ${outerBezel} shadow-[0_12px_40px_-8px_rgba(0,0,0,0.15)]`}
        style={{ background: bezelGradient }}
      >
        <div className={`${frameRadius} overflow-hidden bg-[#0a0a0a] ${frameRing}`}>
          <div className={innerGap}>
            <div
              className={`${screenRadius} overflow-hidden bg-background ${screenScale}`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

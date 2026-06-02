interface TagProps {
  label: string
  color?: string
  className?: string
}

export default function Tag({ label, color = '#1A1A1A', className = '' }: TagProps) {
  return (
    <span
      className={`inline-block text-sm font-medium px-4 py-1.5 rounded-full border ${className}`}
      style={{ borderColor: color, color }}
    >
      {label}
    </span>
  )
}

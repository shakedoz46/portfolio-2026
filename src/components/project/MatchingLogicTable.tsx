const ROWS = [
  {
    category: 'Location',
    parameters: 'City, neighborhood, street',
  },
  {
    category: 'Price',
    parameters: 'Price +10% (500₪ minimum flexibility)',
  },
  {
    category: 'Rooms',
    parameters: 'Exact match / +1 room',
  },
  {
    category: 'Entry date',
    parameters: 'Exact date · Next month · 3-month range · Immediate · 1-month range',
  },
  {
    category: 'Lease duration',
    parameters: 'Short-term · Long-term · Up to 1 year',
  },
  {
    category: 'Allow pets',
    parameters: 'Yes / No / Not critical',
  },
  {
    category: 'Balcony',
    parameters: 'Yes / No / Not critical',
  },
  {
    category: 'Parking',
    parameters: 'Yes / No / Not critical',
  },
  {
    category: 'Furnished',
    parameters: 'Yes / No / Not critical',
  },
  {
    category: 'Extra amenities',
    parameters: 'Yes / No / Not critical',
  },
]

function HiddenWeight() {
  return (
    <span
      className="inline-block w-20 md:w-24 h-3 rounded-sm bg-foreground/[0.08]"
      aria-hidden
      title="Hidden"
    />
  )
}

export default function MatchingLogicTable() {
  return (
    <div className="py-8">
      <div className="overflow-x-auto rounded-xl border border-foreground/10">
        <table className="w-full min-w-[520px] text-xs md:text-sm text-left">
          <thead>
            <tr className="border-b border-foreground/10 bg-foreground/[0.03]">
              <th className="px-3 py-2.5 md:px-6 md:py-4 font-semibold text-foreground w-[28%]">
                Category
              </th>
              <th className="px-3 py-2.5 md:px-6 md:py-4 font-semibold text-foreground">
                Parameters
              </th>
              <th className="px-3 py-2.5 md:px-6 md:py-4 font-semibold text-foreground text-right w-[32%]">
                Range weights (%)
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr
                key={row.category}
                className={i < ROWS.length - 1 ? 'border-b border-foreground/10' : ''}
              >
                <td className="px-3 py-2.5 md:px-6 md:py-4 font-medium text-foreground align-top">
                  {row.category}
                </td>
                <td className="px-3 py-2.5 md:px-6 md:py-4 text-muted align-top leading-relaxed">
                  {row.parameters}
                </td>
                <td className="px-3 py-2.5 md:px-6 md:py-4 text-right align-middle">
                  <HiddenWeight />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-muted leading-relaxed">
        Specific weight values are confidential and intentionally hidden in this portfolio
        presentation.
      </p>
    </div>
  )
}

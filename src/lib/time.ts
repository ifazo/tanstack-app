export function timeAgo(iso?: string | null) {
  if (!iso) return ''
  const date = typeof iso === 'string' ? Date.parse(iso) : Number(iso)
  if (Number.isNaN(date)) return ''
  const now = Date.now()
  const seconds = Math.floor((now - date) / 1000)
  if (seconds < 5) return 'just now'
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return rtf.format(-minutes, 'minute')

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return rtf.format(-hours, 'hour')

  const days = Math.floor(hours / 24)
  if (days < 30) return rtf.format(-days, 'day')

  const months = Math.floor(days / 30)
  if (months < 12) return rtf.format(-months, 'month')

  const years = Math.floor(days / 365)
  return rtf.format(-years, 'year')
}
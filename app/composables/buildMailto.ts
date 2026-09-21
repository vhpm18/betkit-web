/**
 * Builds a mailto: link composed from structured form fields,
 * so marketing-site forms remain functional without a backend.
 */
export function buildMailto(
  to: string,
  subject: string,
  fields: Array<{ label: string, value: string }>,
) {
  const body = fields
    .map(field => `${field.label}: ${field.value}`)
    .join('\n')
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

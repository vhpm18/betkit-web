/**
 * Telegram Bot API proxy — receives form data from the frontend
 * and sends a formatted message to a Telegram chat.
 *
 * POST /api/telegram
 * Body: { formType: 'demo' | 'sellers', ...fields }
 */

import { createError, defineEventHandler, readBody } from 'h3'

interface TelegramMessage {
  formType: string
  [key: string]: unknown
}

function formatDemoMessage(data: Record<string, string>) {
  const lines: string[] = [
    '📋 *Nueva solicitud de Demo*',
    '',
    `👤 *Nombre:* ${data.name || 'N/A'}`,
    `📧 *Email:* ${data.email || 'N/A'}`,
    `📱 *WhatsApp:* ${data.countryCode || ''} ${data.whatsapp || 'N/A'}`,
    `🏢 *Tipo de operación:* ${data.operationType || 'N/A'}`,
  ]

  if (data.terminals)
    lines.push(`🖥️ *Terminales:* ${data.terminals}`)
  if (data.racetracks)
    lines.push(`🏇 *Hipódromos:* ${data.racetracks}`)
  if (data.thermal)
    lines.push(`🔥 *Térmica:* ${data.thermal}`)

  return lines.join('\n')
}

function formatSellerMessage(data: Record<string, string>) {
  const lines: string[] = [
    '🤝 *Nuevo vendedor registrado*',
    '',
    `👤 *Nombre:* ${data.name || 'N/A'}`,
    `📱 *WhatsApp:* ${data.whatsapp || 'N/A'}`,
    `🌍 *País:* ${data.country || 'N/A'}`,
    `🏢 *Agencias:* ${data.agencies || 'N/A'}`,
  ]

  if (data.experience)
    lines.push(`💼 *Experiencia:* ${data.experience}`)

  return lines.join('\n')
}

export default defineEventHandler(async (event) => {
  const body = await readBody<TelegramMessage>(event)

  if (!body?.formType) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing formType field',
    })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Telegram credentials not configured',
    })
  }

  const message
    = body.formType === 'demo'
      ? formatDemoMessage(body as Record<string, string>)
      : body.formType === 'sellers'
        ? formatSellerMessage(body as Record<string, string>)
        : null

  if (!message) {
    throw createError({
      statusCode: 400,
      statusMessage: `Unknown formType: ${body.formType}`,
    })
  }

  const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`

  const response = await fetch(telegramUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown',
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('Telegram API error:', error)
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to send Telegram message',
    })
  }

  return { success: true }
})

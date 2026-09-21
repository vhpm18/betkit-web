import { useI18n, type MessageFunction, type VueMessageType } from 'vue-i18n'

type ResolveMessageFn = (message: MessageFunction<VueMessageType> | VueMessageType) => string

/**
 * Resolve a compiled vue-i18n message (AST object from unplugin-vue-i18n) to its
 * rendered string. Plain strings pass through untouched (SSR loads messages as
 * plain JSON, client loads them pre-compiled, so both shapes must be handled).
 */
function resolveMessage(node: unknown, rt: ResolveMessageFn): unknown {
  if (typeof node === 'string') return node

  if (Array.isArray(node)) return node.map((item) => resolveMessage(item, rt))

  if (node && typeof node === 'object') {
    const isCompiledMessage = 'type' in node && 'body' in node && 'loc' in node
    // Compiled AST messages are not modeled by the `VueMessageType` union, but
    // `rt` handles them at runtime — this is the documented `tm` + `rt` flow.
    if (isCompiledMessage) return rt(node as VueMessageType)

    return Object.fromEntries(
      Object.entries(node as Record<string, unknown>).map(([key, value]) => [
        key,
        resolveMessage(value, rt),
      ]),
    )
  }

  return node
}

/**
 * Read a page-level locale message object as plain strings, regardless of
 * whether the runtime serves messages pre-compiled (client) or as raw JSON (SSR).
 *
 * Replacement for `tm(key)` + direct rendering, which leaks compiled AST objects
 * into the template when messages are compiled at build time.
 */
export function usePageMessages<T>(key: string): T {
  const { tm, rt } = useI18n()
  return resolveMessage(tm(key), rt) as T
}
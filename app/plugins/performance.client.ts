// Performance optimization plugin
// Mitigates layout thrashing by batching DOM read operations

export default defineNuxtPlugin(() => {
  // Only run on client-side
  if (process.server) return

  // Batch DOM read operations to prevent layout thrashing
  const batchDOMOperations = (() => {
    let pendingReads: (() => any)[] = []
    let pendingWrites: (() => void)[] = []
    let scheduled = false

    const schedule = () => {
      if (scheduled) return
      scheduled = true
      requestAnimationFrame(() => {
        // Execute all reads first
        pendingReads.forEach(fn => fn())
        pendingReads = []
        
        // Then writes
        pendingWrites.forEach(fn => fn())
        pendingWrites = []
        
        scheduled = false
      })
    }

    return {
      read(fn: () => any) {
        pendingReads.push(fn)
        schedule()
        return fn()
      },
      write(fn: () => void) {
        pendingWrites.push(fn)
        schedule()
        return fn()
      }
    }
  })()

  // Make batchDOMOperations available globally
  console.log('[Performance] DOM batching initialized')

  // Provide helpers
  return {
    provide: {
      batchDOMOperations,
    },
  }
})
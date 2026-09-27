/**
 * React Mastery — Custom Hooks Utility Toolkit
 * Copy-paste ready hooks for day-to-day React apps.
 */
import { useState, useEffect, useRef, useCallback, type RefObject } from 'react'

// ─── useLocalStorage ─────────────────────────────────────────────────────────
/** Persist state in localStorage so preferences survive refresh. */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error(`localStorage set failed for "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  return [storedValue, setValue] as const
}

// ─── useDebounce ─────────────────────────────────────────────────────────────
/** Delay updating a value until the source has been quiet for `delay` ms. */
export const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer) // cancel on every new keystroke
  }, [value, delay])

  return debouncedValue
}

// ─── useOnClickOutside ───────────────────────────────────────────────────────
/** Fire `handler` when a pointer event lands outside `ref`. */
export const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current
      // Ignore clicks inside the element
      if (!el || el.contains(event.target as Node)) return
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

// ─── useMediaQuery ───────────────────────────────────────────────────────────
/** Track a CSS media query from JS (e.g. '(min-width: 768px)'). */
export const useMediaQuery = (query: string): boolean => {
  const getMatch = () =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false

  const [matches, setMatches] = useState(getMatch)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

// ─── useFetch ────────────────────────────────────────────────────────────────
/** Simple data-fetch helper with loading / error states. */
export const useFetch = <T>(url: string | null) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(Boolean(url))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!url) return

    const controller = new AbortController()
    const run = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        setData((await res.json()) as T)
      } catch (err) {
        if ((err as Error).name === 'AbortError') return
        setError(err instanceof Error ? err.message : 'Request failed')
      } finally {
        setLoading(false)
      }
    }

    run()
    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}

// ─── useCounter ──────────────────────────────────────────────────────────────
export const useCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState(initialValue)
  const increment = useCallback(() => setCount((c) => c + 1), [])
  const decrement = useCallback(() => setCount((c) => c - 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  const setValue = useCallback((value: number) => setCount(value), [])
  return { count, increment, decrement, reset, setValue }
}

// ─── usePrevious ─────────────────────────────────────────────────────────────
/** Remember the previous render's value (useful for transitions / diffs). */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

// ─── useToggle ───────────────────────────────────────────────────────────────
export const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue)
  const toggle = useCallback(() => setValue((v) => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  return { value, toggle, setTrue, setFalse, setValue }
}

// ─── useCopyToClipboard ──────────────────────────────────────────────────────
/** Copy text to the clipboard; returns [copy, { copied, error }]. */
export const useCopyToClipboard = (resetMs: number = 2000) => {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setError(null)
        window.setTimeout(() => setCopied(false), resetMs)
        return true
      } catch {
        setError('Clipboard permission denied')
        setCopied(false)
        return false
      }
    },
    [resetMs]
  )

  return [copy, { copied, error }] as const
}

// ─── useInterval ─────────────────────────────────────────────────────────────
/** Declarative setInterval that respects the latest callback. */
export const useInterval = (callback: () => void, delay: number | null) => {
  const saved = useRef(callback)
  useEffect(() => {
    saved.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return
    const id = setInterval(() => saved.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

// ─── useWindowSize ───────────────────────────────────────────────────────────
export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return size
}

// ─── useKeyPress ─────────────────────────────────────────────────────────────
/** True while a specific key is held down. */
export const useKeyPress = (targetKey: string) => {
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === targetKey) setPressed(true)
    }
    const up = (e: KeyboardEvent) => {
      if (e.key === targetKey) setPressed(false)
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [targetKey])

  return pressed
}

// ─── useHover ────────────────────────────────────────────────────────────────
export const useHover = <T extends HTMLElement>(): [RefObject<T | null>, boolean] => {
  const ref = useRef<T | null>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const enter = () => setHovered(true)
    const leave = () => setHovered(false)
    node.addEventListener('mouseenter', enter)
    node.addEventListener('mouseleave', leave)
    return () => {
      node.removeEventListener('mouseenter', enter)
      node.removeEventListener('mouseleave', leave)
    }
  }, [])

  return [ref, hovered]
}

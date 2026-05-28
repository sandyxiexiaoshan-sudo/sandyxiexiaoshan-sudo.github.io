import { useEffect, useState } from 'react'

type CursorMode = 'default' | 'view'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState<CursorMode>('default')
  const [position, setPosition] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const updateEnabled = () => setEnabled(finePointer.matches)

    updateEnabled()
    finePointer.addEventListener('change', updateEnabled)

    return () => finePointer.removeEventListener('change', updateEnabled)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null
      const cursorTarget = target?.closest('[data-cursor="view"]')

      setPosition({ x: event.clientX, y: event.clientY })
      setMode(cursorTarget ? 'view' : 'default')
      setVisible(true)
    }

    const handleMouseLeave = () => setVisible(false)
    const handleMouseEnter = () => setVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      aria-hidden="true"
      className={`custom-cursor ${visible ? 'is-visible' : ''} ${mode === 'view' ? 'is-view' : ''}`}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    >
      <span>view</span>
    </div>
  )
}

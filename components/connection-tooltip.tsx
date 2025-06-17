"use client"

import type { Connection } from "@/lib/mock-data"

interface ConnectionTooltipProps {
  connection: Connection
  position: { x: number; y: number }
}

export function ConnectionTooltip({ connection, position }: ConnectionTooltipProps) {
  return (
    <div
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-xs pointer-events-none"
      style={{
        left: position.x + 10,
        top: position.y - 10,
      }}
    >
      <div className="font-semibold text-sm text-gray-900 mb-1">{connection.type}</div>
      <div className="text-xs text-gray-600">{connection.description}</div>
      {connection.strength && <div className="text-xs text-blue-600 mt-1">Strength: {connection.strength}/10</div>}
    </div>
  )
}

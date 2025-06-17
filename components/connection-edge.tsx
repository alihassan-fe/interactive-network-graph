"use client"

import type React from "react"

import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "reactflow"
import type { Connection } from "@/lib/mock-data"

interface ConnectionEdgeProps {
  id: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  data: {
    connection: Connection
    onHover: (connection: Connection, event: React.MouseEvent) => void
    onLeave: () => void
  }
}

export function ConnectionEdge({ id, sourceX, sourceY, targetX, targetY, data }: ConnectionEdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  })

  const { connection, onHover, onLeave } = data

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: "#0ea5e9",
          strokeWidth: 2,
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <div
            className="bg-white border border-sky-200 rounded px-2 py-1 text-xs font-medium text-sky-700 shadow-sm cursor-pointer hover:bg-sky-50"
            onMouseEnter={(e) => onHover(connection, e)}
            onMouseLeave={onLeave}
          >
            {connection.type}
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  )
}

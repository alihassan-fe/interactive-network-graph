"use client"

import type React from "react"
import { useCallback, useEffect, useState, useRef } from "react"

// Custom network graph implementation without ReactFlow
import { HCPNode } from "./hcp-node-custom"
import { ConnectionTooltip } from "./connection-tooltip"
import { mockHCPs, mockConnections, type HCP, type Connection } from "@/lib/mock-data"

interface NetworkGraphProps {
  selectedHCP: HCP
  onNodeSelect: (hcp: HCP) => void
  highlightedNodeId: string | null
}

interface NodePosition {
  id: string
  x: number
  y: number
  hcp: HCP
  isCenter: boolean
}

interface EdgePosition {
  id: string
  source: NodePosition
  target: NodePosition
  connection: Connection
}

export function NetworkGraph({ selectedHCP, onNodeSelect, highlightedNodeId }: NetworkGraphProps) {
  const [nodes, setNodes] = useState<NodePosition[]>([])
  const [edges, setEdges] = useState<EdgePosition[]>([])
  const [hoveredConnection, setHoveredConnection] = useState<Connection | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate network layout
  const generateLayout = useCallback(
    (centerHCP: HCP) => {
      const centerX = 400
      const centerY = 300
      const radius = 200

      // Create center node
      const centerNode: NodePosition = {
        id: centerHCP.id,
        x: centerX,
        y: centerY,
        hcp: centerHCP,
        isCenter: true,
      }

      // Get connected HCPs
      const connectedHCPIds = mockConnections
        .filter((conn) => conn.source === centerHCP.id || conn.target === centerHCP.id)
        .map((conn) => (conn.source === centerHCP.id ? conn.target : conn.source))

      const connectedHCPs = mockHCPs.filter((hcp) => connectedHCPIds.includes(hcp.id))

      // Create surrounding nodes in a circle
      const surroundingNodes: NodePosition[] = connectedHCPs.map((hcp, index) => {
        const angle = (index / connectedHCPs.length) * 2 * Math.PI
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        return {
          id: hcp.id,
          x,
          y,
          hcp,
          isCenter: false,
        }
      })

      const allNodes = [centerNode, ...surroundingNodes]

      // Create edges
      const networkEdges: EdgePosition[] = mockConnections
        .filter(
          (conn) =>
            (conn.source === centerHCP.id && connectedHCPIds.includes(conn.target)) ||
            (conn.target === centerHCP.id && connectedHCPIds.includes(conn.source)),
        )
        .map((conn) => {
          const sourceNode = allNodes.find((node) => node.id === conn.source)!
          const targetNode = allNodes.find((node) => node.id === conn.target)!

          return {
            id: conn.id,
            source: sourceNode,
            target: targetNode,
            connection: conn,
          }
        })

      return { nodes: allNodes, edges: networkEdges }
    },
    [selectedHCP],
  )

  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = generateLayout(selectedHCP)
    setNodes(newNodes)
    setEdges(newEdges)
  }, [selectedHCP, generateLayout])

  const handleConnectionHover = (connection: Connection, event: React.MouseEvent) => {
    setHoveredConnection(connection)
    setMousePosition({ x: event.clientX, y: event.clientY })
  }

  const handleConnectionLeave = () => {
    setHoveredConnection(null)
  }

  // Generate SVG path for curved connections
  const generatePath = (source: NodePosition, target: NodePosition) => {
    const dx = target.x - source.x
    const dy = target.y - source.y
    const dr = Math.sqrt(dx * dx + dy * dy)

    // Create a curved path
    const sweep = dx > 0 ? 1 : 0
    return `M ${source.x} ${source.y} A ${dr * 0.3} ${dr * 0.3} 0 0 ${sweep} ${target.x} ${target.y}`
  }

  const handleNodeMouseDown = (nodeId: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const node = nodes.find((n) => n.id === nodeId)
    if (node) {
      setDraggedNode(nodeId)
      setDragOffset({
        x: (event.clientX - rect.left) / zoom - pan.x - node.x,
        y: (event.clientY - rect.top) / zoom - pan.y - node.y,
      })
    }
  }

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (draggedNode && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const newX = (event.clientX - rect.left) / zoom - pan.x - dragOffset.x
        const newY = (event.clientY - rect.top) / zoom - pan.y - dragOffset.y

        setNodes((prevNodes) =>
          prevNodes.map((node) => {
            if (node.id === draggedNode) {
              return { ...node, x: newX, y: newY }
            }
            return node
          }),
        )

        // Update edges to reflect new node positions
        setEdges((prevEdges) =>
          prevEdges.map((edge) => ({
            ...edge,
            source: edge.source.id === draggedNode ? { ...edge.source, x: newX, y: newY } : edge.source,
            target: edge.target.id === draggedNode ? { ...edge.target, x: newX, y: newY } : edge.target,
          })),
        )
      }
    },
    [draggedNode, dragOffset, zoom, pan],
  )

  const handleMouseUp = useCallback(() => {
    setDraggedNode(null)
  }, [])

  // Zoom functions
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.2, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.2, 0.3))
  }

  const handleResetView = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  // Add global mouse event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (event: MouseEvent) => {
      if (draggedNode && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const newX = (event.clientX - rect.left) / zoom - pan.x - dragOffset.x
        const newY = (event.clientY - rect.top) / zoom - pan.y - dragOffset.y

        setNodes((prevNodes) =>
          prevNodes.map((node) => {
            if (node.id === draggedNode) {
              return { ...node, x: newX, y: newY }
            }
            return node
          }),
        )

        setEdges((prevEdges) =>
          prevEdges.map((edge) => ({
            ...edge,
            source: edge.source.id === draggedNode ? { ...edge.source, x: newX, y: newY } : edge.source,
            target: edge.target.id === draggedNode ? { ...edge.target, x: newX, y: newY } : edge.target,
          })),
        )
      }
    }

    const handleGlobalMouseUp = () => {
      setDraggedNode(null)
    }

    if (draggedNode) {
      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
      document.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [draggedNode, dragOffset, zoom, pan])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-gradient-to-br from-blue-50 to-white"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        style={{
          transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
          transformOrigin: "0 0",
        }}
        className="relative w-full h-full"
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Render edges */}
          {edges.map((edge) => {
            const midX = (edge.source.x + edge.target.x) / 2
            const midY = (edge.source.y + edge.target.y) / 2

            return (
              <g key={edge.id}>
                <path
                  d={generatePath(edge.source, edge.target)}
                  stroke="#0ea5e9"
                  strokeWidth="2"
                  fill="none"
                  className="cursor-pointer pointer-events-auto"
                  onMouseEnter={(e) => handleConnectionHover(edge.connection, e)}
                  onMouseLeave={handleConnectionLeave}
                />
                {/* Connection label */}
                <foreignObject x={midX - 40} y={midY - 12} width="80" height="24" className="pointer-events-none">
                  <div className="bg-white border border-sky-200 rounded px-2 py-1 text-xs font-medium text-sky-700 shadow-sm text-center">
                    {edge.connection.type}
                  </div>
                </foreignObject>
              </g>
            )
          })}
        </svg>

        {/* Render nodes */}
        {nodes.map((node) => (
          <HCPNode
            key={node.id}
            node={node}
            isHighlighted={highlightedNodeId === node.id}
            onSelect={onNodeSelect}
            onMouseDown={handleNodeMouseDown}
            isDragging={draggedNode === node.id}
          />
        ))}
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-white rounded-lg shadow-lg p-2 z-10">
        <button onClick={handleZoomIn} className="p-2 hover:bg-gray-100 rounded transition-colors" title="Zoom In">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
        <button onClick={handleZoomOut} className="p-2 hover:bg-gray-100 rounded transition-colors" title="Zoom Out">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
        <button
          onClick={handleResetView}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Reset View"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
          </svg>
        </button>
      </div>

      {/* Zoom indicator */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg px-3 py-1 text-sm text-gray-600">
        {Math.round(zoom * 100)}%
      </div>

      {hoveredConnection && <ConnectionTooltip connection={hoveredConnection} position={mousePosition} />}
    </div>
  )
}

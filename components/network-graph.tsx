"use client"

import type React from "react"

import { useCallback, useEffect, useState } from "react"
import ReactFlow, {
  type Node,
  type Edge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  type NodeTypes,
  type EdgeTypes,
  ConnectionMode,
} from "reactflow"
import "reactflow/dist/style.css"

import { HCPNode } from "./hcp-node"
import { ConnectionEdge } from "./connection-edge"
import { ConnectionTooltip } from "./connection-tooltip"
import { mockHCPs, mockConnections, type HCP, type Connection } from "@/lib/mock-data"

const nodeTypes: NodeTypes = {
  hcp: HCPNode,
}

const edgeTypes: EdgeTypes = {
  connection: ConnectionEdge,
}

interface NetworkGraphProps {
  selectedHCP: HCP
  onNodeSelect: (hcp: HCP) => void
  highlightedNodeId: string | null
}

export function NetworkGraph({ selectedHCP, onNodeSelect, highlightedNodeId }: NetworkGraphProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [hoveredConnection, setHoveredConnection] = useState<Connection | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Generate network layout
  const generateLayout = useCallback(
    (centerHCP: HCP) => {
      const centerX = 400
      const centerY = 300
      const radius = 200

      // Create center node
      const centerNode: Node = {
        id: centerHCP.id,
        type: "hcp",
        position: { x: centerX, y: centerY },
        data: {
          hcp: centerHCP,
          isCenter: true,
          isHighlighted: highlightedNodeId === centerHCP.id,
          onSelect: onNodeSelect,
        },
      }

      // Get connected HCPs
      const connectedHCPIds = mockConnections
        .filter((conn) => conn.source === centerHCP.id || conn.target === centerHCP.id)
        .map((conn) => (conn.source === centerHCP.id ? conn.target : conn.source))

      const connectedHCPs = mockHCPs.filter((hcp) => connectedHCPIds.includes(hcp.id))

      // Create surrounding nodes in a circle
      const surroundingNodes: Node[] = connectedHCPs.map((hcp, index) => {
        const angle = (index / connectedHCPs.length) * 2 * Math.PI
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        return {
          id: hcp.id,
          type: "hcp",
          position: { x, y },
          data: {
            hcp,
            isCenter: false,
            isHighlighted: highlightedNodeId === hcp.id,
            onSelect: onNodeSelect,
          },
        }
      })

      // Create edges
      const networkEdges: Edge[] = mockConnections
        .filter(
          (conn) =>
            (conn.source === centerHCP.id && connectedHCPIds.includes(conn.target)) ||
            (conn.target === centerHCP.id && connectedHCPIds.includes(conn.source)),
        )
        .map((conn) => ({
          id: conn.id,
          source: conn.source,
          target: conn.target,
          type: "connection",
          data: {
            connection: conn,
            onHover: (connection: Connection, event: React.MouseEvent) => {
              setHoveredConnection(connection)
              setMousePosition({ x: event.clientX, y: event.clientY })
            },
            onLeave: () => setHoveredConnection(null),
          },
        }))

      return { nodes: [centerNode, ...surroundingNodes], edges: networkEdges }
    },
    [highlightedNodeId, onNodeSelect],
  )

  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = generateLayout(selectedHCP)
    setNodes(newNodes)
    setEdges(newEdges)
  }, [selectedHCP, generateLayout])

  return (
    <div className="relative w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.5}
        maxZoom={2}
      >
        <Background color="rgba(14, 165, 233, 0.1)" />
        <Controls />
      </ReactFlow>

      {hoveredConnection && <ConnectionTooltip connection={hoveredConnection} position={mousePosition} />}
    </div>
  )
}

"use client"

import type { HCP } from "@/lib/mock-data"

interface NodePosition {
  id: string
  x: number
  y: number
  hcp: HCP
  isCenter: boolean
}

interface HCPNodeCustomProps {
  node: NodePosition
  isHighlighted: boolean
  onSelect: (hcp: HCP) => void
}

export function HCPNode({ node, isHighlighted, onSelect }: HCPNodeCustomProps) {
  const { hcp, isCenter, x, y } = node

  const handleClick = () => {
    onSelect(hcp)
  }

  return (
    <div
      className={`absolute cursor-pointer transition-all duration-200 ${
        isCenter ? "scale-125" : "hover:scale-110"
      } ${isHighlighted ? "ring-4 ring-blue-500 ring-opacity-50" : ""}`}
      style={{
        left: x - (isCenter ? 40 : 32),
        top: y - (isCenter ? 40 : 32),
        transform: "translate(-50%, -50%)",
      }}
      onClick={handleClick}
    >
      <div className={`relative ${isCenter ? "w-20 h-20" : "w-16 h-16"}`}>
        <img
          src={hcp.avatar || "/placeholder.svg"}
          alt={hcp.name}
          className={`w-full h-full rounded-full border-4 ${
            isCenter ? "border-blue-500" : "border-white"
          } shadow-lg object-cover`}
        />

        {/* Status indicator */}
        <div
          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
            hcp.isOnline ? "bg-green-500" : "bg-gray-400"
          }`}
        />
      </div>

      {/* Name label */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
        <div className={`text-xs font-medium text-gray-900 whitespace-nowrap ${isCenter ? "text-sm" : ""}`}>
          {hcp.name.split(" ")[0]}
        </div>
        <div className="text-xs text-gray-500 whitespace-nowrap">{hcp.specialty}</div>
      </div>
    </div>
  )
}

"use client"

import { Handle, Position } from "reactflow"
import type { HCP } from "@/lib/mock-data"

interface HCPNodeProps {
  data: {
    hcp: HCP
    isCenter: boolean
    isHighlighted: boolean
    onSelect: (hcp: HCP) => void
  }
}

export function HCPNode({ data }: HCPNodeProps) {
  const { hcp, isCenter, isHighlighted, onSelect } = data

  const handleClick = () => {
    onSelect(hcp)
  }

  return (
    <div
      className={`relative cursor-pointer transition-all duration-200 ${
        isCenter ? "scale-125" : "hover:scale-110"
      } ${isHighlighted ? "ring-4 ring-blue-500 ring-opacity-50" : ""}`}
      onClick={handleClick}
    >
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />

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

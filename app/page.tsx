"use client"

import { useState } from "react"
import { NetworkGraph } from "@/components/network-graph"
import { ProfileSidebar } from "@/components/profile-sidebar"
import { SearchBar } from "@/components/search-bar"
import { mockHCPs, type HCP } from "@/lib/mock-data"

export default function HomePage() {
  const [selectedHCP, setSelectedHCP] = useState<HCP>(mockHCPs[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const foundHCP = mockHCPs.find((hcp) => hcp.name.toLowerCase().includes(query.toLowerCase()))
      if (foundHCP) {
        setHighlightedNodeId(foundHCP.id)
        setSelectedHCP(foundHCP)
      }
    } else {
      setHighlightedNodeId(null)
    }
  }

  const handleNodeSelect = (hcp: HCP) => {
    setSelectedHCP(hcp)
    setHighlightedNodeId(hcp.id)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="font-semibold text-gray-900">Emily Carter</h2>
              <p className="text-sm text-gray-500">Cardiologist at BIDMC</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">My patients:</span>
              <span className="font-semibold text-blue-600">332</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Following:</span>
              <span className="font-semibold text-gray-900">124</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
              Create visit
            </button>
          </div>
        </div>
      </header>

      {/* Main Network Graph - Full Width */}
      <div className="h-96 bg-white border-b border-gray-200">
        <NetworkGraph selectedHCP={selectedHCP} onNodeSelect={handleNodeSelect} highlightedNodeId={highlightedNodeId} />
      </div>

      <div className="px-5 my-4">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Bottom Section */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">PeerSpace</h1>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ProfileSidebar selectedHCP={selectedHCP} />
          </div>
        </div>

        {/* Right Content Area - Full Height Chart */}
        <div className="flex-1 h-[100vh] relative">
          <div className="absolute inset-0 bg-gradient-to-l from-white to-sky-100"></div>
          <div className="relative z-10 h-full">
            <NetworkGraph
              selectedHCP={selectedHCP}
              onNodeSelect={handleNodeSelect}
              highlightedNodeId={highlightedNodeId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

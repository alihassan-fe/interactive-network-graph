"use client"

import type { HCP } from "@/lib/mock-data"
import { BackgroundMap } from "./background-map"

interface ProfileSidebarProps {
  selectedHCP: HCP
}

export function ProfileSidebar({ selectedHCP }: ProfileSidebarProps) {
  return (
    <div className="relative">
      {/* Background Map Cover */}
      <div className="relative h-32 mb-16">
        <BackgroundMap />
        {/* Profile Image Overlay */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <img
            src={selectedHCP.avatar || "/placeholder.svg"}
            alt={selectedHCP.name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
          />
          {/* Status indicator */}
          <div
            className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
              selectedHCP.isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        </div>
      </div>

      <div className="p-4">
        {/* Profile Header */}
        <div className="text-center mb-6">
          <h3 className="font-bold text-lg text-gray-900">{selectedHCP.name}</h3>
          <p className="text-sm text-gray-600 mb-4">{selectedHCP.title}</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 w-full">
            View Profile
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{selectedHCP.connections}</div>
            <div className="text-sm text-gray-500">Patients Served</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{selectedHCP.matchScore}%</div>
            <div className="text-sm text-gray-500">Success Rate</div>
          </div>
        </div>

        {/* About */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">About</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{selectedHCP.about}</p>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Education</h4>
          {selectedHCP.education.map((edu, index) => (
            <div key={index} className="flex gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                <div className="w-4 h-4 bg-blue-600 rounded"></div>
              </div>
              <div>
                <div className="font-medium text-sm text-gray-900">{edu.institution}</div>
                <div className="text-sm text-gray-600">{edu.degree}</div>
                <div className="text-xs text-gray-500">{edu.specialization}</div>
                <div className="text-xs text-gray-400">{edu.year}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Publications */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Recent Publications</h4>
          {selectedHCP.publications.slice(0, 3).map((pub, index) => (
            <div key={index} className="mb-3 p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-sm text-gray-900 mb-1">{pub.title}</div>
              <div className="text-xs text-gray-500">
                {pub.journal} • {pub.year}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

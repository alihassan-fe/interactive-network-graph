# Interactive Healthcare Network Graph

A custom-built React application for visualizing healthcare professional networks and relationships.

## Overview

This is a fully custom-built interactive network graph application designed specifically for healthcare professionals. The application allows users to explore connections between doctors, researchers, and other healthcare professionals through an intuitive visual interface.

## Features

### 🔍 Search & Discovery
- Real-time search functionality to find healthcare professionals
- Intelligent highlighting and centering of searched professionals
- Dynamic profile updates based on selections

### 🧠 Network Visualization
- Custom SVG-based network graph implementation
- Central node layout with connected professionals arranged in circles
- Beautiful curved connection lines with relationship labels
- Sky blue gradient background with smooth visual effects

### 🖱️ Interactive Experience
- Click any professional node to view detailed profile information
- Hover over connections to see relationship details and strength
- Smooth scaling animations and visual feedback
- Responsive design that works across all devices

### 📊 Professional Profiles
Each healthcare professional includes:
- **Education**: Institution, degree, specialization, and graduation year
- **Publications**: Recent research papers and journal publications
- **Professional Stats**: Success rate and patients served metrics
- **About**: Professional background and expertise summary

## Technical Implementation

### Custom Network Graph
- Built from scratch using HTML5 Canvas and SVG
- No external graph libraries (ReactFlow, D3, etc.)
- Custom node positioning algorithms
- Hand-crafted connection path generation

### Modern React Architecture
- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Custom hooks for state management

### Visual Design
- Professional healthcare-focused color scheme
- Smooth animations and transitions
- Responsive layout with sidebar and main content areas
- Custom background map visualization

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── network-graph.tsx     # Custom network visualization
│   ├── profile-sidebar.tsx   # Professional profile display
│   ├── hcp-node-custom.tsx   # Individual node components
│   └── ...
├── lib/                   # Utilities and data
│   ├── mock-data.ts          # Healthcare professional data
│   └── utils.ts              # Helper functions
└── public/               # Static assets
\`\`\`

## Getting Started

1. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open Application**
   Navigate to `http://localhost:3000`

## Data Structure

The application uses a custom data structure for healthcare professionals:

\`\`\`typescript
interface HCP {
  id: string
  name: string
  title: string
  specialty: string
  avatar: string
  connections: number
  successRate: number
  about: string
  isOnline: boolean
  education: Education[]
  publications: Publication[]
}
\`\`\`

## Customization

### Adding New Professionals
Update the `mockHCPs` array in `lib/mock-data.ts` with new healthcare professional data.

### Modifying Network Layout
Adjust the positioning algorithms in `components/network-graph.tsx` to change how nodes are arranged.

### Styling Changes
Update Tailwind classes throughout the components or modify the global CSS in `app/globals.css`.

## Performance

- **Optimized Rendering**: Custom implementation ensures smooth 60fps animations
- **Efficient Updates**: Only re-renders components when necessary
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

This is a custom-built application. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this code for your own healthcare network visualization projects.

---

**Built with ❤️ using custom React components and modern web technologies.**

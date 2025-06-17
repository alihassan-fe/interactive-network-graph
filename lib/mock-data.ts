export interface HCP {
  id: string
  name: string
  title: string
  specialty: string
  avatar: string
  connections: number
  matchScore: number
  about: string
  isOnline: boolean
  education: {
    institution: string
    degree: string
    specialization: string
    year: string
  }[]
  publications: {
    title: string
    journal: string
    year: string
  }[]
}

export interface Connection {
  id: string
  source: string
  target: string
  type: string
  description: string
  strength?: number
}

export const mockHCPs: HCP[] = [
  {
    id: "1",
    name: "Dr. Emily Carter",
    title: "Cardiologist at BIDMC",
    specialty: "Cardiology",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face",
    connections: 1000,
    matchScore: 95,
    about:
      "Experienced and compassionate doctor specializing in cardiology. Aliquam lectus lorem, imperdiet at amet, consectetur adipiscing elit. Aliquam lectus lorem, imperdiet at amet, consectetur adipiscing elit. Aliquam lectus lorem, imperdiet at amet, consectetur adipiscing elit. Aliquam lectus lorem, imperdiet at amet, consectetur adipiscing elit.",
    isOnline: true,
    education: [
      {
        institution: "Harvard Medical University",
        degree: "Cardiology Degree",
        specialization: "Specialization in Heart Health",
        year: "Support year 2019",
      },
    ],
    publications: [
      {
        title: "Advances in Cardiac Intervention",
        journal: "Journal of Cardiology",
        year: "2023",
      },
      {
        title: "Minimally Invasive Heart Surgery",
        journal: "Heart Surgery Today",
        year: "2022",
      },
    ],
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    title: "Cardiac Surgeon at MGH",
    specialty: "Surgery",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face",
    connections: 850,
    matchScore: 88,
    about: "Leading cardiac surgeon with expertise in complex heart procedures and minimally invasive techniques.",
    isOnline: true,
    education: [
      {
        institution: "Johns Hopkins University",
        degree: "MD in Cardiac Surgery",
        specialization: "Minimally Invasive Procedures",
        year: "2015",
      },
    ],
    publications: [
      {
        title: "Robotic Heart Surgery Outcomes",
        journal: "Surgical Innovation",
        year: "2023",
      },
    ],
  },
  {
    id: "3",
    name: "Dr. Sarah Johnson",
    title: "Interventional Cardiologist",
    specialty: "Cardiology",
    avatar: "https://images.unsplash.com/photo-1594824475317-29bb4b1c9b3d?w=80&h=80&fit=crop&crop=face",
    connections: 720,
    matchScore: 92,
    about: "Specialist in interventional cardiology with focus on catheter-based treatments.",
    isOnline: false,
    education: [
      {
        institution: "Mayo Clinic College",
        degree: "Fellowship in Interventional Cardiology",
        specialization: "Catheter Interventions",
        year: "2018",
      },
    ],
    publications: [
      {
        title: "Catheter-Based Valve Repair",
        journal: "Interventional Cardiology",
        year: "2023",
      },
    ],
  },
  {
    id: "4",
    name: "Dr. Robert Williams",
    title: "Electrophysiologist",
    specialty: "Electrophysiology",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=80&h=80&fit=crop&crop=face",
    connections: 650,
    matchScore: 85,
    about: "Expert in cardiac electrophysiology and arrhythmia management.",
    isOnline: true,
    education: [
      {
        institution: "Cleveland Clinic",
        degree: "Fellowship in Electrophysiology",
        specialization: "Arrhythmia Management",
        year: "2017",
      },
    ],
    publications: [
      {
        title: "Atrial Fibrillation Treatment",
        journal: "Heart Rhythm",
        year: "2023",
      },
    ],
  },
  {
    id: "5",
    name: "Dr. Lisa Anderson",
    title: "Pediatric Cardiologist",
    specialty: "Pediatrics",
    avatar: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=80&h=80&fit=crop&crop=face",
    connections: 580,
    matchScore: 78,
    about: "Dedicated pediatric cardiologist specializing in congenital heart defects.",
    isOnline: true,
    education: [
      {
        institution: "Boston Children's Hospital",
        degree: "Pediatric Cardiology Fellowship",
        specialization: "Congenital Heart Disease",
        year: "2019",
      },
    ],
    publications: [
      {
        title: "Congenital Heart Defect Outcomes",
        journal: "Pediatric Cardiology",
        year: "2022",
      },
    ],
  },
  {
    id: "6",
    name: "Dr. James Thompson",
    title: "Heart Failure Specialist",
    specialty: "Heart Failure",
    avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=80&h=80&fit=crop&crop=face",
    connections: 490,
    matchScore: 82,
    about: "Specialist in advanced heart failure and cardiac transplantation.",
    isOnline: false,
    education: [
      {
        institution: "Stanford University",
        degree: "Advanced Heart Failure Fellowship",
        specialization: "Cardiac Transplantation",
        year: "2016",
      },
    ],
    publications: [
      {
        title: "Heart Transplant Outcomes",
        journal: "Transplantation",
        year: "2023",
      },
    ],
  },
]

export const mockConnections: Connection[] = [
  {
    id: "c1",
    source: "1",
    target: "2",
    type: "Co-authored",
    description: "Co-authored 5 publications on cardiac intervention techniques",
    strength: 9,
  },
  {
    id: "c2",
    source: "1",
    target: "3",
    type: "Colleague",
    description: "Worked together at BIDMC for 3 years",
    strength: 8,
  },
  {
    id: "c3",
    source: "1",
    target: "4",
    type: "Research",
    description: "Collaborated on arrhythmia research project",
    strength: 7,
  },
  {
    id: "c4",
    source: "1",
    target: "5",
    type: "Mentor",
    description: "Mentored during pediatric cardiology rotation",
    strength: 6,
  },
  {
    id: "c5",
    source: "1",
    target: "6",
    type: "Conference",
    description: "Met at American Heart Association conference",
    strength: 5,
  },
  {
    id: "c6",
    source: "2",
    target: "3",
    type: "Surgery",
    description: "Performed joint cardiac procedures",
    strength: 8,
  },
]

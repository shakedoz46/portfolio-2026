export interface ProjectStatRow {
  metric: string
  traditional: string
  ours: string
}

export interface ProjectSection {
  sectionNumber?: string
  title?: string
  body?: string[]
  bullets?: string[]
  stats?: { title?: string; rows: ProjectStatRow[] }
  image?: string
  imageCaption?: string
  disclaimer?: string
}

export interface Project {
  slug: string
  tag: string
  title: string
  /** When set, renders instead of a single-line title in the project header */
  titleLines?: string[]
  subtitle: string
  year: string
  industry: string
  role: string
  client: string
  /** Shorter label for floating nav */
  navLabel?: string
  accentColor: string
  coverImage: string
  heroImage?: string
  sections: ProjectSection[]
  nextProject: string
}

export const projects: Project[] = [
  {
    slug: 'ab-testing',
    tag: 'Complex System',
    title: 'AdVary',
    subtitle: 'High-Velocity Creative Optimization with AI',
    year: '2026',
    industry: 'Marketing Agency / B2B Services',
    role: 'Lead Product Designer',
    client: 'AdVary',
    accentColor: '#26D095',
    coverImage: '/AB testing/Dashboard.png',
    sections: [
      {
        sectionNumber: '01',
        title: 'The Challenge: Overcoming Creative Fatigue in Ad Agencies',
        body: [
          'Meta advertising moves quickly, and ad creatives stop working well after a short time. This leads to creative fatigue and lower ROI. Agencies get stuck because traditional design cycles take days to make new versions, and each static ad costs $30 to $50. Running lots of A/B tests gets expensive fast. Many AI tools make things worse by creating off-brand content that takes even longer to fix than starting from scratch.',
        ],
      },
      {
        sectionNumber: '02',
        title: 'The Solution: Scaling Performance through Intelligent Augmentation',
        body: [
          'Our platform focuses on helping, not replacing, creative teams. We start with a client\'s best ad and use data to make small, smart changes. This keeps the brand consistent and makes A/B testing much faster. With Google API (Nano Banana) and custom AI agents, the system creates strong new versions in seconds. Agencies can keep up with changes without adding more design work.',
        ],
      },
    ],
    nextProject: 'michael',
  },
  {
    slug: 'michael',
    tag: 'Creator Tools',
    title: "Michael's Social",
    titleLines: ["Michael's Social"],
    subtitle: 'Empowering Creator with Business-Grade Infrastructure',
    year: '2025',
    industry: 'Creator Economy / Social Media',
    role: 'Product Designer',
    client: 'Michael Bernstein',
    navLabel: 'Michael Social',
    accentColor: '#FF6319',
    coverImage: '/Michael/michael hero section.png',
    sections: [
      {
        sectionNumber: '01',
        title: 'The Problem: The "Talent vs. Business" Gap',
        body: [
          "Michael is a top social media creator who came back from New York with amazing content, but he didn't have a good way to manage his business. His files were scattered, and he didn't have a central place to keep up with all the leads his work brought in. Someone at his level needed more than just a gallery—he needed a platform that could capture leads and help manage his business.",
        ],
      },
      {
        sectionNumber: '02',
        title: 'The Solution: A Hybrid Portfolio & CRM Engine',
        body: [
          'I created a custom platform for Michael that acts as both his showcase and his workspace. It brings together an interactive video portfolio and a strong back-end CRM. With this setup, he can show off his NYC projects in an engaging way and manage everything from new leads to scheduling and tasks, all in one place.',
        ],
      },
      {
        sectionNumber: '04',
        title: 'My Process: Engineering a Creative Workflow',
        body: [
          "I started by exploring Michael's large NYC content library to organize everything clearly. Then I built an admin dashboard just for his needs, with features like automatic calendar syncing and lead tracking. This way, Michael can focus on creating while the system takes care of the business side.",
        ],
      },
      {
        sectionNumber: '05',
        title: 'The Technical Edge: Vibe Coding with Claude',
        body: [
          'To deliver a modern design, I used Claude Design to turn my ideas into a working product. With "Vibe Coding," I guided the AI to build complex features and make sure everything looked just right. This let me be both the designer and the director, so the final product matched my vision without the usual slowdowns of manual development.',
        ],
      },
    ],
    nextProject: 'reasy',
  },
  {
    slug: 'reasy',
    tag: 'Strategic Product',
    title: 'Reasy',
    subtitle: 'Architecting Strategy for the Modern Rental Market',
    year: '2025',
    industry: 'Real Estate',
    role: 'Product Manager / Designer',
    client: 'Reasy',
    accentColor: '#0088FF',
    coverImage: '/Reasy/app mockup.png',
    sections: [
      {
        sectionNumber: '01',
        title: 'The Challenge: A Disconnected Rental Ecosystem',
        body: [
          'The rental market is often fragmented, with tenants, landlords, and brokers not always working together smoothly. Reasy aimed to bring everything into one place, but when I joined the team, the product still needed a clear way to match users and did not have tools for the business owner to manage the platform as it grew.',
        ],
      },
      {
        sectionNumber: '02',
        title: 'The Solution: Strategic Matching & Operational Control',
        body: [
          'I took on the challenge of moving the product beyond just its look and feel. I created a matching algorithm that uses important user details to make better connections. At the same time, I built an Admin Dashboard from the ground up, giving the client their first tool to manage users, listings, and transactions as they happen.',
        ],
      },
    ],
    nextProject: 'osis-hotel',
  },
  {
    slug: 'osis-hotel',
    tag: 'Operational System',
    title: 'Oasis Hotel',
    subtitle: 'Smart management for modern hotel operations',
    year: '2024',
    industry: 'Hospitality / Operations',
    role: 'UX/UI Designer',
    client: 'Oasis hotel',
    accentColor: '#3C82F5',
    coverImage: '/Osis hotel/Dashboard.png',
    sections: [],
    nextProject: 'smeets',
  },
  {
    slug: 'smeets',
    tag: 'Social Product',
    title: 'Smeets',
    subtitle: 'Building Community Through Active Motion',
    year: '2024',
    industry: 'Sports / Social / Consumer',
    role: 'Product Designer',
    client: 'Smeets',
    accentColor: '#FFC730',
    coverImage: '/smeets/smeets opening mockup.png',
    sections: [
      {
        sectionNumber: '01',
        title: 'The Challenge: The Struggle for Consistent Team Sports',
        body: [
          "Smeets started from a familiar problem: it's hard to keep up a regular sports routine without a steady group. Many people want to play more, but finding partners, matching schedules, and organizing games can get in the way. Most social apps are too general, so people usually end up playing only with close friends or not playing at all.",
        ],
      },
      {
        sectionNumber: '02',
        title: 'The Solution: A Community-First Sports Engine',
        body: [
          'Smeets aims to close this gap by making it easy to connect with others for sports—just a tap away. The app acts as a hub, linking people to games and players nearby and making organizing simple. By building an active community instead of just a booking tool, Smeets helps users stay active with real-time opportunities and easy coordination.',
        ],
      },
      {
        sectionNumber: '03',
        title: 'Research & Insights: Understanding the Inactive Majority',
        body: [
          'My research process revealed a significant gap in the market. Data showed that 91% of participants don\'t use any app to find sports activities, even though 76% reported consistent difficulty in finding partners. Furthermore, 67% expressed dissatisfaction with their weekly activity levels, yet most were stuck playing only with a small circle of friends.',
          'User interviews further refined the product direction, highlighting that for a sports app to succeed, it must prioritize Simplicity & Speed, offer Gamified Motivation, and maintain High User Activity. Users need to feel that the app is "alive" with constant opportunities, or they won\'t return.',
        ],
        image: '/smeets/Me user persona.png',
        imageCaption: 'User research persona',
      },
      {
        sectionNumber: '04',
        title: 'Core Features: Designing for Instant Action',
        body: [
          'I focused on creating an interface that minimizes the time between "opening the app" and "joining a game."',
        ],
      },
      {
        title: 'The "One Tap" Home Screen',
        body: [
          'The home screen is strategically dedicated to the next available game. This "instant-in" approach removes decision fatigue and makes it incredibly easy for users to jump into action immediately.',
        ],
        image: '/smeets/home.png',
        imageCaption: 'One-tap home screen',
      },
      {
        title: 'Advanced Team Discovery',
        body: [
          'For those looking for something specific, I designed a robust search system with multiple filters—location, sport type, and time. Each team card is optimized to show the most critical parameters at a glance, allowing for fast, informed decisions.',
        ],
        image: '/smeets/map.png',
        imageCaption: 'Map view — nearby games',
      },
      {
        image: '/smeets/search.png',
        imageCaption: 'Advanced team discovery',
      },
      {
        title: 'In-House Coordination & Community',
        body: [
          'To ensure the app feels like a community, I integrated a Built-in Chat for seamless planning and "in-house" match coordination. I also designed Group & User Profiles that showcase participation stats and achievements. Crucially, I chose to avoid displaying skill levels to keep the environment inclusive and focused on unity rather than exclusion.',
        ],
        image: '/smeets/profile.png',
        imageCaption: 'User profile',
      },
      {
        image: '/smeets/chat.png',
        imageCaption: 'In-app coordination chat',
      },
      {
        image: '/smeets/team.png',
        imageCaption: 'Team view',
      },
      {
        sectionNumber: '05',
        title: 'The Takeaway: Design as a Social Catalyst',
        body: [
          "Smeets showed that a good digital product can solve real-world problems. By focusing on speed, inclusivity, and community, I built a platform that not only manages games but also motivates people to get moving. This project reminded me how important it is to let research guide every design choice, so the final product fits users' lives.",
        ],
        disclaimer:
          'This portfolio project (Smeets) was produced for educational purposes to demonstrate UX/UI and community-driven design capabilities.',
      },
    ],
    nextProject: 'ab-testing',
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getNextProject(slug: string): Project | undefined {
  const current = getProject(slug)
  if (!current) return undefined
  return getProject(current.nextProject)
}

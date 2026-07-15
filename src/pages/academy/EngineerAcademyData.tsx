export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface AcademyModule {
  id: string;
  title: string;
  duration: string;
  description: string;
  content: {
    heading: string;
    body: string[];
    checklist?: string[];
  }[];
  quiz: QuizQuestion[];
}

export const engineerAcademyModules: AcademyModule[] = [
  {
    id: "mod_1",
    title: "Welcome to GrowBro",
    duration: "15 min",
    description: "Master GrowBro's development process, complete your certification, and become eligible for client projects.",
    content: [
      {
        heading: "Company Mission & Vision",
        body: [
          "GrowBro's mission is to empower local businesses by providing premium, scalable web presences.",
          "Our vision is a world where every business, no matter the size, has a world-class digital storefront.",
          "As a Web Engineer, you are the architect of this vision. You build the digital foundation that these businesses will grow on."
        ]
      },
      {
        heading: "Platform Structure & Responsibilities",
        body: [
          "The GrowBro Ecosystem consists of Clients, Growth Partners (Sales), and Web Engineers (You).",
          "Growth Partners secure the deals and gather requirements. You focus entirely on building premium websites.",
          "Your responsibility is to deliver pixel-perfect, highly performant websites that match the client's tier (Starter or Business)."
        ]
      },
      {
        heading: "Complete Project Lifecycle",
        body: [
          "1. Growth Partner Submits Project Requirements.",
          "2. Admin Approves and Assigns to a Verified Web Engineer.",
          "3. Engineer Builds the initial iteration (Stage 2).",
          "4. Client & Partner review and submit revision tickets (Stage 3).",
          "5. Engineer resolves tickets until approval.",
          "6. Final Handoff and Domain Linking (Stage 6)."
        ],
        checklist: [
          "Understand the 6 main stages of the GrowBro pipeline.",
          "Acknowledge the role of Growth Partners.",
          "Commit to delivering premium quality at every stage."
        ]
      }
    ],
    quiz: [
      {
        id: "q1_1",
        question: "What is your primary responsibility as a GrowBro Web Engineer?",
        options: [
          "Finding clients for GrowBro.",
          "Building pixel-perfect, high-performance websites based on requirements.",
          "Managing the domain registration process for the client.",
          "Handling all client communication directly."
        ],
        correctAnswerIndex: 1,
        explanation: "As an Engineer, your sole focus is building premium web experiences. Growth Partners handle sales and client communication."
      }
    ]
  },
  {
    id: "mod_2",
    title: "Understanding GrowBro Services",
    duration: "20 min",
    description: "Deep dive into the Starter and Business website plans.",
    content: [
      {
        heading: "Starter Website Plan",
        body: [
          "A one-page, highly optimized landing page designed for conversions.",
          "Required features: Hero section, About, Services, Testimonials, Contact Form, WhatsApp floating button.",
          "Timeline: Initial build expected within 48 hours of assignment."
        ]
      },
      {
        heading: "Business Website Plan",
        body: [
          "A multi-page website (typically 3-5 pages) for established businesses.",
          "Required features: Everything in Starter + dedicated Service/Product pages, Gallery, Google Maps integration, detailed Contact page.",
          "Timeline: Initial build expected within 72-96 hours of assignment."
        ]
      },
      {
        heading: "Scope & Best Practices",
        body: [
          "Scope is strictly defined by the project requirements ticket.",
          "Do not add complex custom backends unless explicitly requested.",
          "Best Practice: Use React/Next.js/Vite with Tailwind CSS for rapid, scalable development."
        ]
      }
    ],
    quiz: [
      {
        id: "q2_1",
        question: "What is the expected turnaround time for a Starter Website initial build?",
        options: ["24 hours", "48 hours", "1 week", "2 weeks"],
        correctAnswerIndex: 1,
        explanation: "Starter websites are one-page landing pages and should have their initial build completed within 48 hours."
      }
    ]
  },
  {
    id: "mod_3",
    title: "Premium UI & UX Standards",
    duration: "45 min",
    description: "Learn how to build Apple x Linear x Stripe inspired interfaces.",
    content: [
      {
        heading: "Design Philosophy",
        body: [
          "We follow a modern SaaS UI aesthetic: clean typography, purposeful whitespace, and subtle micro-interactions.",
          "Avoid generic templates. Every site should feel premium."
        ]
      },
      {
        heading: "Typography & Spacing",
        body: [
          "Typography: Use modern sans-serifs (Inter, Roboto, SF Pro). Maintain a strict hierarchy (H1 -> H6).",
          "Spacing: Use a consistent 4pt or 8pt grid system. Do not arbitrarily guess margins or padding."
        ]
      },
      {
        heading: "Color & Animation",
        body: [
          "Color Consistency: Stick to a primary brand color, a secondary accent, and neutral grays for text/backgrounds.",
          "Animation Principles: Animations should be purposeful, not distracting. Use subtle fade-ins, scale-ups on hover, and smooth scrolling."
        ],
        checklist: [
          "Implement Mobile First Design.",
          "Ensure high contrast for accessibility.",
          "Use subtle drop shadows (glassmorphism) for depth."
        ]
      }
    ],
    quiz: [
      {
        id: "q3_1",
        question: "Which of the following describes the GrowBro animation standard?",
        options: [
          "Fast, bouncy, and chaotic to grab attention.",
          "Subtle, purposeful, and smooth to enhance the user experience.",
          "No animations at all to maximize performance.",
          "Heavy 3D animations on every page load."
        ],
        correctAnswerIndex: 1,
        explanation: "Premium UI relies on subtle, smooth animations (like Stripe or Linear) rather than chaotic or heavy effects."
      }
    ]
  },
  {
    id: "mod_4",
    title: "Development Standards",
    duration: "30 min",
    description: "Write clean, maintainable, and highly performant code.",
    content: [
      {
        heading: "Codebase Organization",
        body: [
          "Folder Structure: Keep components, pages, hooks, and utils separated.",
          "Component Reusability: Build modular UI components (Buttons, Cards, Inputs) to ensure visual consistency."
        ]
      },
      {
        heading: "Performance & Optimization",
        body: [
          "Image Optimization: NEVER serve uncompressed 5MB images. Use WebP formats, Next/Image, or standard compression.",
          "SEO Basics: Include descriptive `<title>`, `<meta name='description'>`, and use semantic HTML (`<header>`, `<nav>`, `<main>`, `<article>`)."
        ]
      },
      {
        heading: "Deployment",
        body: [
          "All initial builds must be deployed to a staging URL (e.g., Vercel) for client review.",
          "Ensure the build is production-ready, minified, and free of console errors."
        ],
        checklist: [
          "Semantic HTML tags used appropriately.",
          "Images compressed and lazy-loaded.",
          "Console is free of warnings and errors.",
          "Lighthouse performance score > 90."
        ]
      }
    ],
    quiz: [
      {
        id: "q4_1",
        question: "How should large hero images be handled?",
        options: [
          "Upload them exactly as the client sent them (e.g., 10MB PNG).",
          "Compress them, convert to modern formats like WebP, and ensure they are appropriately sized.",
          "Remove them completely to save bandwidth.",
          "Use a tiny thumbnail and stretch it with CSS."
        ],
        correctAnswerIndex: 1,
        explanation: "Performance is key. Always compress images and use modern formats like WebP to ensure fast load times."
      }
    ]
  },
  {
    id: "mod_5",
    title: "Working With Clients",
    duration: "25 min",
    description: "Professional communication and requirement gathering.",
    content: [
      {
        heading: "Understanding Requirements",
        body: [
          "Read the project ticket thoroughly before writing a single line of code.",
          "If a requirement is ambiguous, immediately ask for clarification via the platform's support or notes system."
        ]
      },
      {
        heading: "Professional Communication",
        body: [
          "Always maintain a professional, solution-oriented tone.",
          "If a revision request is technically difficult or out of scope, explain WHY professionally and offer a viable alternative."
        ]
      },
      {
        heading: "Handling Revisions",
        body: [
          "Clients will submit correction tickets. Do not take them personally. It is part of the process.",
          "Address every point in a ticket before marking it as 'Ready For Review'."
        ]
      }
    ],
    quiz: [
      {
        id: "q5_1",
        question: "What should you do if a client's request is ambiguous?",
        options: [
          "Guess what they mean and build it.",
          "Ignore the requirement completely.",
          "Ask for clarification before proceeding to save time and prevent rework.",
          "Build three different versions for them to choose from."
        ],
        correctAnswerIndex: 2,
        explanation: "Always clarify ambiguous requirements first. Guessing leads to wasted effort and client frustration."
      }
    ]
  },
  {
    id: "mod_6",
    title: "GrowBro Verification Standards",
    duration: "20 min",
    description: "The ultimate pre-launch checklist.",
    content: [
      {
        heading: "The Final Inspection",
        body: [
          "Before submitting a build for review, you MUST pass the internal verification standards.",
          "Failure to meet these standards repeatedly will result in a drop in your internal ranking."
        ],
        checklist: [
          "Mobile Responsive (Tested on actual devices/emulators)",
          "Tablet Responsive",
          "Desktop Responsive (up to 4K)",
          "Working Buttons (No dead links, including social icons)",
          "Forms Tested (Contact forms actually send data)",
          "WhatsApp Integration (Click-to-chat works)",
          "Google Maps (Embed is visible and interactive)",
          "Image Optimization (WebP, < 200KB for non-hero images)",
          "Fast Loading (No blocking scripts)",
          "SEO Basics (Meta tags present)",
          "Grammar Check (No obvious typos in placeholder text)",
          "Browser Compatibility (Chrome, Safari, Firefox, Edge)",
          "Accessibility (Alt tags on images, sufficient contrast)",
          "Final UI Inspection (Padding/Margins are mathematically consistent)"
        ]
      }
    ],
    quiz: [
      {
        id: "q6_1",
        question: "Which of the following is NOT required on the Verification Checklist?",
        options: [
          "Mobile Responsiveness",
          "Working Contact Forms",
          "A Custom 3D WebGL Background",
          "Image Optimization"
        ],
        correctAnswerIndex: 2,
        explanation: "While 3D backgrounds can be nice, they are not a mandatory requirement. Responsiveness, working forms, and optimization are strict requirements."
      }
    ]
  },
  {
    id: "mod_7",
    title: "Revision Management",
    duration: "15 min",
    description: "How to handle Stage 3 corrections efficiently.",
    content: [
      {
        heading: "Scope of Revisions",
        body: [
          "Minor Revisions: Text changes, color swaps, image replacements, padding adjustments. (Resolve within 24 hours).",
          "Major Revisions: Layout changes, adding new sections. (Resolve within 48 hours).",
          "Scope Changes: Adding entirely new features not in the original brief. (Flag to Admin for review)."
        ]
      },
      {
        heading: "Workflow",
        body: [
          "1. Receive Ticket.",
          "2. Implement Changes.",
          "3. Push to Staging URL.",
          "4. Add Engineer Notes explaining what was fixed.",
          "5. Mark as 'Ready For Review'."
        ]
      }
    ],
    quiz: [
      {
        id: "q7_1",
        question: "How quickly should Minor Revisions be resolved?",
        options: ["1 Hour", "24 Hours", "48 Hours", "1 Week"],
        correctAnswerIndex: 1,
        explanation: "Minor revisions should be resolved within 24 hours to keep the project momentum going."
      }
    ]
  },
  {
    id: "mod_8",
    title: "Support & Bug Fixing",
    duration: "15 min",
    description: "Post-launch responsibilities.",
    content: [
      {
        heading: "Post-Launch Support",
        body: [
          "Even after Stage 9 (Handoff), critical bugs may arise.",
          "Critical Bugs (Site down, forms broken, severe layout break on mobile): Address immediately.",
          "Minor Bugs (Typo discovered later, minor alignment issue): Address within standard revision timeframes."
        ]
      },
      {
        heading: "Communication Standards",
        body: [
          "Always confirm receipt of a bug report.",
          "Provide an estimated time of resolution."
        ]
      }
    ],
    quiz: [
      {
        id: "q8_1",
        question: "What is considered a Critical Bug?",
        options: [
          "A typo in the footer.",
          "The contact form failing to submit data.",
          "A slightly misaligned image on desktop.",
          "The client wanting to change a button color."
        ],
        correctAnswerIndex: 1,
        explanation: "Broken core functionality like contact forms failing is a critical bug that directly impacts the client's business."
      }
    ]
  },
  {
    id: "mod_9",
    title: "Professional Standards",
    duration: "10 min",
    description: "The rules of engagement within the GrowBro network.",
    content: [
      {
        heading: "Confidentiality & Security",
        body: [
          "Client Data Security: Never share client assets, contact details, or business strategies outside of GrowBro.",
          "Password Management: Use secure methods for sharing any necessary credentials."
        ]
      },
      {
        heading: "Team Collaboration",
        body: [
          "Treat Growth Partners and Admins with respect.",
          "Deadline Management: If you are going to miss a deadline, communicate it early, not after the deadline has passed."
        ]
      }
    ],
    quiz: [
      {
        id: "q9_1",
        question: "If you anticipate missing a deadline, what is the professional course of action?",
        options: [
          "Wait until the client asks about it.",
          "Rush the work and submit a buggy version.",
          "Communicate the delay early to Admins/Partners and provide a new timeline.",
          "Ignore messages until the work is done."
        ],
        correctAnswerIndex: 2,
        explanation: "Proactive communication is a cornerstone of professional behavior."
      }
    ]
  },
  {
    id: "mod_10",
    title: "Become a GrowBro Verified Engineer",
    duration: "5 min",
    description: "The final step to unlocking live client projects.",
    content: [
      {
        heading: "Final Requirements",
        body: [
          "1. You must have passed all quizzes in Modules 1-9.",
          "2. You must complete the Project Simulator.",
          "3. The AI Verification system will score your simulated project.",
          "4. Upon passing, your dashboard will unlock."
        ]
      },
      {
        heading: "The GrowBro Footer Rule",
        body: [
          "MANDATORY: Every website created and delivered through GrowBro MUST automatically include the GrowBro footer.",
          "Design: Small, elegant, light gray text at the bottom. 'GrowBro®' highlighted in Neon Green (#22C55E).",
          "Link: Must open the official GrowBro website in a new tab.",
          "You can find the code snippet for this in the Download Center."
        ],
        checklist: [
          "I understand that the GrowBro footer is mandatory on all projects.",
          "I am ready to take the Project Simulator."
        ]
      }
    ],
    quiz: [
      {
        id: "q10_1",
        question: "Is the GrowBro footer optional on client websites?",
        options: [
          "Yes, if the client asks to remove it.",
          "No, it is mandatory for every website generated through the platform.",
          "It's only required for Starter plans.",
          "It's only required if I want a bonus."
        ],
        correctAnswerIndex: 1,
        explanation: "The GrowBro footer is a strict requirement for all projects delivered through the platform."
      }
    ]
  }
];

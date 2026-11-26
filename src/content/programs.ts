// ============================================================
// YGE — Programs Content
// ============================================================

import type { Program } from "@/types";

export const programs: Program[] = [
  {
    slug: "project-green-campus",
    title: "Project Green Campus",
    shortTitle: "Green Campus",
    tagline: "From school sessions to a national climate festival",
    category: "Campus",
    status: "Completed",
    date: "2026",
    location: "BRAC University and schools across Dhaka",
    coverImage: "/images/programs/green-campus.jpg",
    markerImage: "/images/stories/gg2026-winners.jpg",
    markerAlt: "Green Genesis 2026 winners on stage at BRAC University",
    markerPosition: "center",
    summary:
      "YGE's school and campus programme, built with BRAC University's C3ER and Outreach Team. It ran 3R sessions in schools, trained a network of campus ambassadors and culminated in Green Genesis 2026 (8–11 September 2026), which brought around 3,000 students from 100 institutions to BRAC University for 12 competition segments.",
    problem:
      "Bangladesh's universities produce thousands of graduates who enter society with little formal environmental literacy. Without structured programs, campuses become sites of resource overuse rather than models of sustainability.",
    response:
      "YGE partners with university clubs and student unions to run workshops, establish green committees, design campus audit tools and connect student leaders with each other and with expert mentors.",
    activities: [
      "3R waste session at Adamjee Cantonment Public School (3 May 2025)",
      "Campus ambassador session with the BRAC University Outreach Team (17 July 2026)",
      "Green Tomorrow session at Shaheed Bir Uttam Lt Anwar Girls' College (1 September 2026)",
      "Green Genesis 2026 national festival and competition (8–11 September 2026)",
    ],
    outputs: [
      "Around 3,000 students from 100 institutions at Green Genesis 2026",
      "12 competition segments and a BDT 1,83,000 prize pool",
      "Campus ambassador network across schools and colleges",
    ],
    gallery: [],
    partnerSlugs: ["brac-university-outreach"],
    relatedStorySlugs: [
      "green-genesis-2026-recap",
      "green-genesis-campus-ambassadors-2026",
      "green-tomorrow-session-2026",
      "adamjee-cantonment-3r-session",
    ],
    relatedResourceSlugs: [],
    cta: { label: "Bring YGE to Your Campus", href: "/contact#contact-form" },
  },
  {
    slug: "little-green-artists",
    title: "Little Green Artists: An Art Journey to Nature",
    shortTitle: "Little Green Artists",
    tagline: "Art, crafts and the 3Rs for the next generation",
    category: "Education",
    status: "Completed",
    date: "2025-02-17",
    location: "Nakhalpara Hossain Ali High School, Dhaka",
    coverImage: "/images/programs/little-green-artists.jpg",
    markerImage: "/images/stories/lga-photo-saplings.jpg",
    markerAlt: "Little Green Artists participants holding their saplings",
    markerPosition: "center",
    summary:
      "55 children from Classes 1–5 participated in a day-long art competition and environmental workshop, discovering the 3Rs through recycling crafts, creative art and sapling distribution.",
    problem:
      "Young children rarely encounter structured environmental education in schools. Without early engagement, the next generation may grow up disconnected from the nature they will one day inherit.",
    response:
      "YGE designed a joyful, activity-centred day with art competitions, recycling craft demonstrations and interactive 3R education, culminating in sapling distribution that children took home.",
    activities: [
      "Art competition on nature themes",
      "Recycling craft workshops",
      "Interactive 3R (Reduce, Reuse, Recycle) education",
      "Sapling distribution",
    ],
    outputs: [
      "55 children engaged from Classes 1–5",
      "Artwork created using recycled materials",
      "Saplings distributed to participants",
      "Supported by Kazi Enterprise and Kaisar Foundation",
    ],
    gallery: [],
    partnerSlugs: ["kazi-enterprise", "kaisar-foundation"],
    relatedStorySlugs: ["little-green-artists-story"],
    relatedResourceSlugs: [],
    cta: {
      label: "Read the Full Story",
      href: "/stories/little-green-artists-story",
    },
  },
  {
    slug: "plastic-awareness-1",
    title: "Plastic Awareness 1.0",
    shortTitle: "Plastic Awareness 1.0",
    tagline: "Community action against the plastic crisis",
    category: "Community",
    status: "Completed",
    date: "2025",
    location: "Dhaka, Sreemangal, Khagrachari",
    coverImage: "/images/programs/plastic-awareness.jpg",
    markerImage: "/images/programs/markers/plastic-awareness-1.webp",
    markerAlt:
      "Editorial illustration of a discarded plastic bottle disrupted by river currents",
    markerPosition: "center",
    summary:
      "A multi-location community campaign to raise awareness about plastic pollution and its effects on Bangladesh's ecosystems, rivers and coastal environments.",
    problem:
      "Single-use plastic waste is choking Bangladesh's waterways and communities. Urban and rural populations often lack accessible information about alternatives and the scale of the crisis.",
    response:
      "YGE deployed volunteer teams across three distinct locations — urban Dhaka, the tea-country hills of Sreemangal and the Chittagong Hill Tracts — to run community awareness sessions.",
    activities: [
      "Community awareness sessions",
      "Cleanup demonstrations",
      "Distribution of educational materials",
      "Documentation of local plastic pollution patterns",
    ],
    outputs: [
      "Three documented locations: Dhaka, Sreemangal, Khagrachari",
      "Community awareness sessions delivered",
      "Multi-context documentation produced",
    ],
    gallery: ["/images/programs/pa-1.jpg", "/images/programs/pa-2.jpg"],
    partnerSlugs: [],
    relatedStorySlugs: [],
    relatedResourceSlugs: [],
    cta: {
      label: "Contact YGE About Community Action",
      href: "/contact#contact-form",
    },
  },
  {
    slug: "youth-in-action-cop29",
    title: "Youth in Action: Shaping COP29 Climate Demands",
    shortTitle: "Youth in Action: COP29",
    tagline: "Bangladeshi youth voices for the global climate table",
    category: "Advocacy",
    status: "Completed",
    date: "2024",
    location: "Dhaka",
    coverImage: "/images/programs/cop29.jpg",
    markerImage: "/images/programs/markers/cop29-climate-demands.webp",
    markerAlt:
      "Editorial illustration of a handmade megaphone, a blank demand sheet and youth advocacy marks",
    markerPosition: "center",
    summary:
      "A structured advocacy exercise in which YGE youth researchers documented and articulated the climate demands of young Bangladeshis ahead of the COP29 negotiations.",
    problem:
      "Bangladesh is among the most climate-vulnerable countries on Earth, yet young Bangladeshis are rarely heard at global climate negotiations.",
    response:
      "YGE organized research sessions, structured discussions and written submissions to compile and amplify youth climate demands from a Bangladesh perspective.",
    activities: [
      "Youth research sessions on Bangladesh climate vulnerabilities",
      "Structured demand-drafting workshops",
      "Social media advocacy campaign",
      "Participation in Global Climate Strike",
    ],
    outputs: [
      "Youth climate demand document produced",
      "Participation in Global Climate Strike mobilization",
    ],
    gallery: ["/images/programs/cop29-1.jpg"],
    partnerSlugs: [],
    relatedStorySlugs: [],
    relatedResourceSlugs: [],
    cta: { label: "Add Your Voice", href: "/contact#contact-form" },
  },
  {
    slug: "future-bangladesh",
    title: "Future Bangladesh",
    shortTitle: "Future Bangladesh",
    tagline: "Imagining and building an environmentally resilient Bangladesh",
    category: "Education",
    status: "Completed",
    date: "2024",
    location: "Bangladesh",
    coverImage: "/images/programs/future-bangladesh.jpg",
    markerImage: "/images/programs/markers/future-bangladesh.webp",
    markerAlt:
      "Editorial illustration of an open book becoming a river with an emerging seedling",
    markerPosition: "center",
    summary:
      "Future Bangladesh is YGE's flagship education and vision program — developing environmental literacy resources, discussion guides and creative exercises that help young people imagine sustainable futures for their country.",
    problem:
      "Young people need both knowledge and imagination to engage seriously with environmental futures. Most educational resources do not connect local Bangladesh contexts with global climate science.",
    response:
      "YGE is developing a curriculum framework, running workshops and producing Eco Papers and educational materials tailored to Bangladesh's environmental geography and challenges.",
    activities: [
      "Environmental literacy workshops",
      "Eco Paper research and publication",
      "Future scenario facilitation",
      "Educational material design",
    ],
    outputs: [
      "Eco Paper 01 and Eco Paper 02 published",
      "Workshop curriculum in development",
    ],
    gallery: ["/images/programs/fb-1.jpg"],
    partnerSlugs: [],
    relatedStorySlugs: [],
    relatedResourceSlugs: ["eco-paper-01", "eco-paper-02"],
    cta: { label: "Download Eco Papers", href: "/resources" },
  },
  {
    slug: "natures-perspective-1",
    title: "Nature's Perspective 1.0",
    shortTitle: "Nature's Perspective",
    tagline: "Seeing Bangladesh through the lens of the wild",
    category: "Creative Media",
    status: "Completed",
    date: "2024",
    location: "Bangladesh",
    coverImage: "/images/programs/natures-perspective.jpg",
    markerImage: "/images/programs/markers/natures-perspective-1.webp",
    markerAlt:
      "Editorial illustration of a camera frame containing a leaf and river landscape",
    markerPosition: "center",
    summary:
      "A creative photography and storytelling initiative inviting YGE members to document Bangladesh's natural environments — rivers, forests, wetlands — and share them as climate stories.",
    problem:
      "Environmental photography in Bangladesh is underrepresented in youth media. Young people lack accessible platforms to tell environmental stories through visual art.",
    response:
      "YGE launched a structured photography challenge encouraging participants to document environmental change and natural beauty, framing images as climate advocacy.",
    activities: [
      "Photography brief and challenge launch",
      "Submission and community gallery",
      "Editorial selection and publication",
    ],
    outputs: [
      "Community photography gallery produced",
      "Documented imagery from multiple environments",
    ],
    gallery: ["/images/programs/np-1.jpg", "/images/programs/np-2.jpg"],
    partnerSlugs: [],
    relatedStorySlugs: [],
    relatedResourceSlugs: [],
    cta: {
      label: "Explore Creative Media",
      href: "/work?category=Creative+Media",
    },
  },
  {
    slug: "environmental-documentaries",
    title: "Environmental Documentaries",
    shortTitle: "Documentaries",
    tagline: "Telling Bangladesh's environmental stories on screen",
    category: "Creative Media",
    status: "Completed",
    date: "2024",
    location: "Bangladesh",
    coverImage: "/images/programs/documentaries.jpg",
    markerImage: "/images/programs/markers/environmental-documentaries.webp",
    markerAlt:
      "Editorial illustration of a film strip framing a Bangladesh river-delta landscape",
    markerPosition: "center",
    summary:
      "Two YGE documentary films: Echoes of Survival: The Climate Refugees of Kamlapur, and Breathing Life Back Into Bangladesh: Let's Clear the Skies Together, on Dhaka's air quality.",
    problem:
      "The visual story of Bangladesh's environmental crisis is rarely told in formats accessible to young audiences. Academic or development-sector reports fail to reach the people most affected.",
    response:
      "YGE commissioned and supported short documentary films in Bangla and English, combining compelling visuals with rigorous environmental storytelling.",
    activities: [
      "Documentary production and direction",
      "Community screening events",
      "Online distribution",
    ],
    outputs: [
      "Echoes of Survival: The Climate Refugees of Kamlapur",
      "Breathing Life Back Into Bangladesh: Let's Clear the Skies Together",
    ],
    gallery: [
      "/images/programs/doc-echoes.jpg",
      "/images/programs/doc-breathing.jpg",
    ],
    partnerSlugs: [],
    relatedStorySlugs: [],
    relatedResourceSlugs: [],
    cta: {
      label: "Watch Documentaries",
      href: "/work",
    },
  },
  {
    slug: "eco-papers",
    linkHref: "/eco-papers",
    title: "Eco Papers",
    shortTitle: "Eco Papers",
    tagline: "Open-access papers from the YGE Editorial Team",
    category: "Publications",
    status: "Completed",
    date: "2024–2025",
    location: "Bangladesh",
    coverImage: "/images/programs/eco-papers.jpg",
    markerImage: "/images/eco-papers/eco1.jpg",
    markerAlt: "Cover of Eco Paper 01, Sustainable Agriculture Practices",
    markerPosition: "center",
    summary:
      "YGE's open-access publication series, written by the YGE Editorial Team. Eco Paper 01, Sustainable Agriculture Practices (2024), and Eco Paper 02, Eco-Friendly Fashion (2025), are free to read online.",
    problem:
      "Young researchers in Bangladesh produce valuable environmental analysis that rarely reaches a public audience. Academic publication barriers and paywalls prevent knowledge from circulating.",
    response:
      "YGE publishes open-access Eco Papers that are freely downloadable, designed for readability and circulated through digital and community channels.",
    activities: [
      "Call for submissions",
      "Editorial review and design",
      "Open-access digital publication",
      "Community distribution",
    ],
    outputs: [
      "Eco Paper 01: Sustainable Agriculture Practices (2024)",
      "Eco Paper 02: Eco-Friendly Fashion (2025)",
    ],
    gallery: [],
    partnerSlugs: [],
    relatedStorySlugs: [],
    relatedResourceSlugs: ["eco-paper-01", "eco-paper-02"],
    cta: { label: "Download Eco Papers", href: "/resources" },
  },
  {
    slug: "eid-smile-2025",
    title: "Eid Smile 2025",
    shortTitle: "Eid Smile",
    tagline: "Sharing joy and environmental responsibility",
    category: "Community",
    status: "Completed",
    date: "2025",
    location: "Dhaka",
    coverImage: "/images/programs/eid-smile.jpg",
    markerImage: "/images/programs/markers/eid-smile-2025.webp",
    markerAlt:
      "Editorial illustration of a crescent, a seedling and abstract community shapes",
    markerPosition: "center",
    summary:
      "A community wellbeing initiative combining Eid celebration with environmental awareness, bringing YGE volunteers into communities to share both festive joy and environmental messages.",
    problem:
      "Community festivals often generate significant waste and resource use. YGE saw an opportunity to combine celebration with environmental messaging in a culturally resonant way.",
    response:
      "YGE volunteers organized community engagement during the Eid season, combining goodwill activities with environmental education and clean-up actions.",
    activities: [
      "Community goodwill visits",
      "Environmental awareness conversations",
      "Waste-reduction demonstrations",
    ],
    outputs: [
      "Community engagement documented",
      "Environmental messaging delivered",
    ],
    gallery: ["/images/programs/eid-1.jpg"],
    partnerSlugs: [],
    relatedStorySlugs: [],
    relatedResourceSlugs: [],
    cta: { label: "Contact YGE", href: "/contact#contact-form" },
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export function getProgramsByCategory(
  category: Program["category"],
): Program[] {
  return programs.filter((p) => p.category === category);
}

export const programCategories: Program["category"][] = [
  "Education",
  "Advocacy",
  "Community",
  "Campus",
  "Publications",
  "Creative Media",
  "Events",
];

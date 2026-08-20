// ============================================================
// YGE — Programs Content
// ============================================================

import type { Program } from '@/types';

export const programs: Program[] = [
  {
    slug: 'project-green-campus',
    title: 'Project Green Campus',
    shortTitle: 'Green Campus',
    tagline: 'Building environmental culture in universities across Bangladesh',
    category: 'Campus',
    status: 'Active',
    date: '2024',
    location: 'Multiple campuses, Bangladesh',
    coverImage: '/images/programs/green-campus.jpg',
    markerImage: '/images/programs/markers/project-green-campus.webp',
    markerAlt: 'Editorial illustration of a university building, a growing tree and student silhouettes',
    markerPosition: 'center',
    summary:
      'Project Green Campus works with university student bodies to embed environmental awareness into campus culture — from waste reduction and energy literacy to green clubs and sustainability policies.',
    problem:
      'Bangladesh\'s universities produce thousands of graduates who enter society with little formal environmental literacy. Without structured programs, campuses become sites of resource overuse rather than models of sustainability.',
    response:
      'YGE partners with university clubs and student unions to run workshops, establish green committees, design campus audit tools and connect student leaders with each other and with expert mentors.',
    activities: [
      'Environmental audit workshops',
      'Green committee establishment support',
      'Campus sustainability toolkits',
      'Inter-campus climate leadership forums',
      'Green Genesis competition hosting',
    ],
    outputs: [
      'Campus sustainability toolkits developed',
      'Green Genesis 2026 with 12 segments and BDT 1,83,000 prize pool',
    ],
    gallery: ['/images/programs/green-campus-1.jpg', '/images/programs/green-campus-2.jpg'],
    partnerSlugs: ['brac-university-outreach'],
    relatedStorySlugs: [],
    relatedResourceSlugs: [],
    cta: { label: 'Bring YGE to Your Campus', href: '/contact#contact-form' },
  },
  {
    slug: 'little-green-artists',
    title: 'Little Green Artists: An Art Journey to Nature',
    shortTitle: 'Little Green Artists',
    tagline: 'Art, crafts and the 3Rs for the next generation',
    category: 'Education',
    status: 'Completed',
    date: '2025-02-17',
    location: 'Nakhalpara Hossain Ali High School, Dhaka',
    coverImage: '/images/programs/little-green-artists.jpg',
    markerImage: '/images/programs/markers/little-green-artists.webp',
    markerAlt: 'Editorial illustration of environmental art, a river, a sun and leaves',
    markerPosition: 'center',
    summary:
      '55 children from Classes 1–5 participated in a day-long art competition and environmental workshop, discovering the 3Rs through recycling crafts, creative art and sapling distribution.',
    problem:
      'Young children rarely encounter structured environmental education in schools. Without early engagement, the next generation may grow up disconnected from the nature they will one day inherit.',
    response:
      'YGE designed a joyful, activity-centred day with art competitions, recycling craft demonstrations and interactive 3R education, culminating in sapling distribution that children took home.',
    activities: [
      'Art competition on nature themes',
      'Recycling craft workshops',
      'Interactive 3R (Reduce, Reuse, Recycle) education',
      'Sapling distribution',
    ],
    outputs: [
      '55 children engaged from Classes 1–5',
      'Artwork created using recycled materials',
      'Saplings distributed to participants',
      'Supported by Kazi Enterprise and Kaisar Foundation',
    ],
    gallery: [
      '/images/programs/lga-1.jpg',
      '/images/programs/lga-2.jpg',
      '/images/programs/lga-3.jpg',
    ],
    partnerSlugs: ['kazi-enterprise', 'kaisar-foundation'],
    relatedStorySlugs: ['little-green-artists-story'],
    relatedResourceSlugs: [],
    cta: { label: 'Read the Full Story', href: '/stories/little-green-artists-story' },
  },
  {
    slug: 'plastic-awareness-1',
    title: 'Plastic Awareness 1.0',
    shortTitle: 'Plastic Awareness 1.0',
    tagline: 'Community action against the plastic crisis',
    category: 'Community',
    status: 'Completed',
    date: '2025',
    location: 'Dhaka, Sreemangal, Khagrachari',
    coverImage: '/images/programs/plastic-awareness.jpg',
    markerImage: '/images/programs/markers/plastic-awareness-1.webp',
    markerAlt: 'Editorial illustration of a discarded plastic bottle disrupted by river currents',
    markerPosition: 'center',
    summary:
      'A multi-location community campaign to raise awareness about plastic pollution and its effects on Bangladesh\'s ecosystems, rivers and coastal environments.',
    problem:
      'Single-use plastic waste is choking Bangladesh\'s waterways and communities. Urban and rural populations often lack accessible information about alternatives and the scale of the crisis.',
    response:
      'YGE deployed volunteer teams across three distinct locations — urban Dhaka, the tea-country hills of Sreemangal and the Chittagong Hill Tracts — to run community awareness sessions.',
    activities: [
      'Community awareness sessions',
      'Cleanup demonstrations',
      'Distribution of educational materials',
      'Documentation of local plastic pollution patterns',
    ],
    outputs: [
      'Three documented locations: Dhaka, Sreemangal, Khagrachari',
      'Community awareness sessions delivered',
      'Multi-context documentation produced',
    ],
    gallery: ['/images/programs/pa-1.jpg', '/images/programs/pa-2.jpg'],
    partnerSlugs: [],
    relatedStorySlugs: [],
    relatedResourceSlugs: [],
    cta: { label: 'Contact YGE About Community Action', href: '/contact#contact-form' },
  },
  {
    slug: 'youth-in-action-cop29',
    title: 'Youth in Action: Shaping COP29 Climate Demands',
    shortTitle: 'Youth in Action: COP29',
    tagline: 'Bangladeshi youth voices for the global climate table',
    category: 'Advocacy',
    status: 'Completed',
    date: '2024',
    location: 'Dhaka',
    coverImage: '/images/programs/cop29.jpg',
    markerImage: '/images/programs/markers/cop29-climate-demands.webp',
    markerAlt: 'Editorial illustration of a handmade megaphone, a blank demand sheet and youth advocacy marks',
    markerPosition: 'center',
    summary:
      'A structured advocacy exercise in which YGE youth researchers documented and articulated the climate demands of young Bangladeshis ahead of the COP29 negotiations.',
    problem:
      'Bangladesh is among the most climate-vulnerable countries on Earth, yet young Bangladeshis are rarely heard at global climate negotiations.',
    response:
      'YGE organized research sessions, structured discussions and written submissions to compile and amplify youth climate demands from a Bangladesh perspective.',
    activities: [
      'Youth research sessions on Bangladesh climate vulnerabilities',
      'Structured demand-drafting workshops',
      'Social media advocacy campaign',
      'Participation in Global Climate Strike',
    ],
    outputs: [
      'Youth climate demand document produced',
      'Participation in Global Climate Strike mobilization',
    ],
    gallery: ['/images/programs/cop29-1.jpg'],
    partnerSlugs: [],
    relatedStorySlugs: [],
    relatedResourceSlugs: [],
    cta: { label: 'Add Your Voice', href: '/contact#contact-form' },
  },
  {
    slug: 'future-bangladesh',
    title: 'Future Bangladesh',
    shortTitle: 'Future Bangladesh',
    tagline: 'Imagining and building an environmentally resilient Bangladesh',
    category: 'Education',
    status: 'Active',
    date: '2024–present',
    location: 'Bangladesh',
    coverImage: '/images/programs/future-bangladesh.jpg',
    markerImage: '/images/programs/markers/future-bangladesh.webp',
    markerAlt: 'Editorial illustration of an open book becoming a river with an emerging seedling',
    markerPosition: 'center',
    summary:
      'Future Bangladesh is YGE\'s flagship education and vision program — developing environmental literacy resources, discussion guides and creative exercises that help young people imagine sustainable futures for their country.',
    problem:
      'Young people need both knowledge and imagination to engage seriously with environmental futures. Most educational resources do not connect local Bangladesh contexts with global climate science.',
    response:
      'YGE is developing a curriculum framework, running workshops and producing Eco Papers and educational materials tailored to Bangladesh\'s environmental geography and challenges.',
    activities: [
      'Environmental literacy workshops',
      'Eco Paper research and publication',
      'Future scenario facilitation',
      'Educational material design',
    ],
    outputs: [
      'Eco Paper 01 and Eco Paper 02 published',
      'Workshop curriculum in development',
    ],
    gallery: ['/images/programs/fb-1.jpg'],
    partnerSlugs: [],
    relatedStorySlugs: [],
    relatedResourceSlugs: ['eco-paper-01', 'eco-paper-02'],
    cta: { label: 'Download Eco Papers', href: '/resources' },
  },
  {
    slug: 'natures-perspective-1',
    title: "Nature's Perspective 1.0",
    shortTitle: "Nature's Perspective",
    tagline: 'Seeing Bangladesh through the lens of the wild',
    category: 'Creative Media',
    status: 'Completed',
    date: '2024',
    location: 'Bangladesh',
    coverImage: '/images/programs/natures-perspective.jpg',
    markerImage: '/images/programs/markers/natures-perspective-1.webp',
    markerAlt: 'Editorial illustration of a camera frame containing a leaf and river landscape',
    markerPosition: 'center',
    summary:
      'A creative photography and storytelling initiative inviting YGE members to document Bangladesh\'s natural environments — rivers, forests, wetlands — and share them as climate stories.',
    problem:
      'Environmental photography in Bangladesh is underrepresented in youth media. Young people lack accessible platforms to tell environmental stories through visual art.',
    response:
      'YGE launched a structured photography challenge encouraging participants to document environmental change and natural beauty, framing images as climate advocacy.',
    activities: [
      'Photography brief and challenge launch',
      'Submission and community gallery',
      'Editorial selection and publication',
    ],
    outputs: [
      'Community photography gallery produced',
      'Documented imagery from multiple environments',
    ],
    gallery: ['/images/programs/np-1.jpg', '/images/programs/np-2.jpg'],
    partnerSlugs: [],
    relatedStorySlugs: [],
    relatedResourceSlugs: [],
    cta: { label: 'Explore Creative Media', href: '/work?category=Creative+Media' },
  },
  {
    slug: 'environmental-documentaries',
    title: 'Environmental Documentaries',
    shortTitle: 'Documentaries',
    tagline: 'Telling Bangladesh\'s environmental stories on screen',
    category: 'Creative Media',
    status: 'Active',
    date: '2024–present',
    location: 'Bangladesh',
    coverImage: '/images/programs/documentaries.jpg',
    markerImage: '/images/programs/markers/environmental-documentaries.webp',
    markerAlt: 'Editorial illustration of a film strip framing a Bangladesh river-delta landscape',
    markerPosition: 'center',
    summary:
      'YGE has produced and supported three environmental documentary titles exploring Bangladesh\'s rivers, climate refugee communities and urban air quality — bringing these stories to youth audiences.',
    problem:
      'The visual story of Bangladesh\'s environmental crisis is rarely told in formats accessible to young audiences. Academic or development-sector reports fail to reach the people most affected.',
    response:
      'YGE commissioned and supported short documentary films in Bangla and English, combining compelling visuals with rigorous environmental storytelling.',
    activities: [
      'Documentary production and direction',
      'Community screening events',
      'Online distribution',
    ],
    outputs: [
      'Buriganga: Dying Before Our Eyes',
      'Echoes of Survival: The Climate Refugees of Kamlapur',
      'Breathing Life Back Into Bangladesh: Let\'s Clear the Skies Together',
    ],
    gallery: [
      '/images/programs/doc-buriganga.jpg',
      '/images/programs/doc-echoes.jpg',
      '/images/programs/doc-breathing.jpg',
    ],
    partnerSlugs: [],
    relatedStorySlugs: [],
    relatedResourceSlugs: [],
    cta: { label: 'Watch Documentaries', href: '/work/environmental-documentaries' },
  },
  {
    slug: 'eco-papers',
    title: 'Eco Papers',
    shortTitle: 'Eco Papers',
    tagline: 'Evidence, ideas and analysis from young environmental researchers',
    category: 'Publications',
    status: 'Active',
    date: '2024–present',
    location: 'Bangladesh',
    coverImage: '/images/programs/eco-papers.jpg',
    markerImage: '/images/programs/markers/eco-papers.webp',
    markerAlt: 'Editorial illustration of blank field papers opening into river-delta lines and a leaf',
    markerPosition: 'center',
    summary:
      'Eco Papers is YGE\'s publication series — short, accessible research papers written by young Bangladeshi researchers on pressing environmental issues.',
    problem:
      'Young researchers in Bangladesh produce valuable environmental analysis that rarely reaches a public audience. Academic publication barriers and paywalls prevent knowledge from circulating.',
    response:
      'YGE publishes open-access Eco Papers that are freely downloadable, designed for readability and circulated through digital and community channels.',
    activities: [
      'Call for submissions',
      'Editorial review and design',
      'Open-access digital publication',
      'Community distribution',
    ],
    outputs: [
      'Eco Paper 01 published',
      'Eco Paper 02 published',
      'Open-access digital distribution',
    ],
    gallery: ['/images/programs/ep-1.jpg', '/images/programs/ep-2.jpg'],
    partnerSlugs: [],
    relatedStorySlugs: [],
    relatedResourceSlugs: ['eco-paper-01', 'eco-paper-02'],
    cta: { label: 'Download Eco Papers', href: '/resources' },
  },
  {
    slug: 'eid-smile-2025',
    title: 'Eid Smile 2025',
    shortTitle: 'Eid Smile',
    tagline: 'Sharing joy and environmental responsibility',
    category: 'Community',
    status: 'Completed',
    date: '2025',
    location: 'Dhaka',
    coverImage: '/images/programs/eid-smile.jpg',
    markerImage: '/images/programs/markers/eid-smile-2025.webp',
    markerAlt: 'Editorial illustration of a crescent, a seedling and abstract community shapes',
    markerPosition: 'center',
    summary:
      'A community wellbeing initiative combining Eid celebration with environmental awareness, bringing YGE volunteers into communities to share both festive joy and environmental messages.',
    problem:
      'Community festivals often generate significant waste and resource use. YGE saw an opportunity to combine celebration with environmental messaging in a culturally resonant way.',
    response:
      'YGE volunteers organized community engagement during the Eid season, combining goodwill activities with environmental education and clean-up actions.',
    activities: [
      'Community goodwill visits',
      'Environmental awareness conversations',
      'Waste-reduction demonstrations',
    ],
    outputs: ['Community engagement documented', 'Environmental messaging delivered'],
    gallery: ['/images/programs/eid-1.jpg'],
    partnerSlugs: [],
    relatedStorySlugs: [],
    relatedResourceSlugs: [],
    cta: { label: 'Contact YGE', href: '/contact#contact-form' },
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export function getProgramsByCategory(category: Program['category']): Program[] {
  return programs.filter((p) => p.category === category);
}

export const programCategories: Program['category'][] = [
  'Education',
  'Advocacy',
  'Community',
  'Campus',
  'Publications',
  'Creative Media',
  'Events',
];

export type TimelineItem = {
  period: string;
  title: string;
  description: string;
  requiresVerification?: boolean;
};

export type AboutValue = {
  number: string;
  title: string;
  description: string;
  color: 'paper' | 'coral' | 'cobalt' | 'violet';
  illustration: 'book' | 'people' | 'camera' | 'megaphone' | 'leaf';
};

export type AboutPurposeSection = {
  title: string;
  body: string;
};

export type AboutPurposeContent = {
  label: string;
  title?: string;
  sections: AboutPurposeSection[];
};

export type AboutTheme = {
  number: string;
  title: string;
  summary: string;
  fullDescription?: string;
  color: 'paper' | 'coral' | 'cobalt' | 'violet';
  icon: 'awareness' | 'crisis' | 'action' | 'future';
  requiresVerification?: boolean;
};

export const aboutMissionStatement =
  'To equip young people across Bangladesh to understand environmental challenges, raise their voices and turn climate awareness into practical action.';

export const aboutVisionStatement =
  'A Bangladesh where every young person is informed, empowered and actively involved in building an environmentally just future.';

export const aboutMission: AboutPurposeContent = {
  label: 'Our mission',
  title: 'Mission for the Earth',
  sections: [
    {
      title: 'Raising Awareness of Climate & Geographical Changes',
      body: 'Our primary mission is to elevate public awareness about the urgent climate and geographical changes threatening our planet. Earth, the only home we have ever known, is the bedrock of all human existence. As human civilization has flourished and developed in harmony with the Earth, it is our shared duty to protect it from harmful changes that jeopardize its future. The interconnectedness between human actions and the planet’s well-being is undeniable, and humanity must take responsibility for the detrimental transformations that are reshaping our world.',
    },
    {
      title: 'Understanding the Impact of Climate Crises',
      body: 'The alarming rise in climate-related crises—ranging from intense weather events to rising sea levels and biodiversity loss—underscores the need for immediate and unified action. These changes do not just threaten ecosystems; they pose a direct risk to human life, health, and security. Geography itself is shifting under the strain of human impact, with once-thriving landscapes turning barren and fertile lands giving way to desertification.',
    },
    {
      title: "Youth for a Green Earth's Role",
      body: 'Youth for a Green Earth stands at the forefront of this movement, striving to rally individuals, especially the younger generation, in the fight against these pressing challenges. We are committed to fostering a sense of ownership and urgency in people’s hearts, inspiring them to act decisively. Through education, innovation, and collaboration, we aim to equip communities with the tools and knowledge they need to combat climate and geographical changes effectively.',
    },
    {
      title: 'Terra-Offspring: A Call to Action',
      body: "We see ourselves as the ‘Terra-offspring,’ born from the Earth and indebted to it for all that we have. As stewards of this planet, we must lead by example, uniting people under the common goal of restoring balance to the environment. Together, we can spark a global movement that not only addresses the root causes of environmental degradation but also nurtures a sustainable future for generations to come.",
    },
  ],
};

export const aboutVision: AboutPurposeContent = {
  label: 'Our vision',
  sections: [
    {
      title: 'Empowering Youth for a Sustainable Future',
      body: 'Youth for a Green Earth aspires toward a world where each human being, particularly the young, assumes the responsibility of securing a sustainable and greener future. Our aim is ecological restoration to ensure a future whereby humanity lives in harmony with nature. By creating one global network of youthful change-makers, we aim at inspiring one united movement—the solution to environmental adversities faced by our world today.',
    },
    {
      title: 'Transforming Awareness into Action',
      body: 'Knowledge is power, but we also know that awareness is just the first step; action must be induced. As a youth-led organization, we facilitate the next generation leading from the front in combative climate change, biodiversity, and pro-sustainable practices. We offer education, innovation, and collaboration to provide resources and opportunities to transform knowledge into impactful solutions.',
    },
    {
      title: 'Leading the Way to a Greener Tomorrow',
      body: 'Youth for a Green Earth was founded out of concern for the environment, with the determination to inspire real and tangible change. We work in unison toward a world where communities engage in safeguarding the Earth and conserving its resources for future generations. Our motto being “Transforming Awareness into Action,” we try to lead a global movement for environmental sustainability by making every effort count toward a healthy and green tomorrow.',
    },
  ],
};

export const aboutThemes: AboutTheme[] = [
  {
    number: '01',
    title: 'Raising Awareness',
    summary: 'We make environmental and geographical challenges understandable, relevant and visible to young people and their communities.',
    fullDescription: aboutMission.sections[0].body,
    color: 'paper',
    icon: 'awareness',
  },
  {
    number: '02',
    title: 'Understanding the Crisis',
    summary: 'We help young people understand how climate change affects ecosystems, health, security, livelihoods and Bangladesh’s changing landscapes.',
    fullDescription: aboutMission.sections[1].body,
    color: 'coral',
    icon: 'crisis',
  },
  {
    number: '03',
    title: 'Turning Knowledge into Action',
    summary: 'We connect education with practical opportunities for youth-led advocacy, collaboration, innovation and community action.',
    fullDescription: aboutVision.sections[1].body,
    color: 'cobalt',
    icon: 'action',
  },
  {
    number: '04',
    title: 'Building a Greener Tomorrow',
    summary: 'We encourage young people to participate in protecting ecosystems, conserving resources and creating environmentally responsible communities.',
    fullDescription: aboutVision.sections[2].body,
    color: 'violet',
    icon: 'future',
  },
];

export const verifiedAboutThemes = aboutThemes.filter((theme) => !theme.requiresVerification);

export const aboutTimeline: TimelineItem[] = [
  { period: '2024', title: 'YGE established', description: 'Youth for a Green Earth begins its work in Bangladesh.' },
  { period: '2024', title: 'Youth climate advocacy', description: 'Youth perspectives are organized around COP29 climate demands.' },
  { period: '2024', title: 'Creative climate work', description: 'Photography and documentary programs bring environmental stories into view.' },
  { period: '2025', title: 'Education in action', description: 'Little Green Artists connects nature, art and the 3Rs in Dhaka.' },
  { period: '2026', title: 'Building forward', description: 'Green Genesis brings youth climate learning and competition together.' },
];

export const aboutValues: AboutValue[] = [
  { number: '01', title: 'Educate', description: 'We make environmental knowledge accessible, relevant and actionable for young people.', color: 'paper', illustration: 'book' },
  { number: '02', title: 'Organize', description: 'We create youth-led networks and spaces where environmental voices can connect.', color: 'coral', illustration: 'people' },
  { number: '03', title: 'Create', description: 'We use art, film, publishing and storytelling to turn climate knowledge into public conversation.', color: 'paper', illustration: 'camera' },
  { number: '04', title: 'Advocate', description: 'We bring youth perspectives into climate discussions and public action.', color: 'cobalt', illustration: 'megaphone' },
  { number: '05', title: 'Act', description: 'We turn awareness into practical community and campus initiatives.', color: 'violet', illustration: 'leaf' },
];

export const verifiedAboutTimeline = aboutTimeline.filter((item) => !item.requiresVerification);

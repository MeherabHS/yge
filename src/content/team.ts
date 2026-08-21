export type TeamDepartmentId =
  | "leadership"
  | "events-programs"
  | "communications"
  | "creative-technology"
  | "partnerships-outreach"
  | "administration";

export interface TeamDepartment {
  id: TeamDepartmentId;
  name: string;
  shortName?: string;
  number: string;
  accent: string;
  description?: string;
  order: number;
}

export interface TeamMember {
  id: string;
  name: string | null;
  role: string;
  department: TeamDepartmentId;
  /** Complete public path. PNG, JPG, JPEG and WebP files are supported. */
  photo: string | null;
  photoAlt?: string;
  photoPosition?: string;
  initials?: string;
  bio?: string;
  social?: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
  featured?: boolean;
  vacant?: boolean;
  visible?: boolean;
  order: number;
  /** Editorial-only flag. Never render this value in the interface. */
  requiresVerification: boolean;
}

export const teamDepartments: TeamDepartment[] = [
  {
    id: "leadership",
    name: "Leadership",
    number: "01",
    accent: "#B8FF2C",
    order: 1,
  },
  {
    id: "events-programs",
    name: "Events & Programs",
    number: "02",
    accent: "#00CFA8",
    order: 2,
  },
  {
    id: "communications",
    name: "Communications, PR & Marketing",
    shortName: "Communications",
    number: "03",
    accent: "#315FFF",
    order: 3,
  },
  {
    id: "creative-technology",
    name: "IT, Graphics & Creative Content",
    shortName: "Creative & Technology",
    number: "04",
    accent: "#8B62F6",
    order: 4,
  },
  {
    id: "partnerships-outreach",
    name: "Partnerships & Outreach",
    number: "05",
    accent: "#FF5B55",
    order: 5,
  },
  {
    id: "administration",
    name: "Administration, HR & Logistics",
    shortName: "Administration",
    number: "06",
    accent: "#B8FF2C",
    order: 6,
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "arnob",
    name: "N.M.H PATWARY ARNOB",
    role: "CEO & Founder",
    department: "leadership",
    photo: null,
    photoAlt: "N.M.H Patwary Arnob, CEO and Founder of Youth for a Green Earth",
    photoPosition: "center 25%",
    featured: true,
    visible: true,
    vacant: false,
    order: 1,
    requiresVerification: true,
  },
  {
    id: "nihal",
    name: "SAMSAD ARABI NIHAL",
    role: "COO & Founder",
    department: "leadership",
    photo: null,
    photoAlt: "Samsad Arabi Nihal, COO and Founder of Youth for a Green Earth",
    photoPosition: "center 25%",
    featured: true,
    visible: true,
    vacant: false,
    order: 2,
    requiresVerification: true,
  },
  {
    id: "sami",
    name: "KHANDAKER SIFAT SAMI",
    role: "CDO",
    department: "leadership",
    photo: null,
    photoAlt: "Khandaker Sifat Sami, CDO of Youth for a Green Earth",
    photoPosition: "center 25%",
    featured: true,
    visible: true,
    vacant: false,
    order: 3,
    requiresVerification: true,
  },
  {
    id: "nazif",
    name: "NAZIF AHMED",
    role: "Director of Programs",
    department: "events-programs",
    photo: null,
    visible: true,
    vacant: false,
    order: 2,
    requiresVerification: true,
  },
  {
    id: "ahnaf",
    name: "MAHIDUL ISLAM AHNAF",
    role: "Associate Director of Programs",
    department: "events-programs",
    photo: null,
    visible: true,
    vacant: false,
    order: 3,
    requiresVerification: true,
  },
  {
    id: "mejba",
    name: "SHAHRIAR MEJBA",
    role: "Director of Communications & Public Relations",
    department: "communications",
    photo: null,
    visible: true,
    vacant: false,
    order: 1,
    requiresVerification: true,
  },
  {
    id: "ramisha",
    name: "RAMISHA KARIM",
    role: "Associate Director of Communications & Public Relations",
    department: "communications",
    photo: null,
    visible: true,
    vacant: false,
    order: 2,
    requiresVerification: true,
  },
  {
    id: "ritika",
    name: "RITIKA SREEJITA SINGHA",
    role: "Director of Marketing & Media",
    department: "communications",
    photo: null,
    visible: true,
    vacant: false,
    order: 3,
    requiresVerification: true,
  },
  {
    id: "rajin",
    name: "RAKIBUL HASAN RAJIN",
    role: "Associate Director of Marketing & Media",
    department: "communications",
    photo: null,
    visible: true,
    vacant: false,
    order: 4,
    requiresVerification: true,
  },
  {
    id: "tashkir",
    name: "MOHAMMAD SHAHRIYAR TASHKIR",
    role: "Director of IT",
    department: "creative-technology",
    photo: null,
    visible: true,
    vacant: false,
    order: 1,
    requiresVerification: true,
  },
  {
    id: "digital-creative-director",
    name: null,
    role: "Director of Digital & Creative Content",
    department: "creative-technology",
    photo: null,
    visible: true,
    vacant: false,
    order: 2,
    requiresVerification: true,
  },
  {
    id: "mahi",
    name: "SADIT AREFIN MAHI",
    role: "Associate Director of Digital & Creative Content",
    department: "creative-technology",
    photo: null,
    visible: true,
    vacant: false,
    order: 3,
    requiresVerification: true,
  },
  {
    id: "niel",
    name: "FAIYAZ ARABI NIEL",
    role: "Director of Graphics",
    department: "creative-technology",
    photo: null,
    visible: true,
    vacant: false,
    order: 4,
    requiresVerification: true,
  },
  {
    id: "tamim",
    name: "MD. ISMAIL HOSSEN TAMIM",
    role: "Director of Multimedia",
    department: "creative-technology",
    photo: null,
    visible: true,
    vacant: false,
    order: 5,
    requiresVerification: true,
  },
  {
    id: "strategic-partnerships-director",
    name: null,
    role: "Director of Strategic Partnerships & External Outreach",
    department: "partnerships-outreach",
    photo: null,
    visible: true,
    vacant: false,
    order: 1,
    requiresVerification: true,
  },
  {
    id: "strategic-partnerships-associate-director",
    name: null,
    role: "Associate Director of Strategic Partnerships & External Outreach",
    department: "partnerships-outreach",
    photo: null,
    visible: true,
    vacant: false,
    order: 2,
    requiresVerification: true,
  },
  {
    id: "ahir",
    name: "ISTIAK KHAN AHIR",
    role: "Director of Administration & Operations",
    department: "administration",
    photo: null,
    visible: true,
    vacant: false,
    order: 1,
    requiresVerification: true,
  },
  {
    id: "tahmid",
    name: "TAHMID AHMED",
    role: "Director of Human Resources",
    department: "administration",
    photo: null,
    visible: true,
    vacant: false,
    order: 2,
    requiresVerification: true,
  },
  {
    id: "abid",
    name: "MASRIN HASAN ABID",
    role: "Director of Logistics",
    department: "administration",
    photo: null,
    visible: true,
    vacant: false,
    order: 3,
    requiresVerification: true,
  },
];

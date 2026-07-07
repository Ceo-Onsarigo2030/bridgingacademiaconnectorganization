export interface Department {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  themes: string[];
  philosophy: string;
  hasProjects?: boolean;
}

export const DEPARTMENTS: Department[] = [
  {
    slug: "gender-empowerment",
    title: "Gender Empowerment and Social Inclusion",
    tagline: "Safe Environments. Safe Communities. Safe Nation.",
    summary:
      "This department carries the everyday work of protecting dignity. It runs community campaigns against Gender-Based Violence and sexual harassment, challenges harmful stereotypes and cultural practices, and pushes for the inclusion of Persons with Disabilities in every space B.A Connect touches. Where silence has protected harm in the past, this department chooses to speak, educate, and organize communities to stand differently.",
    themes: [
      "Community awareness campaigns against Gender-Based Violence and sexual harassment",
      "Advocacy against harmful cultural practices, including FGM and early or forced marriage",
      "Disability inclusion and accessibility advocacy across schools and public institutions",
      "Support and referral pathways connecting survivors to legal and psychosocial help",
      "School and campus based safe space programs for girls and young women",
      "Engagement with local leaders and policy actors on gender and inclusion issues",
    ],
    philosophy:
      "Safe Environments. Safe Communities. Safe Nation. This department believes that safety is not a favor extended to some, it is a right owed to everyone. A nation cannot call itself developed while its women, girls, and persons with disabilities live in fear or exclusion, so this department treats every campaign as an investment in a safer Kenya.",
    hasProjects: true,
  },
  {
    slug: "mental-health",
    title: "Mental Health Awareness and Wellness",
    tagline: "Strong Minds. Strong Communities. Strong Nation.",
    summary:
      "This department leads community campaigns for mental health awareness across schools, universities, churches, and neighborhoods, and works with official psychologists who offer free, pro bono sessions to clients navigating anxiety, depression, and other mental health challenges. It exists so that no young person has to face their hardest days without someone willing to listen.",
    themes: [
      "Mental health awareness campaigns in schools, universities, and faith communities",
      "Free, pro bono counselling sessions with licensed psychologists",
      "Academic stress, burnout, and exam pressure support programs",
      "Suicide prevention education and safe referral pathways",
      "Support circles addressing anxiety, depression, and identity related struggles",
      "Training community gatekeepers, teachers, and parents to recognize warning signs",
    ],
    philosophy:
      "Strong Minds. Strong Communities. Strong Nation. This department is built on the understanding that a community is only as strong as the mental wellbeing of its people. Before any young person can lead, innovate, or serve others, they need a mind that is cared for and a community willing to walk with them through hard seasons.",
    hasProjects: true,
  },
  {
    slug: "research-innovation",
    title: "Research, Innovation, Partnership & External Affairs",
    tagline: "Crafting Excellence. Delivering Professionalism.",
    summary:
      "This department offers academic and professional support to youths and professionals alike. For students and job seekers, it helps craft CVs, cover letters, resumes, and insurance cover documentation. For professionals and institutions, it supports the drafting of proposals, speeches, thesis work, and research documentation, while also managing B.A Connect's external partnerships.",
    themes: [
      "Professional document support, including CVs, cover letters, and resumes",
      "Guidance on insurance cover documentation and related paperwork",
      "Proposal, thesis, and academic research writing support",
      "Speech writing and public communication support for leaders and institutions",
      "Partnership building with universities, companies, and development partners",
      "Research on youth employment, education, and social issues to guide B.A Connect's programs",
    ],
    philosophy:
      "Crafting Excellence. Delivering Professionalism. This department exists because opportunity often hides behind a poorly written document or a proposal that never found the right partner. By perfecting the paperwork and building the partnerships, it clears the path so that talent and hard work are what finally get noticed.",
  },
  {
    slug: "theatre-films-arts",
    title: "Theatre, Films and Art",
    tagline: "See. Enjoy. Change Communities.",
    summary:
      "Known internally as Pulse Casters, this department integrates with the Gender Empowerment and Mental Health Awareness departments to produce educative content, films, and short videos on critical thematic areas. Through storytelling, such as films addressing sexual harassment, it teaches communities how to recognize harm and stand against it in a language that is easy to watch, feel, and remember.",
    themes: [
      "Scriptwriting and production of short educative films on social issues",
      "Theatre performances that dramatize real community challenges and solutions",
      "Content collaboration with the Gender Empowerment and Mental Health departments",
      "Digital storytelling for social media and community screenings",
      "Talent development for young actors, filmmakers, and creatives",
      "Community screening events followed by open dialogue sessions",
    ],
    philosophy:
      "See. Enjoy. Change Communities. This department believes that people remember a story long after they forget a lecture. By turning hard conversations, like ending sexual harassment or breaking mental health stigma, into films and theatre people actually want to watch, it makes education feel like entertainment and change feel possible.",
  },
];

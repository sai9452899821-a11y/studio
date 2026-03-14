#!/usr/bin/env node
/**
 * VCS Pro Seed — works 3 ways:
 *
 *  1. Pass args:    node seed/seed.js YOUR_PROJECT_ID YOUR_TOKEN
 *  2. Environment:  SANITY_PROJECT_ID=x SANITY_TOKEN=y node seed/seed.js
 *  3. Docker exec:  docker exec -it vcspro_studio node seed/seed.js PROJECT_ID TOKEN
 */

// Load .env manually (no dotenv dependency needed)
try {
  const { createRequire } = await import('module');
  const req = createRequire(import.meta.url);
  const fs  = req('fs'), path = req('path');
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const i = t.indexOf('=');
      if (i < 0) continue;
      const k = t.slice(0, i).trim();
      const v = t.slice(i + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[k]) process.env[k] = v;
    }
  }
} catch (_) {}

const PROJECT_ID = process.argv[2] || process.env.SANITY_PROJECT_ID;
const TOKEN      = process.argv[3] || process.env.SANITY_TOKEN;
const DATASET    = process.env.SANITY_DATASET || 'production';

console.log('\n🌱  VCS Pro Seed Script');
console.log('════════════════════════════════════════\n');

if (!PROJECT_ID || !TOKEN) {
  console.error('❌  Missing credentials!\n');
  console.error('    Usage: node seed/seed.js YOUR_PROJECT_ID YOUR_TOKEN\n');
  console.error('    Get Project ID: https://sanity.io/manage');
  console.error('    Get Token:      https://sanity.io/manage → API → Tokens → Add (Editor role)\n');
  process.exit(1);
}

console.log(`📡  Project: ${PROJECT_ID}`);
console.log(`🗄️   Dataset: ${DATASET}`);
console.log(`🔑  Token:   ${TOKEN.slice(0, 8)}...\n`);

const { createClient } = await import('@sanity/client');
const client = createClient({ projectId: PROJECT_ID, dataset: DATASET, apiVersion: '2024-01-01', token: TOKEN, useCdn: false });

// Test connection
try {
  await client.fetch('*[_type == "settings"][0]._id');
  console.log('✅  Connected to Sanity\n');
} catch (e) {
  console.error(`❌  Connection failed: ${e.message}\n`);
  console.error('    Check your Project ID and Token are correct.');
  console.error('    Also ensure CORS is set at sanity.io/manage → API → CORS Origins\n');
  process.exit(1);
}

let _k = 1000;
const uid = () => `k${(_k++).toString(36)}`;
const blk = (text, style = 'normal') => ({ _type: 'block', _key: uid(), style, markDefs: [], children: [{ _type: 'span', _key: uid(), text, marks: [] }] });
const hero    = o => ({ _type: 'heroBlock',         _key: uid(), ...o });
const grid    = o => ({ _type: 'serviceGridBlock',  _key: uid(), ...o });
const ai      = o => ({ _type: 'aiAutomationBlock', _key: uid(), ...o });
const tech    = o => ({ _type: 'techMatrixBlock',   _key: uid(), ...o });

const DOCS = [

// ─── GLOBAL SETTINGS ────────────────────────────────────────────────────────
{ _id: 'settings', _type: 'settings',
  siteTitle: 'VCS Pro | Virupaksha Consulting Services',
  header: {
    navItems: [
      { _key: uid(), title: 'Workday Solutions', href: '/workday-solutions', subItems: [
          { _key: uid(), title: 'HCM & People Strategy',      href: '/workday-solutions', description: 'Talent, Onboarding & Performance',  pillar: 'workday' },
          { _key: uid(), title: 'Financial Intelligence',      href: '/workday-solutions', description: 'AP, AR, GL & Strategic Spend',       pillar: 'workday' },
          { _key: uid(), title: 'Integration Cloud',           href: '/workday-solutions', description: 'Studio, EIB & REST/SOAP APIs',       pillar: 'workday' },
          { _key: uid(), title: 'Reporting & Prism Analytics', href: '/workday-solutions', description: 'Dashboards & 360° Business View',    pillar: 'workday' },
      ]},
      { _key: uid(), title: 'Web & AI', href: '/web-development', subItems: [
          { _key: uid(), title: 'Mobile App Development', href: '/web-development', description: 'React Native & Flutter',           pillar: 'webdev' },
          { _key: uid(), title: 'Enterprise Web Apps',    href: '/web-development', description: 'React, Node.js, PostgreSQL',       pillar: 'webdev' },
          { _key: uid(), title: 'AI & Automation',        href: '/web-development', description: 'OpenAI, LangChain, WhatsApp API', pillar: 'webdev' },
          { _key: uid(), title: 'Headless CMS',           href: '/web-development', description: 'Strapi, Sanity, WordPress',       pillar: 'webdev' },
      ]},
      { _key: uid(), title: 'About',   href: '/about',   subItems: [] },
      { _key: uid(), title: 'Blog',    href: '/blog',    subItems: [], badge: 'Insights' },
      { _key: uid(), title: 'Contact', href: '/contact', subItems: [] },
    ],
    ctaButton: { label: 'Book Discovery Call', href: '/contact', variant: 'primary' },
    announcementBanner: { enabled: true, message: '🚀 VCS Pro — 6+ Years of Global 500 Workday Expertise. Serving enterprise clients worldwide.', ctaLabel: 'Learn More', ctaHref: '/about', theme: 'teal' },
    socialIcons: [
      { _key: uid(), platform: 'linkedin', url: 'https://linkedin.com/company/vcspro', ariaLabel: 'VCS Pro on LinkedIn' },
      { _key: uid(), platform: 'github',   url: 'https://github.com/vcspro',           ariaLabel: 'VCS Pro on GitHub'   },
      { _key: uid(), platform: 'twitter',  url: 'https://twitter.com/vcspro',          ariaLabel: 'VCS Pro on Twitter'  },
    ],
  },
  footer: {
    linkColumns: [
      { _key: uid(), columnTitle: 'Workday Services', pillarTag: 'workday', links: [
          { _key: uid(), label: 'HCM & People Strategy',      href: '/workday-solutions' },
          { _key: uid(), label: 'Financial Intelligence',      href: '/workday-solutions' },
          { _key: uid(), label: 'Integration Cloud',           href: '/workday-solutions' },
          { _key: uid(), label: 'Reporting & Prism Analytics', href: '/workday-solutions' },
      ]},
      { _key: uid(), columnTitle: 'Web & AI Development', pillarTag: 'webdev', links: [
          { _key: uid(), label: 'Mobile App Development', href: '/web-development' },
          { _key: uid(), label: 'Enterprise Web Apps',    href: '/web-development' },
          { _key: uid(), label: 'AI & Automation',        href: '/web-development' },
          { _key: uid(), label: 'Headless CMS',           href: '/web-development' },
      ]},
      { _key: uid(), columnTitle: 'Company', pillarTag: 'shared', links: [
          { _key: uid(), label: 'About VCS Pro',   href: '/about'   },
          { _key: uid(), label: 'Blog & Insights', href: '/blog'    },
          { _key: uid(), label: 'Contact Us',      href: '/contact' },
      ]},
    ],
    legalText: `© ${new Date().getFullYear()} Virupaksha Consulting Services (VCS Pro). All rights reserved.`,
    legalLinks: [{ _key: uid(), label: 'Privacy Policy', href: '/privacy' }, { _key: uid(), label: 'Terms of Service', href: '/terms' }],
    footerCta: {
      headline: 'Ready to optimize your digital footprint?',
      subtext:  'From Workday Enterprise to AI-powered web apps — one partner, end-to-end.',
      buttons:  [{ _key: uid(), label: 'Discuss Workday Strategy', href: '/contact', variant: 'primary' }, { _key: uid(), label: 'Consult on a Web Project', href: '/web-development', variant: 'ghost' }],
    },
    socialIcons: [
      { _key: uid(), platform: 'linkedin', url: 'https://linkedin.com/company/vcspro', ariaLabel: 'LinkedIn' },
      { _key: uid(), platform: 'github',   url: 'https://github.com/vcspro',           ariaLabel: 'GitHub'   },
      { _key: uid(), platform: 'twitter',  url: 'https://twitter.com/vcspro',          ariaLabel: 'Twitter'  },
    ],
  },
},

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
{ _id: 'page-home', _type: 'page', title: 'Home', slug: { _type: 'slug', current: 'home' }, pillarTheme: 'global', headerStyle: 'default',
  seo: { metaTitle: 'VCS Pro | Enterprise Workday & Digital Innovation', metaDescription: 'VCS Pro delivers 6+ years of Global 500 Workday expertise and full-stack engineering — from ideation to go-live.' },
  pageBuilder: [
    hero({ eyebrow: 'Enterprise Strategy · Digital Innovation', headline: 'Bridging Enterprise Potential & Operational Reality.', subheadline: 'Virupaksha Consulting Services provides more than just configuration — we provide the roadmap to a smarter, more resilient enterprise. With 6+ years of frontline experience in Global 500 environments.', variant: 'centered', primaryCta: { label: 'Explore Workday Services', href: '/workday-solutions' }, secondaryCta: { label: 'Book Discovery Call', href: '/contact' }, stats: [{ _key: uid(), value: '6+', label: 'Years Experience' }, { _key: uid(), value: 'Global 500', label: 'Clients Served' }, { _key: uid(), value: '99.9%', label: 'SLA Uptime' }, { _key: uid(), value: '2 Pillars', label: 'Specialised Teams' }] }),
    grid({ sectionLabel: 'Our Two-Pillar Model', headline: 'One Partner. Two Specialisms.', pillar: 'both', layout: 'grid-3', services: [
      { _key: uid(), icon: '🏢', title: 'Workday HCM & Finance',    description: 'From Talent Lifecycle to Continuous Accounting — we design Workday environments that empower managers.', features: ['HCM & Talent Management', 'Financials & Procurement', 'Global Compliance'], badge: 'Pillar I', ctaLabel: 'Explore Workday', ctaHref: '/workday-solutions' },
      { _key: uid(), icon: '🔗', title: 'Integration Cloud',         description: 'We build Studio, EIB, and REST/SOAP bridges that connect your ERP to your entire digital world.', features: ['Workday Studio (Complex)', 'EIB & Core Connectors', 'REST / SOAP API Strategy'], badge: 'Pillar I', ctaLabel: 'View Integrations', ctaHref: '/workday-solutions' },
      { _key: uid(), icon: '💻', title: 'Full-Stack Web & AI',       description: 'React, Node.js, Strapi, and AI-driven automation. We engineer digital products from ideation to go-live.', features: ['Mobile & Enterprise Apps', 'AI Automation & NLP Bots', 'Headless & Traditional CMS'], badge: 'Pillar II', ctaLabel: 'Explore Web & AI', ctaHref: '/web-development' },
      { _key: uid(), icon: '📊', title: 'Reporting & Prism',         description: 'Data is only valuable if it leads to a decision. Executive dashboards and Prism analytics for a 360° view.', features: ['Executive Dashboards', 'Prism Analytics', 'C-Suite Scorecards'], ctaLabel: 'Learn More', ctaHref: '/workday-solutions' },
      { _key: uid(), icon: '🤖', title: 'AI & Automation',           description: 'OpenAI, LangChain, and WhatsApp Business API to automate tasks and provide 24/7 intelligent engagement.', features: ['OpenAI & LangChain', 'WhatsApp NLP Bots', 'Pinecone Vector DB'], badge: 'New', ctaLabel: 'See AI Services', ctaHref: '/web-development' },
      { _key: uid(), icon: '🛡️', title: 'SLA-Backed Support',        description: 'L1 Critical response in under 2 hours. 99.9% uptime guaranteed for hosted applications.', features: ['L1 < 2 Hours Response', '99.9% Uptime SLA', 'Monthly Reports'], ctaLabel: 'View SLA', ctaHref: '/contact' },
    ]}),
    tech({ eyebrow: 'Technology Matrix', headline: 'The Stack Behind Our Solutions', displayStyle: 'icon-grid', showLifecycle: true,
      lifecycle: [{ _key: uid(), step: 1, icon: '💡', label: 'Ideation', description: 'Define success metrics & select the right tech stack.' }, { _key: uid(), step: 2, icon: '🔨', label: 'Build', description: 'Agile 2-week sprints with regular demos.' }, { _key: uid(), step: 3, icon: '✅', label: 'Validation', description: 'Cross-browser testing, UAT & security audits.' }, { _key: uid(), step: 4, icon: '🚀', label: 'Go-Live', description: 'CI/CD pipeline, zero-hiccup deployment.' }, { _key: uid(), step: 5, icon: '🛡️', label: 'Hypercare', description: 'Training, docs & ongoing SLA support.' }],
      rows: [{ _key: uid(), solution: 'Mobile Apps', techStack: 'React Native / Firebase', benefit: 'One codebase, two platforms', category: 'Mobile' }, { _key: uid(), solution: 'Enterprise Apps', techStack: 'Node.js / PostgreSQL', benefit: 'Scalability & Data Integrity', category: 'Enterprise' }, { _key: uid(), solution: 'Headless CMS', techStack: 'Strapi / Sanity', benefit: 'Future-proof & Omnichannel', category: 'CMS' }, { _key: uid(), solution: 'Marketing Sites', techStack: 'Vite / Tailwind / Next.js', benefit: 'Instant load & Wow factor', category: 'Marketing' }, { _key: uid(), solution: 'AI Automation', techStack: 'OpenAI / LangChain', benefit: 'Automated Efficiency', category: 'AI' }, { _key: uid(), solution: 'Workday HCM', techStack: 'Workday Studio / EIB', benefit: 'Zero-downtime integrations', category: 'ERP' }],
    }),
  ],
},

// ─── WORKDAY SOLUTIONS ───────────────────────────────────────────────────────
{ _id: 'page-workday-solutions', _type: 'page', title: 'Workday Solutions', slug: { _type: 'slug', current: 'workday-solutions' }, pillarTheme: 'workday', headerStyle: 'default',
  seo: { metaTitle: 'Workday Solutions | VCS Pro Enterprise ERP', metaDescription: 'HCM, Finance, Integration Cloud & Prism Analytics — backed by 6+ years of Global 500 experience.' },
  pageBuilder: [
    hero({ eyebrow: 'Pillar I — Workday Enterprise', headline: 'Bridging the Gap Between Enterprise Potential and Operational Reality.', subheadline: 'VCS Pro provides more than just configuration. With 6+ years of frontline experience in Global 500 environments, our Workday specialists ensure your investment actually works for your people.', variant: 'centered', primaryCta: { label: 'Book a Technical Discovery Call', href: '/contact' }, secondaryCta: { label: 'Explore Web Development', href: '/web-development' }, stats: [{ _key: uid(), value: '6+', label: 'Years Real-Time Experience' }, { _key: uid(), value: '100%', label: 'Data Mapping Accuracy' }, { _key: uid(), value: 'R1/R2', label: 'Release Coverage' }, { _key: uid(), value: '< 2h', label: 'L1 Response' }] }),
    grid({ sectionLabel: 'Our Core Workday Ecosystem', headline: 'Value-Driven, Not Module-Driven.', pillar: 'workday', layout: 'grid-3', services: [
      { _key: uid(), icon: '👥', title: 'People & Strategy (HCM)',          description: 'We help you move beyond basic HR record-keeping. Our team designs Workday HCM environments that empower managers and engage employees.', features: ['Talent Lifecycle: Recruiting → Onboarding → Performance', 'Global Compliance: Localised business processes', 'Time & Absence: Automated payroll tracking'], ctaLabel: 'Discuss HCM', ctaHref: '/contact' },
      { _key: uid(), icon: '💰', title: 'Financial Intelligence (FINS)',     description: 'Numbers tell a story; we make sure it\'s an accurate one. We transform your finance function into a strategic engine.', features: ['Operational Excellence: AP, AR & General Ledger', 'Strategic Spend: Granular procurement visibility', 'Continuous Accounting: Real-time financial health'], ctaLabel: 'Discuss Finance', ctaHref: '/contact' },
      { _key: uid(), icon: '🔗', title: 'The Digital Thread (Integrations)', description: 'A Workday tenant shouldn\'t be an island. We build bridges that connect your ERP to the rest of your digital world.', features: ['Workday Studio for multi-system data flows', 'EIB & Connector deployments', 'Secure REST/SOAP endpoints for web apps'], ctaLabel: 'Discuss Integrations', ctaHref: '/contact' },
      { _key: uid(), icon: '📊', title: 'Actionable Insights (Prism)',       description: 'Data is only valuable if it leads to a decision. We clear the noise to show you the metrics that matter.', features: ['Executive Dashboards for C-suite', 'Prism Analytics: external + internal data merge', '360-degree business view'], ctaLabel: 'Discuss Reporting', ctaHref: '/contact' },
      { _key: uid(), icon: '🔄', title: 'Bi-Annual Release Management',      description: 'All integrations stress-tested against Workday\'s R1/R2 release cycles to guarantee zero downtime.', features: ['Pre-release regression testing', 'Impact assessments ahead of every update', 'Proactive rollback planning'] },
      { _key: uid(), icon: '🔒', title: 'Security & Governance',             description: 'All configurations strictly adhere to ISU and ISSG protocols.', features: ['ISU provisioning', 'ISSG configuration', '100% data mapping accuracy'] },
    ]}),
    grid({ sectionLabel: 'The VCS Pro Methodology', headline: 'How We Work: Precision at Scale.', pillar: 'workday', layout: 'grid-4', services: [
      { _key: uid(), icon: '01', title: 'Discovery & Alignment',     description: 'We start by listening. We map your current pain points against Workday best practices.', features: ['Stakeholder workshops', 'As-Is process mapping', 'FDD creation'] },
      { _key: uid(), icon: '02', title: 'Precision Architecture',    description: 'Our architects design a blueprint accounting for security, scalability, and user experience.', features: ['TDD approval', 'Security model design', 'Integration pattern selection'] },
      { _key: uid(), icon: '03', title: 'Iterative Build & Validate', description: 'We configure in sprints, allowing your team to see the system early and often.', features: ['Sprint builds in Sandbox', 'Regular stakeholder demos', 'Continuous feedback'] },
      { _key: uid(), icon: '04', title: 'Stress-Tested Deployment',  description: 'Through rigorous UAT and integration checks, we ensure Day One is a success.', features: ['Full UAT sign-off', 'End-to-end integration testing', 'Hypercare & training'] },
    ]}),
  ],
},

// ─── WEB DEVELOPMENT ─────────────────────────────────────────────────────────
{ _id: 'page-web-development', _type: 'page', title: 'Web & AI Development', slug: { _type: 'slug', current: 'web-development' }, pillarTheme: 'webdev', headerStyle: 'default',
  seo: { metaTitle: 'Web & AI Development | VCS Pro Engineering', metaDescription: 'Engineering digital excellence from ideation to go-live. React, Node.js, AI automation, WhatsApp API & headless CMS.' },
  pageBuilder: [
    hero({ eyebrow: 'Pillar II — Web & AI Development', headline: 'Engineering Digital Excellence: From Ideation to Go-Live.', subheadline: 'We don\'t just build websites — we architect digital ecosystems. Our team combines 6+ years of real-time experience with the world\'s most advanced technologies.', variant: 'centered', primaryCta: { label: 'Start Your Project Discovery', href: '/contact' }, secondaryCta: { label: 'Explore Workday Division', href: '/workday-solutions' }, stats: [{ _key: uid(), value: '6+', label: 'Years Experience' }, { _key: uid(), value: '99.9%', label: 'Uptime SLA' }, { _key: uid(), value: '< 2.5s', label: 'Target LCP' }, { _key: uid(), value: '5', label: 'Tech Specialisms' }] }),
    grid({ sectionLabel: 'Our Specialised Development Divisions', headline: 'The Right Architecture for Your Goals.', pillar: 'webdev', layout: 'grid-3', services: [
      { _key: uid(), icon: '📱', title: 'Mobile App Development',          description: 'Native-quality mobile experiences that drive engagement and loyalty.', features: ['React Native & Flutter for cross-platform', 'Firebase for real-time sync', 'Single codebase for iOS & Android'], ctaLabel: 'Start Mobile Project', ctaHref: '/contact' },
      { _key: uid(), icon: '🖥️', title: 'Enterprise & Web Applications',   description: 'Custom software designed to solve complex operational challenges.', features: ['React / Angular + Node.js + PostgreSQL', 'Docker & Vite enterprise deployment', 'Enterprise-grade security'], ctaLabel: 'Build Your App', ctaHref: '/contact' },
      { _key: uid(), icon: '🤖', title: 'AI-Driven Automation',            description: 'Bridge the gap between static code and intelligent systems.', features: ['OpenAI API, LangChain & Pinecone', 'WhatsApp Business API + NLP Bots', 'Python Microservices + Node.js'], badge: 'New', ctaLabel: 'Explore AI', ctaHref: '/contact' },
      { _key: uid(), icon: '📝', title: 'Headless & Traditional CMS',      description: 'Content is your engine for organic growth. Make publishing effortless.', features: ['Modern Headless: Strapi, Sanity, Payload', 'Traditional: WordPress & Joomla', 'Hybrid: WordPress backend + React frontend'], ctaLabel: 'Choose CMS', ctaHref: '/contact' },
      { _key: uid(), icon: '🌐', title: 'Corporate Websites & Micro-Sites', description: 'Your digital handshake — communicating trust and technical sophistication.', features: ['Next.js, Tailwind CSS, Vite + React', 'Framer Motion animations', 'User-centric rapid prototyping'], ctaLabel: 'Design My Site', ctaHref: '/contact' },
      { _key: uid(), icon: '🏥', title: 'Domain-Specific Requirements',    description: 'Solutions meeting specific legal and operational standards of your industry.', features: ['Healthcare: HIPAA-compliant architecture', 'Fintech: PCI-DSS compliance', 'E-commerce: Serverless Edge + CDN'], ctaLabel: 'Discuss Requirements', ctaHref: '/contact' },
    ]}),
    ai({ eyebrow: 'AI-Driven Automation', headline: 'Bridge the Gap Between Static Code and Intelligent Systems.', description: 'AI reduces operational overhead by handling data-heavy tasks that previously required manual intervention.', layoutStyle: 'cards', ctaLabel: 'Start Your AI Integration Strategy', ctaHref: '/contact',
      capabilities: [
        { _key: uid(), icon: 'whatsapp-bot', title: 'WhatsApp Business API',       description: '24/7 automated customer engagement via Twilio/Meta.', techStack: 'WhatsApp API + Twilio + NLP'       },
        { _key: uid(), icon: 'nlp',          title: 'Natural Language Processing',  description: 'Intelligent bots that understand customer intent.', techStack: 'OpenAI API + LangChain'              },
        { _key: uid(), icon: 'vector-db',    title: 'Vector Database (RAG)',        description: 'Ground AI in your proprietary data using Pinecone.', techStack: 'Pinecone + LangChain'               },
        { _key: uid(), icon: 'automation',   title: 'Workflow Automation',          description: 'Automate document processing and back-office tasks.', techStack: 'Python Microservices + Node.js'    },
        { _key: uid(), icon: 'prediction',   title: 'Predictive Analytics',         description: 'Surface actionable predictions from historical data.', techStack: 'Python + TensorFlow'              },
        { _key: uid(), icon: 'document-ai',  title: 'Document AI & Indexing',       description: 'AI-powered document indexing and secure portals.', techStack: 'OpenAI + PostgreSQL'                 },
      ],
    }),
  ],
},

// ─── ABOUT US ────────────────────────────────────────────────────────────────
{ _id: 'page-about', _type: 'page', title: 'About Us', slug: { _type: 'slug', current: 'about' }, pillarTheme: 'global', headerStyle: 'default',
  seo: { metaTitle: 'About VCS Pro | Virupaksha Consulting Services', metaDescription: 'Founded on Precision at Scale. 6+ years partnering with Global 500 companies across Workday Enterprise and Web & AI.' },
  pageBuilder: [
    hero({ eyebrow: 'About Virupaksha Consulting Services', headline: 'Precision at Scale. Performance at Every Level.', subheadline: 'Founded on the principle of Precision at Scale, we have built a reputation for solving the most complex technical challenges for some of the world\'s most influential organisations.', variant: 'centered', primaryCta: { label: 'Work With Us', href: '/contact' }, secondaryCta: { label: 'View Our SLA', href: '/contact' }, stats: [{ _key: uid(), value: '6+', label: 'Years Real-Time Experience' }, { _key: uid(), value: 'Global 500', label: 'Environments Mastered' }, { _key: uid(), value: 'Two', label: 'Dedicated Pillars' }, { _key: uid(), value: '100%', label: 'Technical Integrity' }] }),
    grid({ sectionLabel: 'Our Two-Pillar Expertise', headline: 'Deep Specialisation. Comprehensive Coverage.', pillar: 'both', layout: 'grid-3', services: [
      { _key: uid(), icon: '🏢', title: 'The Enterprise ERP Wing',    badge: 'Pillar I',  description: 'Dedicated to the Workday ecosystem — HCM, Financials, Integration Cloud, and Prism Analytics.', features: ['Fortune 500 infrastructure support', 'Data integrity & process automation', 'Zero-downtime release management'], ctaLabel: 'Explore Workday', ctaHref: '/workday-solutions' },
      { _key: uid(), icon: '💻', title: 'The Modern Engineering Wing', badge: 'Pillar II', description: 'Mobile apps, enterprise web apps, headless CMS, and AI — built with cutting-edge tech.', features: ['React, Node.js, Strapi, PostgreSQL', 'AI automation & WhatsApp API', 'Stunning, high-performance UIs'], ctaLabel: 'Explore Web & AI', ctaHref: '/web-development' },
      { _key: uid(), icon: '🎯', title: 'Human-Centric Technology',  description: 'Technology should serve people. Our designs are intuitive and built for the end-user.', features: ['Intuitive interface design', 'End-user centred configurations', 'Change management & training'] },
      { _key: uid(), icon: '🔬', title: 'Technical Integrity',        description: 'We don\'t take shortcuts. Our code is clean, documented, and built to last.', features: ['Clean, documented codebases', 'Architecture review on every project', 'Long-term maintainability'] },
      { _key: uid(), icon: '🤝', title: 'Transparent Partnership',    description: 'We operate as an extension of your team with full visibility through regular sprints.', features: ['Full process visibility', 'Regular sprint demos', 'Direct access to senior leads'] },
      { _key: uid(), icon: '🌍', title: 'Global Perspective',         description: 'Big 4 standards of security and scalability applied to every project, regardless of size.', features: ['Big 4 security standards', 'Multi-region experience', 'Cross-cultural communication'] },
    ]}),
  ],
},

// ─── CONTACT ─────────────────────────────────────────────────────────────────
{ _id: 'page-contact', _type: 'page', title: 'Contact Us', slug: { _type: 'slug', current: 'contact' }, pillarTheme: 'global', headerStyle: 'default',
  seo: { metaTitle: 'Contact VCS Pro | Book a Discovery Call', metaDescription: 'Connect directly with a Workday Architect or Senior Lead Developer. Response within 24 business hours.' },
  pageBuilder: [
    hero({ eyebrow: 'Let\'s Build the Future of Your Business', headline: 'Talk to a Real Expert. Not a Salesperson.', subheadline: 'Whether you\'re looking to optimise your Workday footprint or launch a new digital product, our specialised teams are ready. Expect a detailed initial response within one business day.', variant: 'centered', primaryCta: { label: 'Workday Enterprise Inquiry', href: 'mailto:erp.support@vcspro.in' }, secondaryCta: { label: 'Web & AI Inquiry', href: 'mailto:dev.support@vcspro.in' }, stats: [{ _key: uid(), value: '< 24h', label: 'Initial Response' }, { _key: uid(), value: 'Direct', label: 'Expert Access' }, { _key: uid(), value: '100%', label: 'Confidential' }] }),
    grid({ sectionLabel: 'Why Contact VCS Pro?', headline: 'The 24-Hour Commitment.', pillar: 'both', layout: 'grid-3', services: [
      { _key: uid(), icon: '🎯', title: 'Direct Access to Experts',   description: 'You\'ll be connected directly to a Workday Architect or Senior Lead Developer — not a salesperson.', features: ['Workday Architects for Pillar I', 'Senior Developers for Pillar II', 'No gatekeeping or sales layers'] },
      { _key: uid(), icon: '⏱️', title: 'The 24-Hour Commitment',     description: 'Expect a detailed initial response within one business day with specific answers, not generic templates.', features: ['Response within 24 business hours', 'Specific technical answers', 'Immediate routing to right specialist'] },
      { _key: uid(), icon: '🔒', title: 'Confidential & Secure',      description: 'Your project details are protected from the very first interaction.', features: ['NDA available on request', 'Encrypted communications', 'GDPR-compliant data handling'] },
      { _key: uid(), icon: '🏢', title: 'Workday Enterprise Path',    badge: 'Pillar I',  description: 'For HCM, Finance, Integrations or Prism inquiries. Routed to erp.support@vcspro.in', features: ['Implementing / Post-Production / Planning', 'HCM / Finance / Integrations / Prism', 'erp.support@vcspro.in'], ctaLabel: 'Workday Inquiry', ctaHref: 'mailto:erp.support@vcspro.in' },
      { _key: uid(), icon: '💻', title: 'Web & AI Development Path',  badge: 'Pillar II', description: 'For mobile apps, enterprise apps, AI or CMS projects. Routed to dev.support@vcspro.in', features: ['Mobile / Enterprise App / CMS', 'React & Node / Strapi / WordPress', 'dev.support@vcspro.in'], ctaLabel: 'Web & AI Inquiry', ctaHref: 'mailto:dev.support@vcspro.in' },
      { _key: uid(), icon: '📍', title: 'Office & Presence',          description: 'Headquartered in North Texas, serving enterprise clients globally.', features: ['North Texas HQ', 'Global enterprise service', 'On-site engagements available'] },
    ]}),
  ],
},

// ─── BLOG INDEX ───────────────────────────────────────────────────────────────
{ _id: 'page-blog', _type: 'page', title: 'Blog & Insights', slug: { _type: 'slug', current: 'blog' }, pillarTheme: 'global', headerStyle: 'default',
  seo: { metaTitle: 'VCS Pro Insights | Blog', metaDescription: 'Expert perspectives on Workday, engineering, and AI-driven business automation.' },
  pageBuilder: [hero({ eyebrow: 'VCS Pro Insights', headline: 'Expert Perspectives on Enterprise Stability & Digital Innovation.', subheadline: 'Deep dives into Workday optimisation, full-stack engineering, and AI-driven automation — written by the architects who build it every day.', variant: 'centered', primaryCta: { label: 'All Articles', href: '/blog' } })],
},

// ─── BLOG POSTS ───────────────────────────────────────────────────────────────
{ _id: 'blog-workday-integration-roadmap-2026', _type: 'blogPost', title: 'The 2026 Roadmap for Workday Integration: Moving Beyond EIBs to Studio & Prism', slug: { _type: 'slug', current: 'workday-integration-roadmap-2026' }, category: 'workday', featured: true, publishedAt: '2026-01-15T09:00:00Z', readTime: 12, excerpt: 'Leveraging our experience with Global 500 companies, we break down the shift toward high-governance integration patterns — and why your EIB-first strategy is showing its age.', tags: ['Workday', 'Integration Cloud', 'Studio', 'EIB', 'Prism'], author: { name: 'VCS Pro Workday Team', role: 'Enterprise ERP Architects' }, seo: { metaTitle: 'Workday Integration Roadmap 2026 | VCS Pro', metaDescription: 'Why Global 500 companies are shifting from EIBs to Workday Studio and Prism in 2026.' },
  body: [ blk('The 2026 Workday Integration Landscape', 'h2'), blk('Enterprise Workday environments have matured significantly. The days of relying solely on EIBs for all integration needs are behind us. As organisations push toward real-time data exchange, the demand for Workday Studio — and Prism Analytics — has never been higher. Clients who built their integration layer exclusively on EIBs are now hitting walls: batch-only processing, limited error handling, and no ability to respond to real-time payroll events.'), blk('Why EIBs Still Have a Place', 'h2'), blk('EIBs remain the right tool for simple, scheduled, file-based data exchanges — third-party benefits providers, payroll bureaus, and flat-file reporting. Fast to configure, easy to maintain, and battle-tested. The problem begins when organisations force EIBs into scenarios they were not designed for: conditional logic, multi-step transformations, or real-time triggers.'), blk('The Case for Workday Studio', 'h2'), blk('Workday Studio is the answer for high-logic integration scenarios. It supports XSLT transformations, conditional branching, multi-document orchestration, and robust error handling. Studio integrations can be triggered by Workday business process events — enabling near-real-time data synchronisation with downstream systems.'), blk('Our 2026 Governance Framework', 'h2'), blk('We recommend a three-tier integration governance model. Tier 1 (EIB): Scheduled, file-based, low-complexity exchanges. Tier 2 (Studio): Event-driven, conditional logic, multi-system orchestration. Tier 3 (Prism + REST API): Real-time data federation and custom application feeds. Ready to discuss your integration roadmap? Book a Technical Discovery Call.') ],
},

{ _id: 'blog-navigating-workday-biannual-updates', _type: 'blogPost', title: 'Navigating Bi-Annual Workday Updates: Impact Assessments Without Disrupting Production', slug: { _type: 'slug', current: 'navigating-workday-biannual-updates' }, category: 'workday', featured: false, publishedAt: '2026-02-03T09:00:00Z', readTime: 9, excerpt: 'Every R1 and R2 Workday release brings new capabilities — and new risks. Here is the VCS Pro impact assessment methodology.', tags: ['Workday', 'Release Management', 'R1', 'R2', 'UAT'], author: { name: 'VCS Pro Workday Team', role: 'Enterprise ERP Architects' }, seo: { metaTitle: 'Workday Bi-Annual Update Strategy | VCS Pro', metaDescription: 'How to perform Workday R1/R2 impact assessments without disrupting production.' },
  body: [ blk('The Release Cycle Challenge', 'h2'), blk('Workday\'s bi-annual release cycle delivers new features twice a year without exception. We have seen organisations treat Workday releases reactively: they discover broken integrations on release day and scramble to patch them. This is entirely preventable.'), blk('The VCS Pro Pre-Release Protocol', 'h2'), blk('Our protocol has four phases. Eight weeks out: review release notes in detail. Six weeks out: deploy to Preview and begin regression testing. Four weeks out: execute full UAT with business stakeholders. Two weeks out: document issues, implement fixes, obtain formal sign-off before production cut-over.'), blk('Protecting Your Integration Layer', 'h2'), blk('Studio integrations require the most attention. Workday occasionally modifies WSDL definitions or deprecates web services. Your team must review the API change log for every release and run automated test suites against Studio integrations in Preview before promotion to production.'), blk('Building Release Resilience Into Your SLA', 'h2'), blk('Our SLA framework explicitly covers release management. Every retainer client receives a pre-release impact assessment four weeks before go-live, a dedicated UAT period in Preview, and a 72-hour post-release monitoring window with L1 Critical response under 2 hours.') ],
},

{ _id: 'blog-why-strapi-enterprise-cms', _type: 'blogPost', title: 'Why We Choose Strapi for Enterprise CMS: Headless for Omnichannel Content Delivery', slug: { _type: 'slug', current: 'why-strapi-enterprise-cms' }, category: 'engineering', featured: false, publishedAt: '2026-01-28T09:00:00Z', readTime: 8, excerpt: 'Traditional CMS platforms tightly couple content management with presentation. For enterprise organisations with multiple digital touchpoints, this is a ceiling — not a foundation.', tags: ['Strapi', 'Headless CMS', 'React', 'Node.js', 'Omnichannel'], author: { name: 'VCS Pro Engineering Team', role: 'Full-Stack Engineers' }, seo: { metaTitle: 'Strapi for Enterprise CMS | VCS Pro', metaDescription: 'Why headless CMS beats traditional platforms for enterprise omnichannel delivery.' },
  body: [ blk('The Architecture Ceiling of Traditional CMS', 'h2'), blk('WordPress and Joomla are exceptional for websites that live primarily on the web. But enterprise organisations need content delivered to web apps, mobile apps, IoT devices, and partner portals simultaneously. A traditional CMS cannot fulfil this without significant engineering gymnastics.'), blk('What Headless CMS Actually Means', 'h2'), blk('A headless CMS separates the content repository from the presentation layer. The CMS stores structured content and exposes it via a REST or GraphQL API. Any consuming application — a React web app, a React Native mobile app, a Next.js marketing site — fetches the content it needs at runtime.'), blk('Why We Choose Strapi', 'h2'), blk('Strapi is self-hosted and open source (critical for GDPR compliance), its content type builder lets non-technical editors define data models, its RBAC is enterprise-grade, and it integrates naturally with our Node.js backend stack and deploys cleanly on Docker, AWS, or Azure.'), blk('The Hybrid Approach', 'h2'), blk('Not every client wants to migrate from WordPress. In these cases we implement a decoupled architecture: WordPress acts as the content repository via the WP REST API, while a Next.js or React frontend handles all rendering — delivering headless performance while preserving editorial familiarity.') ],
},

{ _id: 'blog-whatsapp-api-customer-support', _type: 'blogPost', title: 'WhatsApp Business API for Enterprise Support: Integrating NLP Bots Into Your React App', slug: { _type: 'slug', current: 'whatsapp-api-nlp-bots-react' }, category: 'engineering', featured: false, publishedAt: '2026-02-10T09:00:00Z', readTime: 10, excerpt: 'WhatsApp has 2 billion+ active users. The Business API combined with NLP automation represents a step-change in engagement quality and a significant reduction in support overhead.', tags: ['WhatsApp API', 'NLP', 'AI', 'React', 'Node.js'], author: { name: 'VCS Pro Engineering Team', role: 'Full-Stack & AI Engineers' }, seo: { metaTitle: 'WhatsApp NLP Bots for Enterprise | VCS Pro', metaDescription: 'Integrate the WhatsApp Business API and NLP bots into your React/Node.js application.' },
  body: [ blk('The Business Case', 'h2'), blk('Email is asynchronous and buried. Web chat requires users to be on your site. Phone support is expensive. WhatsApp, by contrast, is where your customers already spend time. The WhatsApp Business API gives enterprises programmatic access to WhatsApp messaging at scale — combined with NLP automation, it enables handling high volumes of interactions without human intervention, 24 hours a day.'), blk('The Technical Architecture', 'h2'), blk('Our standard architecture has four components: a Meta Cloud API webhook receiver, a Node.js processing layer, an NLP engine (OpenAI via LangChain), and a React admin dashboard for conversation monitoring. The webhook receiver listens for incoming messages and publishes them to an internal message queue (Redis or AWS SQS).'), blk('Building the NLP Layer', 'h2'), blk('We build the NLP layer using OpenAI\'s API combined with retrieval-augmented generation (RAG). The customer\'s question is embedded as a vector, matched against a knowledge base in Pinecone, and the retrieved context is injected into the GPT-4 prompt alongside conversation history. The knowledge base can be updated by non-technical staff by uploading documents to a Strapi CMS.'), blk('Compliance Considerations', 'h2'), blk('WhatsApp message data is subject to GDPR and CCPA. Our architecture stores all message data in PostgreSQL within the client\'s own cloud infrastructure — never in a shared SaaS environment. All data at rest is encrypted using AES-256.') ],
},

{ _id: 'blog-hipaa-compliance-modern-apps', _type: 'blogPost', title: 'HIPAA Compliance in Modern Web Applications: Architecting Secure Healthcare Environments', slug: { _type: 'slug', current: 'hipaa-compliance-modern-web-apps' }, category: 'industry', featured: false, publishedAt: '2026-01-20T09:00:00Z', readTime: 11, excerpt: 'HIPAA compliance is not a checkbox — it is an architectural discipline. Security must be embedded at infrastructure, application, and process level from day one.', tags: ['HIPAA', 'Healthcare', 'Security', 'AWS', 'Compliance'], author: { name: 'VCS Pro Engineering Team', role: 'Security Engineers' }, seo: { metaTitle: 'HIPAA Compliant Web App Architecture | VCS Pro', metaDescription: 'Architecting HIPAA-compliant web applications: encryption, audit logs, BAAs, and secure cloud infrastructure.' },
  body: [ blk('Why HIPAA Is an Architecture Problem', 'h2'), blk('Many teams approach HIPAA compliance as a late-stage checklist — build an application, then retrofit security controls. This consistently fails. Protected Health Information (PHI) requires end-to-end encryption, granular access control, complete audit logging, and strict data minimisation. These requirements shape every layer of a compliant application and cannot be added retrospectively.'), blk('Infrastructure Layer', 'h2'), blk('All PHI must be stored in HIPAA-eligible cloud services. On AWS this includes RDS (PostgreSQL), S3, DynamoDB, Lambda, and ECS — all covered under AWS\'s Business Associate Agreement (BAA). Our standard healthcare infrastructure uses a VPC with private subnets, a WAF in front of public endpoints, KMS-managed encryption keys, and CloudTrail for infrastructure-level audit logging.'), blk('Application Layer', 'h2'), blk('PHI fields in PostgreSQL are encrypted at the column level using the application\'s own encryption key — separate from the KMS infrastructure key. This provides defence in depth: even a compromised database dump reveals only ciphertext. API endpoints implement RBAC at the resource level, not just the route level.'), blk('Audit Logging: The Non-Negotiable', 'h2'), blk('HIPAA\'s audit control standard requires mechanisms to record and examine activity in systems containing PHI. Our audit log schema captures: timestamp, user ID and role, action type, resource type and ID, PHI fields accessed, source IP, and outcome. Audit logs are stored in an append-only S3 bucket with object lock — they cannot be deleted or modified, even by administrators.') ],
},

{ _id: 'blog-ideation-to-go-live-lifecycle', _type: 'blogPost', title: 'From Ideation to Go-Live: Inside the VCS Pro 5-Phase Project Lifecycle', slug: { _type: 'slug', current: 'ideation-to-go-live-project-lifecycle' }, category: 'casestudy', featured: true, publishedAt: '2026-01-08T09:00:00Z', readTime: 7, excerpt: 'The gap between a signed contract and a successful go-live is where most consulting engagements fail. Here is how VCS Pro structures every project — from kick-off to hypercare.', tags: ['Project Management', 'Methodology', 'Workday', 'Go-Live'], author: { name: 'VCS Pro Leadership', role: 'Project Management Office' }, seo: { metaTitle: 'VCS Pro Project Lifecycle | Ideation to Go-Live', metaDescription: 'Inside the VCS Pro 5-phase project methodology — from kick-off to hypercare.' },
  body: [ blk('Why Methodology Matters', 'h2'), blk('Every consulting firm claims a methodology. Few can demonstrate what that looks like in practice. We built our project lifecycle after years of observing where enterprise implementations fail, designing it to eliminate the most common failure modes. The five phases — Discovery, Build, Validation, Deployment, and Hypercare — apply to both Workday Enterprise and Web/AI Development.'), blk('Phase 1: Discovery & Alignment', 'h2'), blk('The kick-off meeting is the foundation of every engagement. For Workday, Discovery produces a Functional Design Document before a single line of configuration is written. For Web/AI, it produces a Product Backlog and Technology Selection document confirming the stack, deployment target, and Definition of Done.'), blk('Phase 2: Iterative Build', 'h2'), blk('We configure in sprints. Stakeholders can review working software — not slide decks — from week two. The sprint model eliminates the most dangerous failure mode in enterprise projects: the discovery of misaligned requirements six months into a build. When stakeholders see working software early, course corrections happen in hours, not months.'), blk('Phase 3: Validation', 'h2'), blk('UAT is a formal gate, not a rubber stamp. No engagement proceeds to deployment without a signed UAT sign-off document. This is a contractual requirement, not a formality — it protects both the client and VCS Pro by establishing a clear definition of success before go-live.'), blk('Phase 4: Deployment & Phase 5: Hypercare', 'h2'), blk('Go-live day is not a surprise. The cut-over follows a timed run book with explicit rollback triggers. The 30 days following go-live provide elevated SLA coverage (L1 under 2 hours, all hours, seven days a week) and daily stand-ups. Hypercare ends with complete technical documentation, a trained internal team, and formal handover to standard retainer SLA.') ],
},

]; // end DOCS

let ok = 0, fail = 0;
for (const doc of DOCS) {
  const label = `${doc._type.padEnd(12)} → "${doc.title || doc._id}"`;
  try {
    await client.createOrReplace(doc);
    console.log(`  ✅  ${label}`);
    ok++;
  } catch (err) {
    console.error(`  ❌  ${label}`);
    console.error(`       ${err.message}`);
    fail++;
  }
}

console.log('\n════════════════════════════════════════');
console.log(`  ✅  Seeded  : ${ok}`);
if (fail > 0) console.log(`  ❌  Failed  : ${fail}`);
console.log('════════════════════════════════════════');
console.log('\n  🎉  Done!');
console.log('      Website  →  http://localhost:3000');
console.log('      Studio   →  http://localhost:3333\n');

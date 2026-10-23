import { Project, Service, ArchiveStill, FaqItem } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    slug: 'voices-from-the-valley',
    title: 'Voices from the Valley',
    client: 'Rwandan Cinema Fund & Arte France',
    year: '2024',
    category: 'Film & Documentary',
    categoryLabel: 'Documentary Feature (48 min)',
    role: 'Principal Cinematography & Direction',
    summary: 'An observational visual poem documenting sugarcane harvesters in the misty Nyabarongo wetland basin at sunrise.',
    narrative: 'Filmed over 12 weeks along the low-lying river plains of Rwanda, Voices from the Valley investigates the intimate rhythm of collective manual labour, brotherhood, and sunrise rituals. Captured in natural dawn mist using vintage anamorphic primes.',
    challenge: 'Shooting in heavy morning river fog with high ambient humidity while balancing deep dark silhouettes with delicate golden skylight.',
    solution: 'Paired large-format camera sensors with custom low-contrast filtration, exposing strictly for shadow detail and grading in DaVinci Resolve using a bespoke 35mm print emulation curve.',
    deliverables: [
      'Theatrical 4K DCP 2.39:1 Anamorphic',
      'Dolby 5.1 & Atmos Sound Mix',
      'Festival Cut (48 min)',
      'Limited Edition 35mm Exhibition Stills'
    ],
    credits: [
      { role: 'Director', name: 'Aimé Mugisha' },
      { role: 'Cinematographer (DP)', name: 'Kalisa Tuvugane' },
      { role: 'Field Recordist', name: 'Jean-Luc Habiyaremye' },
      { role: 'Colorist', name: 'Marc B. (DaVinci Master)' }
    ],
    metrics: [
      { label: 'Festival Laurels', value: '14+' },
      { label: 'FESPACO Official Selection', value: '2025' },
      { label: 'Camera Sensor', value: '8K LF' }
    ],
    accentColor: '#c8a97e',
    videoDuration: '00:51',
    videoUrl: '/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4',
    imageUrl: '/assets/aistudio/new_1_2f61cc23.jpg',
    galleryImages: [
      {
        title: 'Morning March Across Nyabarongo',
        caption: 'Arri Alexa Mini LF · Cooke Anamorphic 40mm · Natural dawn mist',
        gradient: 'from-amber-950 via-zinc-900 to-black',
        imageUrl: '/assets/aistudio/new_1_2f61cc23.jpg'
      },
      {
        title: 'The Handshake at the Canal',
        caption: 'Chiaroscuro silhouette · 85mm T2.0 · 1/48s 800 ISO',
        gradient: 'from-stone-900 via-zinc-950 to-black',
        imageUrl: '/assets/aistudio/MSG01940_1_783cf665.jpg'
      },
      {
        title: 'Procession with Tools',
        caption: 'Deep depth of field in morning fog · 50mm Prime',
        gradient: 'from-zinc-950 via-neutral-900 to-black',
        imageUrl: '/assets/aistudio/MSG01932_1_d0a10631.jpg'
      }
    ]
  },
  {
    id: 'p2',
    slug: 'impakanizi-sacred-dance',
    title: 'Impakanizi: The Sacred Step',
    client: 'Ministry of National Unity and Civic Engagement & Goethe-Institut',
    year: '2024',
    category: 'Film & Documentary',
    categoryLabel: 'Cultural Heritage & Avant-Garde Cinema',
    role: 'Creative Direction, Lighting & Motion Craft',
    summary: 'A visual celebration of the Intore warrior dancer, framed as a silhouette against an incandescent amber sun.',
    narrative: 'Impakanizi explores the philosophy of equilibrium and bravery preserved in Rwandan Intore dance. Filmed in an acoustic black box studio in Kigali with a single 10,000-watt tungsten parabolic luminaire mimicking an eclipse sunrise.',
    challenge: 'Capturing explosive high-velocity acrobatic jumps (guhamiriza) in extreme low-key silhouette without losing the edge definition of the Umusatsi w’intore (traditional woven headdress).',
    solution: 'Used high-speed 120fps capture on 8K full-frame sensors with back-rim edge polarization, synchronized with live traditional Ikembe and Iningiri string instruments.',
    deliverables: [
      'Theatrical Cultural Master (4K DCI)',
      'Museum Projection Mapping Installation',
      'Art Gallery Screen Prints (Set of 12)',
      'Original Rwandan Traditional Score Vinyl'
    ],
    credits: [
      { role: 'Creative Director', name: 'Kalisa Tuvugane' },
      { role: 'Choreographer', name: 'François Ngarambe' },
      { role: 'Lead Performer', name: 'Didier Mugiraneza' },
      { role: 'Sound Designer', name: 'Kavutse Sound Lab' }
    ],
    metrics: [
      { label: 'Exhibition Run', value: '4 Continents' },
      { label: 'Festival Grand Prix', value: 'Winner' },
      { label: 'Capture Frame Rate', value: '120 FPS' }
    ],
    accentColor: '#f59e0b',
    videoDuration: '01:30',
    videoUrl: '/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4',
    imageUrl: '/assets/aistudio/iMpakanizi_66_b411b2d2.jpg',
    galleryImages: [
      {
        title: 'The Warrior Silhouette in Golden Eclipse',
        caption: '10K Parabolic backlighting · 85mm T1.5 · Studio Kigali',
        gradient: 'from-orange-950 via-red-950 to-black',
        imageUrl: '/assets/aistudio/iMpakanizi_66_b411b2d2.jpg'
      },
      {
        title: 'Spear Balance Choreography',
        caption: 'Phantom Flex 4K at 400fps · Dynamic tension study',
        gradient: 'from-amber-950 via-stone-900 to-black',
        imageUrl: '/assets/aistudio/iMpakanizi_66_b411b2d2.jpg'
      }
    ]
  },
  {
    id: 'p3',
    slug: 'dukunde-kawa-single-origin',
    title: 'Dukunde Kawa: Single Origin',
    client: 'Dukunde Kawa Cooperative & Specialty Coffee Association',
    year: '2024',
    category: 'Commercials',
    categoryLabel: 'Brand Campaign & Visual Monograph',
    role: 'Direction, Black & White Cinematography & Sound',
    summary: 'High-contrast monochrome film honoring the highland coffee growers and dairy transporters of Gakenke.',
    narrative: 'Located in the steep volcanic hills of Musasa, Dukunde Kawa is world-renowned for its award-winning Bourbon Arabica coffee. Tuvugane spent three weeks embedded on the steep ridges, capturing the grit, nobility, and pride of the farmers navigating the terraced terrain on customized cargo bicycles.',
    challenge: 'Conveying the tactile aroma, mountain elevation, and dignity of coffee farming without typical tourist commercial clichés.',
    solution: 'Shot entirely on a dedicated monochrome cinema sensor with Leica Summilux glass, creating deep silvers, clean whites, and dramatic highland sky gradients.',
    deliverables: [
      'Global 60s & 90s Brand Campaign Films',
      'Black & White Editorial Monograph (84 Pages)',
      'Social Shortform Series (5 Episodes)',
      'Coffee Packaging Visual Assets'
    ],
    credits: [
      { role: 'Director', name: 'Kalisa Tuvugane' },
      { role: 'Director of Photography', name: 'Aimé Mugisha' },
      { role: 'Producer', name: 'Amina Uwase' },
      { role: 'Editor', name: 'David Rukundo' }
    ],
    metrics: [
      { label: 'Commercial Reach', value: '3.6M' },
      { label: 'Brand Conversion', value: '+48%' },
      { label: 'Elevation Filmed', value: '2,100m' }
    ],
    accentColor: '#ffffff',
    videoDuration: '01:45',
    videoUrl: '/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4',
    imageUrl: '/assets/aistudio/dukunde_kawa_17_9888532a.jpg',
    galleryImages: [
      {
        title: 'The Carrier at Musasa Ridge',
        caption: 'Monochrome Sensor · 35mm Summilux T1.4 · Gakenke highland backdrop',
        gradient: 'from-zinc-900 via-neutral-900 to-black',
        imageUrl: '/assets/aistudio/dukunde_kawa_17_9888532a.jpg'
      },
      {
        title: 'Milk Churn Transport on Hillside Trail',
        caption: 'Natural mountain ambient light · 1/50s shutter · 400 ISO',
        gradient: 'from-stone-900 via-zinc-950 to-black',
        imageUrl: '/assets/aistudio/dukunde_kawa_17_9888532a.jpg'
      }
    ]
  },
  {
    id: 'p4',
    slug: 'agaseke-weaving-tomorrow',
    title: 'Agaseke: Weaving Tomorrow',
    client: 'Rwanda Development Board (RDB) & Made in Rwanda Initiative',
    year: '2024',
    category: 'Commercials',
    categoryLabel: 'National Brand Campaign & Commercial',
    role: 'Creative Direction, Cinematography & Motion Design',
    summary: 'A vibrant celebration of the Agaseke peace basket as a symbol of women’s economic sovereignty and global design.',
    narrative: 'Agaseke is more than an ancient Rwandan craft; it is a geometric marvel woven from sisal fiber and sweetgrass. For the global Made in Rwanda campaign, Tuvugane filmed among the lush banana plantations of Ruhango, highlighting the radiant joy and entrepreneurial spirit of young female artisans.',
    challenge: 'Balancing vivid African sunlight, tropical green vegetation, and delicate white woven textures without overexposing highlights.',
    solution: 'Used full-spectrum polarizing filters and ultra-wide latitude cinema sensors, capturing 16-stops of dynamic range with natural skin tone reproduction.',
    deliverables: [
      '60s Broadcast Commercial (Global TV)',
      'Print Billboard Suite for International Airports (London, Dubai, Kigali)',
      'Digital Motion Graphics & Kinetic Imigongo Patterns',
      '4K Archival Master Suite'
    ],
    credits: [
      { role: 'Creative Director', name: 'Kalisa Tuvugane' },
      { role: 'DP', name: 'Patrice Gasana' },
      { role: 'Colorist', name: 'Marc B.' },
      { role: 'Voiceover Artist', name: 'Grace Uwera' }
    ],
    metrics: [
      { label: 'Global Impressions', value: '11.2M' },
      { label: 'African Design Award', value: 'Gold Medal' },
      { label: 'Export Inquiries', value: '+62%' }
    ],
    accentColor: '#10b981',
    videoDuration: '01:15',
    videoUrl: '/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4',
    imageUrl: '/assets/aistudio/INK08776_806fd592.jpg',
    galleryImages: [
      {
        title: 'Artisan with the Agaseke Disc',
        caption: 'Natural sunlight in banana grove · 50mm Prime · Rich vibrant color grade',
        gradient: 'from-zinc-950 via-neutral-900 to-black',
        imageUrl: '/assets/aistudio/INK08776_806fd592.jpg'
      },
      {
        title: 'Sisal Fiber Weaving Macro Detail',
        caption: '100mm Macro · 4K 60fps · Tactile woven geometry',
        gradient: 'from-zinc-950 via-stone-900 to-black',
        imageUrl: '/assets/aistudio/INK08776_806fd592.jpg'
      }
    ]
  },
  {
    id: 'p5',
    slug: 'the-morning-pact',
    title: 'The Morning Pact',
    client: 'Kigali Independent Film Collective',
    year: '2023',
    category: 'Film & Documentary',
    categoryLabel: 'Cinematic Short Film (18 min)',
    role: 'Direction, Cinematography & Sound Design',
    summary: 'Two cane harvesters meet in the pre-dawn mist to resolve a generational land pact.',
    narrative: 'A quiet, intense chamber piece set against an epic outdoor landscape. Using minimal dialogue and deep atmospheric soundscapes, The Morning Pact examines trust, reconciliation, and the passage of time in rural Rwanda.',
    challenge: 'Capturing a 12-minute unbroken continuous tracking shot in dense sugarcane fields during the 20-minute golden window before sunrise.',
    solution: 'Rehearsed with Steadicam for four days and engineered a silent cable rig to float effortlessly alongside the actors through the reeds.',
    deliverables: [
      'Festival DCP (18 min)',
      'Surround Sound 5.1 Mix',
      'Behind-the-Scenes Cinematography Featurette'
    ],
    credits: [
      { role: 'Director & DP', name: 'Kalisa Tuvugane' },
      { role: 'Steadicam Operator', name: 'Christian Niyitegeka' },
      { role: 'Gaffer', name: 'Gilles Manzi' }
    ],
    metrics: [
      { label: 'Clermont-Ferrand', value: 'Official Selection' },
      { label: 'Cinematography Prize', value: 'Kigali Cine' }
    ],
    accentColor: '#c8a97e',
    videoDuration: '02:00',
    videoUrl: '/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4',
    imageUrl: '/assets/aistudio/MSG01940_1_783cf665.jpg',
    galleryImages: [
      {
        title: 'The Handshake in Golden Fog',
        caption: 'Steadicam tracking shot · Anamorphic flare · 1/48s 800 ISO',
        gradient: 'from-amber-950 via-stone-900 to-black',
        imageUrl: '/assets/aistudio/MSG01940_1_783cf665.jpg'
      }
    ]
  },
  {
    id: 'p6',
    slug: 'the-early-shift',
    title: 'The Early Shift',
    client: 'National Geographic Africa & Conservation International',
    year: '2023',
    category: 'Motion & 3D',
    categoryLabel: 'Visual Essay & Motion Craft',
    role: 'Cinematography, 3D Topographic Maps & Finishing',
    summary: 'The human ecosystem that powers the food sovereignty of the Great Lakes region.',
    narrative: 'Combining ground-level cinematography of dawn agricultural processions with satellite LiDAR point clouds and kinetic motion design, The Early Shift visualizes the biological pulse of East Africa’s terraced agricultural landscape.',
    challenge: 'Integrating photorealistic 3D terrain models seamlessly with handheld cinematic camera footage.',
    solution: 'Utilized drone photogrammetry and match-moving in Cinema 4D and Houdini to composite elevation data directly over the morning mist.',
    deliverables: [
      'Interactive Web Documentary Experience',
      'Broadcast 30s Promo',
      'Complete Motion Design Asset Library'
    ],
    credits: [
      { role: 'Lead Director', name: 'Aimé Mugisha' },
      { role: 'Motion Supervisor', name: 'Kalisa Tuvugane' },
      { role: '3D Artist', name: 'Elise Dupont' }
    ],
    metrics: [
      { label: 'Webby Nominee', value: 'Best Visual Design' },
      { label: 'Viewership', value: '4.8M+' }
    ],
    accentColor: '#3b82f6',
    videoDuration: '01:20',
    videoUrl: '/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4',
    imageUrl: '/assets/aistudio/MSG01932_1_d0a10631.jpg',
    galleryImages: [
      {
        title: 'Workers Entering the Mist',
        caption: '85mm T1.8 · Natural diffused morning light',
        gradient: 'from-zinc-950 via-neutral-900 to-black',
        imageUrl: '/assets/aistudio/MSG01932_1_d0a10631.jpg'
      }
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    number: '01',
    title: 'Film Production',
    tagline: 'Feature films, shorts, and narrative content that moves.',
    description: 'We manage full-scale narrative and commercial cinema pipelines. From remote wilderness expeditions in the Rwandan thousand hills to studio stages in Kigali, our cinema units operate large-format Arri and Red packages with prime anamorphic glass and precision grip systems.',
    deliverables: [
      'Feature-length and short narrative cinema',
      'High-altitude and rainforest remote expedition rigs',
      'Multi-camera setups and precision tracking dollies',
      'Licensed commercial aerial drone units'
    ],
    tools: ['Arri Alexa Mini LF', 'Red V-Raptor 8K', 'Cooke Anamorphic /i', 'Steadicam M-2']
  },
  {
    id: 's2',
    number: '02',
    title: 'Documentary',
    tagline: 'True stories, real people, unforgettable moments.',
    description: 'We believe documentary film is an act of trust and listening. We spend weeks building relationships on the ground before pressing record, capturing real human stories with visual elegance and cultural dignity that resonate at major international film festivals.',
    deliverables: [
      'Investigative conservation & cultural documentaries',
      'Archival research and oral history preservation',
      'Multi-lingual field interviews (Kinyarwanda, French, English, Swahili)',
      'Theatrical festival packaging & master DCP deliveries'
    ],
    tools: ['Sound Devices 833', 'Sennheiser MKH 416', 'Leica Summilux-M', 'Dolby Atmos Master']
  },
  {
    id: 's3',
    number: '03',
    title: 'Motion Design',
    tagline: 'Brand films, title sequences, and animated identity.',
    description: 'We bridge cinema with contemporary graphic art. Our motion design department crafts bespoke 3D worlds, procedural particle simulations, title sequences, and kinetic typography that give forward-thinking brands an unmistakable visual aura.',
    deliverables: [
      '3D procedural simulations & photorealistic CGI',
      'Kinetic typography & brand motion design systems',
      'Film title design and animated UI concepts',
      'Out-of-Home 3D anamorphic billboard animations'
    ],
    tools: ['Maxon Cinema 4D', 'SideFX Houdini', 'Octane / Redshift', 'Adobe After Effects']
  },
  {
    id: 's4',
    number: '04',
    title: 'Commercials',
    tagline: 'TV and digital ads built on craft, not just concept.',
    description: 'We conceive and execute bold commercial campaigns that command attention. From fashion houses to renewable energy pioneers, we translate complex brand visions into magnetic visual experiences with high cultural retention.',
    deliverables: [
      'Global 30s & 60s broadcast commercial films',
      'Social-first high-fashion cinematic lookbooks',
      'Product launch teaser sequences & keynote visuals',
      'Cross-platform multi-aspect ratio master suites'
    ],
    tools: ['Phantom Flex 4K High-Speed', 'Ronin 2 Stabilizers', 'Kinetic Lighting Rigs']
  },
  {
    id: 's5',
    number: '05',
    title: 'Post-Production',
    tagline: 'Colour, sound, VFX — finishing that earns attention.',
    description: 'Our in-house post-production suite in Kigali features calibrated Flanders Scientific HDR grading displays and DaVinci Resolve Advanced control panels. We develop custom film print emulation LUTs and master immersive 7.1 and Dolby Atmos sound mixes.',
    deliverables: [
      '4K HDR and SDR mastering in DaVinci Resolve',
      'Proprietary 35mm / 16mm photochemical film emulation',
      'Bespoke sound design, Foley recording & spatial mix',
      'Archival master LTO tape backups and DCP packages'
    ],
    tools: ['DaVinci Resolve Studio', 'Flanders Scientific XMP310', 'Pro Tools Ultimate']
  },
  {
    id: 's6',
    number: '06',
    title: 'Creative Strategy',
    tagline: 'Story-first thinking at the beginning of every brief.',
    description: 'Every project begins with a bespoke treatment. We collaborate with clients to clarify narrative purpose, tone of voice, aesthetic references, color palettes, and cultural resonance before a single frame is planned.',
    deliverables: [
      'Comprehensive director treatments & pitch decks',
      'Visual moodboards, color scripts & storyboards',
      'Casting, wardrobe curation & location scout books',
      'Cultural consulting and local narrative vetting'
    ],
    tools: ['Keynote Editorial', 'Frame.io Cloud Review', 'Shot Designer Pro']
  }
];

export const ARCHIVE_STILLS: ArchiveStill[] = [
  {
    id: 'a1',
    title: 'Impakanizi: Intore Warrior Silhouette',
    project: 'Impakanizi: The Sacred Step',
    location: 'Nyanza Royal Heritage Centre, Rwanda',
    camera: 'Red V-Raptor 8K VV',
    lens: 'Atlas Orion Anamorphic 65mm',
    exif: 'T2.0 · 1/120s · ISO 400 · Backlight',
    year: '2024',
    aspectRatio: 'portrait',
    gradient: 'from-amber-950 via-stone-900 to-black',
    imageUrl: '/assets/aistudio/iMpakanizi_66_b411b2d2.jpg'
  },
  {
    id: 'a2',
    title: 'Dukunde Kawa Highland Ridge',
    project: 'Dukunde Kawa: Single Origin',
    location: 'Musasa, Gakenke District, Northern Rwanda',
    camera: 'Leica M Monochrom',
    lens: 'Summilux-M 35mm f/1.4',
    exif: 'f/2.8 · 1/500s · ISO 320 · High Contrast',
    year: '2024',
    aspectRatio: 'landscape',
    gradient: 'from-zinc-900 via-neutral-900 to-black',
    imageUrl: '/assets/aistudio/dukunde_kawa_17_9888532a.jpg'
  },
  {
    id: 'a3',
    title: 'Agaseke Artisan in Banana Grove',
    project: 'Agaseke: Weaving Tomorrow',
    location: 'Ruhango, Southern Province, Rwanda',
    camera: 'Sony FX9 Cinema',
    lens: 'Zeiss Supreme Prime 50mm',
    exif: 'T2.0 · 1/250s · ISO 800 · Daylight',
    year: '2024',
    aspectRatio: 'landscape',
    gradient: 'from-zinc-950 via-neutral-900 to-black',
    imageUrl: '/assets/aistudio/INK08776_806fd592.jpg'
  },
  {
    id: 'a4',
    title: 'Dawn Cane Harvesters March',
    project: 'Voices from the Valley',
    location: 'Nyabarongo River Basin, Kigali Rural',
    camera: 'Arri Alexa Mini LF',
    lens: 'Cooke Anamorphic /i 40mm',
    exif: 'T2.3 · 1/48s · ISO 800 · Heavy Mist',
    year: '2024',
    aspectRatio: 'landscape',
    gradient: 'from-amber-950 via-zinc-900 to-black',
    imageUrl: '/assets/aistudio/new_1_2f61cc23.jpg'
  },
  {
    id: 'a5',
    title: 'The Handshake in Morning Haze',
    project: 'The Morning Pact',
    location: 'Akanyaru Valley, Southern Rwanda',
    camera: 'Red Komodo 6K',
    lens: 'Canon Cine-Servo 17-120mm',
    exif: 'T2.95 · 1/60s · ISO 640 · Low Sun',
    year: '2023',
    aspectRatio: 'portrait',
    gradient: 'from-stone-900 via-zinc-950 to-black',
    imageUrl: '/assets/aistudio/MSG01940_1_783cf665.jpg'
  },
  {
    id: 'a6',
    title: 'Procession with Farming Tools',
    project: 'The Early Shift',
    location: 'Kabuye Sugar Fields, Kigali Outskirts',
    camera: 'Arri Alexa 35',
    lens: 'Cooke S4/i 25mm',
    exif: 'T2.0 · 1/96s · ISO 400 · River Mist',
    year: '2023',
    aspectRatio: 'portrait',
    gradient: 'from-zinc-950 via-neutral-900 to-black',
    imageUrl: '/assets/aistudio/MSG01932_1_d0a10631.jpg'
  }
];

export const METHODOLOGY_STEPS = [
  {
    step: '01',
    title: 'Discovery & Truth',
    phase: 'Research & Immersion',
    description: 'We unearth the foundational heartbeat of the story. Whether a feature documentary or a brand commercial, we interrogate the core truth through field research, archival study, and cultural immersion.'
  },
  {
    step: '02',
    title: 'Treatment & Scoping',
    phase: 'Visual World-Building',
    description: 'We develop comprehensive director treatments, visual lookbooks, color scripts, and shot lists. Every frame, lighting setup, and camera movement is deliberate and agreed upon before production begins.'
  },
  {
    step: '03',
    title: 'Principal Production',
    phase: 'Cinematic Execution',
    description: 'Our cinema units deploy with disciplined agility. We balance technical mastery (large-format sensors, anamorphic optics, high-altitude stabilization) with deep human sensitivity on set.'
  },
  {
    step: '04',
    title: 'Post-Craft & Finishing',
    phase: 'Mastery & Delivery',
    description: 'In our calibrated Kigali grading suite, we sculpt the final image with analogue print emulation, intricate kinetic VFX, and spatial Dolby Atmos sound design, delivering flawless master packages.'
  }
];

export const FAQS: FaqItem[] = [
  {
    category: 'Studio & Location',
    question: 'Where is Tuvugane headquartered, and do you take international commissions?',
    answer: 'We are headquartered at KG 563 St, Kacyiru in Kigali, Rwanda. While our roots and principal post-production facilities are in Kigali, over 60% of our commissions originate internationally. We operate across East Africa, Europe, the Middle East, and the Americas with complete ATA Carnet equipment passports, bilingual crews, and low-latency remote director streaming.'
  },
  {
    category: 'Capabilities',
    question: 'What is the balance between live-action film and motion design at Tuvugane?',
    answer: 'We treat cinematography and motion design with equal parity under one roof. Our live-action films frequently incorporate sophisticated 3D architectural elements and kinetic typography, while our motion design projects are anchored in cinematic lighting and tangible texture.'
  },
  {
    category: 'Timelines & Delivery',
    question: 'What are typical turnaround times for commercial and documentary projects?',
    answer: 'Commercial and motion design campaigns typically range from 3 to 6 weeks from treatment sign-off to master delivery. Narrative and documentary features typically require 2 to 6 months depending on field expedition complexity and archival restoration.'
  },
  {
    category: 'Engaging Us',
    question: 'How should a client prepare a project brief or commission inquiry?',
    answer: 'The ideal brief includes your overarching narrative objective, target audience, preferred deliverables list (e.g. 60s commercial, 3x social cuts, 4K DCP), estimated timeline, and any initial aesthetic references. Submit our online inquiry form or email hello@tuvugane.com.'
  }
];

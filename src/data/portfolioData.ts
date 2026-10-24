import { Project, Service, ArchiveStill } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    slug: 'voices-from-the-valley',
    title: 'Voices from the Valley',
    client: 'Rwandan Cinema Fund & Arte France',
    year: '2024',
    category: 'Film & Documentary',
    categoryLabel: 'Documentary Feature (48 min)',
    role: 'Direction & Cinematography',
    summary: 'An observational poem documenting sugarcane harvesters in the misty Nyabarongo basin at dawn.',
    camera: 'Arri Alexa Mini LF · Cooke Anamorphic 40mm',
    aspectRatio: 'wide',
    accentColor: '#c8a97e',
    videoDuration: '00:51',
    videoUrl: '/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4',
    imageUrl: '/assets/aistudio/new_1_2f61cc23.jpg',
    credits: [
      { role: 'Director', name: 'Aimé Mugisha' },
      { role: 'Cinematographer (DP)', name: 'Kalisa Tuvugane' },
      { role: 'Sound', name: 'Jean-Luc Habiyaremye' }
    ],
    galleryImages: [
      {
        title: 'Dawn March across Nyabarongo',
        caption: 'Cooke Anamorphic 40mm · Natural mist',
        imageUrl: '/assets/aistudio/new_1_2f61cc23.jpg'
      },
      {
        title: 'The Handshake at the Canal',
        caption: '85mm T2.0 · 1/48s 800 ISO',
        imageUrl: '/assets/aistudio/MSG01940_1_783cf665.jpg'
      },
      {
        title: 'Procession with Tools',
        caption: '50mm Prime · Morning fog',
        imageUrl: '/assets/aistudio/MSG01932_1_d0a10631.jpg'
      }
    ]
  },
  {
    id: 'p2',
    slug: 'the-dawn-crossing',
    title: 'The Dawn Crossing',
    client: 'Kigali Independent Cinema',
    year: '2024',
    category: 'Film & Documentary',
    categoryLabel: 'Short Film',
    role: 'Principal Cinematography',
    summary: 'Silent wooden canoe crossings along the mist-draped river at first light.',
    camera: 'Red V-Raptor 8K · 35mm Prime',
    aspectRatio: 'landscape',
    accentColor: '#d4b996',
    videoDuration: '00:45',
    videoUrl: '/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4',
    imageUrl: '/assets/aistudio/1_The_Dawn_Crossing_b4f87c17.JPG',
    credits: [
      { role: 'Cinematographer', name: 'Kalisa Tuvugane' },
      { role: 'Colorist', name: 'Marc B.' }
    ],
    galleryImages: [
      {
        title: 'The Canoe Crossing',
        caption: '35mm Prime · Natural dawn light',
        imageUrl: '/assets/aistudio/1_The_Dawn_Crossing_b4f87c17.JPG'
      },
      {
        title: 'Wetland Basin at Dawn',
        caption: '8K LF Sensor · Heavy ambient fog',
        imageUrl: '/assets/aistudio/new_1_2f61cc23.jpg'
      }
    ]
  },
  {
    id: 'p3',
    slug: 'impakanizi-sacred-dance',
    title: 'Impakanizi: The Sacred Step',
    client: 'National Heritage & Goethe-Institut',
    year: '2024',
    category: 'Film & Documentary',
    categoryLabel: 'Cultural Cinema',
    role: 'Lighting & Direction',
    summary: 'The Intore warrior dancer framed as an amber silhouette against an incandescent dawn.',
    camera: 'Red 8K VV · Atlas Orion Anamorphic 65mm',
    aspectRatio: 'portrait',
    accentColor: '#f59e0b',
    videoDuration: '01:30',
    videoUrl: '/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4',
    imageUrl: '/assets/aistudio/iMpakanizi_66_b411b2d2.jpg',
    credits: [
      { role: 'Creative Director', name: 'Kalisa Tuvugane' },
      { role: 'Choreographer', name: 'François Ngarambe' },
      { role: 'Performer', name: 'Didier Mugiraneza' }
    ],
    galleryImages: [
      {
        title: 'Warrior Silhouette in Eclipse',
        caption: '10K Parabolic backlighting · 85mm T1.5',
        imageUrl: '/assets/aistudio/iMpakanizi_66_b411b2d2.jpg'
      }
    ]
  },
  {
    id: 'p4',
    slug: 'dukunde-kawa-single-origin',
    title: 'Dukunde Kawa: Single Origin',
    client: 'Dukunde Kawa Cooperative',
    year: '2024',
    category: 'Commercials',
    categoryLabel: 'Brand Campaign',
    role: 'Direction & B&W Cinematography',
    summary: 'High-contrast monochrome cinema honoring the highland coffee growers and milk carriers of Gakenke.',
    camera: 'Leica M Monochrom · Summilux 35mm f/1.4',
    aspectRatio: 'landscape',
    accentColor: '#ffffff',
    videoDuration: '01:45',
    videoUrl: '/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4',
    imageUrl: '/assets/aistudio/dukunde_kawa_17_9888532a.jpg',
    credits: [
      { role: 'Director', name: 'Kalisa Tuvugane' },
      { role: 'DP', name: 'Aimé Mugisha' },
      { role: 'Producer', name: 'Amina Uwase' }
    ],
    galleryImages: [
      {
        title: 'Carrier on Musasa Ridge',
        caption: 'Leica Monochrom · 35mm f/1.4',
        imageUrl: '/assets/aistudio/dukunde_kawa_17_9888532a.jpg'
      }
    ]
  },
  {
    id: 'p5',
    slug: 'agaseke-weaving-tomorrow',
    title: 'Agaseke: Weaving Tomorrow',
    client: 'Rwanda Development Board (RDB)',
    year: '2024',
    category: 'Commercials',
    categoryLabel: 'National Campaign',
    role: 'Creative Direction & Cinematography',
    summary: 'A celebration of the Agaseke peace basket as a symbol of female sovereignty and timeless geometry.',
    camera: 'Sony FX9 · Zeiss Supreme Prime 50mm',
    aspectRatio: 'landscape',
    accentColor: '#10b981',
    videoDuration: '01:15',
    videoUrl: '/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4',
    imageUrl: '/assets/aistudio/INK08776_806fd592.jpg',
    credits: [
      { role: 'Creative Director', name: 'Kalisa Tuvugane' },
      { role: 'DP', name: 'Patrice Gasana' },
      { role: 'Colorist', name: 'Marc B.' }
    ],
    galleryImages: [
      {
        title: 'Artisan in Banana Grove',
        caption: '50mm Prime · Natural sunlight',
        imageUrl: '/assets/aistudio/INK08776_806fd592.jpg'
      }
    ]
  },
  {
    id: 'p6',
    slug: 'anitha-in-shadow-and-light',
    title: 'Anitha: In Shadow and Light',
    client: 'Editorial Monograph',
    year: '2024',
    category: 'Film & Documentary',
    categoryLabel: 'Portraiture & Study',
    role: 'Portrait Direction & Lighting',
    summary: 'An intimate chiaroscuro exploration of human presence, quiet dignity, and natural luminescence.',
    camera: 'Medium Format Sensor · 90mm T2.0',
    aspectRatio: 'portrait',
    accentColor: '#e0c9a6',
    imageUrl: '/assets/aistudio/ASP_ANITHA_70_51cb7ec8.JPG',
    credits: [
      { role: 'Photographer & DP', name: 'Kalisa Tuvugane' },
      { role: 'Light Design', name: 'Aimé Mugisha' }
    ],
    galleryImages: [
      {
        title: 'Anitha Study I',
        caption: 'Chiaroscuro keylight · 90mm T2.0',
        imageUrl: '/assets/aistudio/ASP_ANITHA_70_51cb7ec8.JPG'
      }
    ]
  },
  {
    id: 'p7',
    slug: 'pillars-of-tomorrow',
    title: 'Pillars of Tomorrow',
    client: 'African Architecture Guild',
    year: '2023',
    category: 'Motion & 3D',
    categoryLabel: 'Spatial Motion',
    role: '3D Simulation & Direction',
    summary: 'Kinetic architectural study exploring brutalist tropical form, shadow volumes, and futuristic geometry.',
    camera: 'Houdini / Octane · 8K Virtual Stage',
    aspectRatio: 'landscape',
    accentColor: '#71717a',
    videoDuration: '00:30',
    videoUrl: '/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4',
    imageUrl: '/assets/aistudio/5_The_Pillars_of_Tomorrow_3f536592.JPG',
    credits: [
      { role: 'Motion Director', name: 'David Rukundo' },
      { role: '3D Artist', name: 'Kalisa Tuvugane' }
    ],
    galleryImages: [
      {
        title: 'Architectural Monoliths',
        caption: 'Procedural raytracing · Octane Render',
        imageUrl: '/assets/aistudio/5_The_Pillars_of_Tomorrow_3f536592.JPG'
      }
    ]
  },
  {
    id: 'p8',
    slug: 'the-morning-pact',
    title: 'The Morning Pact',
    client: 'Kigali Independent Film Collective',
    year: '2023',
    category: 'Film & Documentary',
    categoryLabel: 'Short Film',
    role: 'Direction & Steadicam',
    summary: 'Two cane harvesters meet in the pre-dawn mist to resolve a generational pact.',
    camera: 'Arri Alexa LF · 85mm T1.5 Steadicam',
    aspectRatio: 'landscape',
    accentColor: '#c8a97e',
    videoDuration: '02:00',
    videoUrl: '/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4',
    imageUrl: '/assets/aistudio/MSG01940_1_783cf665.jpg',
    credits: [
      { role: 'Director & DP', name: 'Kalisa Tuvugane' },
      { role: 'Steadicam Operator', name: 'Christian Niyitegeka' }
    ],
    galleryImages: [
      {
        title: 'The Handshake in Fog',
        caption: 'Steadicam tracking shot · Anamorphic flare',
        imageUrl: '/assets/aistudio/MSG01940_1_783cf665.jpg'
      }
    ]
  },
  {
    id: 'p9',
    slug: 'the-early-shift',
    title: 'The Early Shift',
    client: 'National Geographic Africa',
    year: '2023',
    category: 'Film & Documentary',
    categoryLabel: 'Documentary Short',
    role: 'Field Cinematography',
    summary: 'The collective march to the fields before the sun clears the eastern ridges.',
    camera: 'Arri Alexa Mini · Cooke 50mm Prime',
    aspectRatio: 'landscape',
    accentColor: '#9ca3af',
    videoDuration: '01:10',
    imageUrl: '/assets/aistudio/MSG01932_1_d0a10631.jpg',
    credits: [
      { role: 'Cinematographer', name: 'Aimé Mugisha' },
      { role: 'Field Recordist', name: 'Jean-Luc Habiyaremye' }
    ],
    galleryImages: [
      {
        title: 'Procession with Sickles',
        caption: 'Cooke 50mm · Heavy dawn mist',
        imageUrl: '/assets/aistudio/MSG01932_1_d0a10631.jpg'
      }
    ]
  },
  {
    id: 'p10',
    slug: 'studio-diaries-kigali',
    title: 'On Set in Kigali',
    client: 'Tuvugane Studio Archive',
    year: '2024',
    category: 'Film & Documentary',
    categoryLabel: 'Production Diary',
    role: 'Behind the Lens Documentation',
    summary: 'Production crew on location in Rwanda, orchestrating large-format cinema packages.',
    camera: '35mm Film Camera · 40mm Lens',
    aspectRatio: 'landscape',
    accentColor: '#ffffff',
    imageUrl: '/assets/aistudio/trn_staff3_3_5b9708db.JPG',
    credits: [
      { role: 'Crew Photography', name: 'Tuvugane Collective' },
      { role: 'Location', name: 'Kigali, Rwanda' }
    ],
    galleryImages: [
      {
        title: 'Camera Team on Set',
        caption: 'Kigali location · 35mm still',
        imageUrl: '/assets/aistudio/trn_staff3_3_5b9708db.JPG'
      }
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    number: '01',
    title: 'Film Production',
    tagline: 'Feature films, shorts, and narrative cinema.',
    description: 'Large-format Arri and Red packages with prime anamorphic glass and precision grip systems.',
    imageUrl: '/assets/aistudio/new_1_2f61cc23.jpg'
  },
  {
    id: 's2',
    number: '02',
    title: 'Documentary',
    tagline: 'True stories, real people, cultural listening.',
    description: 'Immersive observational filmmaking rooted in trust, community, and visual elegance.',
    imageUrl: '/assets/aistudio/MSG01940_1_783cf665.jpg'
  },
  {
    id: 's3',
    number: '03',
    title: 'Motion Design',
    tagline: 'Brand films, title sequences, 3D simulations.',
    description: 'Kinetic typography, procedural simulations, and title craft for forward-thinking brands.',
    imageUrl: '/assets/aistudio/5_The_Pillars_of_Tomorrow_3f536592.JPG'
  },
  {
    id: 's4',
    number: '04',
    title: 'Commercials',
    tagline: 'TV and digital campaigns built on craft.',
    description: 'Magnetic visual campaigns with cultural retention and cinematic production values.',
    imageUrl: '/assets/aistudio/dukunde_kawa_17_9888532a.jpg'
  },
  {
    id: 's5',
    number: '05',
    title: 'Post-Production',
    tagline: 'Color grading, 35mm film emulation, sound.',
    description: 'In-house DaVinci Resolve color suite and spatial Atmos sound design.',
    imageUrl: '/assets/aistudio/1_The_Dawn_Crossing_b4f87c17.JPG'
  },
  {
    id: 's6',
    number: '06',
    title: 'Creative Direction',
    tagline: 'Story-first treatments and aesthetic vision.',
    description: 'Narrative purpose, aesthetic direction, and cultural consultation before a single frame is shot.',
    imageUrl: '/assets/aistudio/ASP_ANITHA_70_51cb7ec8.JPG'
  }
];

export const ARCHIVE_STILLS: ArchiveStill[] = [
  {
    id: 'a1',
    title: 'Impakanizi: Intore Warrior Silhouette',
    project: 'Impakanizi',
    location: 'Nyanza Royal Heritage, Rwanda',
    camera: 'Red V-Raptor 8K VV',
    lens: 'Atlas Orion Anamorphic 65mm',
    exif: 'T2.0 · 1/120s · ISO 400',
    year: '2024',
    aspectRatio: 'portrait',
    imageUrl: '/assets/aistudio/iMpakanizi_66_b411b2d2.jpg',
    description: 'The sacred posture of traditional Rwandan dance backlit by an incandescent amber sun.'
  },
  {
    id: 'a2',
    title: 'Dukunde Kawa Highland Ridge',
    project: 'Dukunde Kawa',
    location: 'Musasa, Gakenke District',
    camera: 'Leica M Monochrom',
    lens: 'Summilux-M 35mm f/1.4',
    exif: 'f/2.8 · 1/500s · ISO 320',
    year: '2024',
    aspectRatio: 'landscape',
    imageUrl: '/assets/aistudio/dukunde_kawa_17_9888532a.jpg',
    description: 'Highland coffee farmer navigating steep terraced volcanic ridges in monochrome mist.'
  },
  {
    id: 'a3',
    title: 'Agaseke Artisan in Banana Grove',
    project: 'Agaseke',
    location: 'Ruhango, Southern Rwanda',
    camera: 'Sony FX9 Cinema',
    lens: 'Zeiss Supreme Prime 50mm',
    exif: 'T2.0 · 1/250s · ISO 800',
    year: '2024',
    aspectRatio: 'landscape',
    imageUrl: '/assets/aistudio/INK08776_806fd592.jpg',
    description: 'Master weaver shaping natural sisal fibers into the iconic peace basket in dappled sunlight.'
  },
  {
    id: 'a4',
    title: 'Dawn Cane Harvesters March',
    project: 'Voices from the Valley',
    location: 'Nyabarongo Basin',
    camera: 'Arri Alexa Mini LF',
    lens: 'Cooke Anamorphic /i 40mm',
    exif: 'T2.3 · 1/48s · ISO 800',
    year: '2024',
    aspectRatio: 'landscape',
    imageUrl: '/assets/aistudio/new_1_2f61cc23.jpg',
    description: 'Pre-dawn river march through dense water mist along the low-lying river plains.'
  },
  {
    id: 'a5',
    title: 'The Handshake at the Canal',
    project: 'The Morning Pact',
    location: 'Nyabarongo Canals',
    camera: 'Arri Alexa LF',
    lens: '85mm T1.5 Steadicam',
    exif: 'T1.5 · 1/48s · ISO 800',
    year: '2023',
    aspectRatio: 'landscape',
    imageUrl: '/assets/aistudio/MSG01940_1_783cf665.jpg',
    description: 'Reconciliation ritual captured in natural golden sunrise backlight.'
  },
  {
    id: 'a6',
    title: 'The Dawn Crossing',
    project: 'The Dawn Crossing',
    location: 'Nyabarongo River',
    camera: 'Red V-Raptor 8K',
    lens: '35mm Prime Lens',
    exif: 'T2.8 · 1/50s · ISO 400',
    year: '2024',
    aspectRatio: 'landscape',
    imageUrl: '/assets/aistudio/1_The_Dawn_Crossing_b4f87c17.JPG',
    description: 'Solitary wooden cane vessel crossing the still waters at first light.'
  },
  {
    id: 'a7',
    title: 'Anitha: Portraiture in Chiaroscuro',
    project: 'Studio Monograph',
    location: 'Studio Kacyiru, Kigali',
    camera: 'Medium Format Digital',
    lens: '90mm T2.0 Studio Prime',
    exif: 'f/2.0 · 1/160s · ISO 100',
    year: '2024',
    aspectRatio: 'portrait',
    imageUrl: '/assets/aistudio/ASP_ANITHA_70_51cb7ec8.JPG',
    description: 'Quiet human expression and sculpted natural side-lighting in our studio space.'
  },
  {
    id: 'a8',
    title: 'Pillars of Tomorrow: Monoliths',
    project: 'Pillars of Tomorrow',
    location: 'Virtual Production Stage',
    camera: 'Procedural 8K Render',
    lens: 'Virtual 24mm Anamorphic',
    exif: 'ACEScg Color Space',
    year: '2023',
    aspectRatio: 'landscape',
    imageUrl: '/assets/aistudio/5_The_Pillars_of_Tomorrow_3f536592.JPG',
    description: 'Architectural shadows and geometric volumes in tropical dawn light.'
  },
  {
    id: 'a9',
    title: 'Procession with Tools',
    project: 'The Early Shift',
    location: 'Nyabarongo Marshes',
    camera: 'Arri Alexa Mini',
    lens: 'Cooke 50mm Prime',
    exif: 'T2.8 · 1/50s · ISO 800',
    year: '2023',
    aspectRatio: 'landscape',
    imageUrl: '/assets/aistudio/MSG01932_1_d0a10631.jpg',
    description: 'Silhouetted procession of harvesters moving through tall sugarcane stalks.'
  },
  {
    id: 'a10',
    title: 'On Set in Kigali',
    project: 'Studio Diaries',
    location: 'Kigali, Rwanda',
    camera: 'Leica 35mm Still',
    lens: '40mm Prime',
    exif: '1/125s · ISO 400',
    year: '2024',
    aspectRatio: 'landscape',
    imageUrl: '/assets/aistudio/trn_staff3_3_5b9708db.JPG',
    description: 'Tuvugane production crew on set in Rwanda documenting cinema narratives.'
  }
];

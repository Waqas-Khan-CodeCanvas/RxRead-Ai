// ─── Mock prescription result data ───────────────────────────────────────────
export const mockPrescriptionData = {
  id: 'rx-2024-001',
  analyzedAt: '2024-01-15T10:30:00Z',
  confidenceScore: 94,

  doctor: {
    name: 'Dr. Aisha Rehman',
    specialization: 'General Physician & Internal Medicine',
    hospital: 'Shifa International Hospital',
    city: 'Islamabad, Pakistan',
    license: 'PMDC-12345',
  },

  patient: {
    name: 'Muhammad Ali',
    age: 35,
    date: '15 January 2024',
  },

  summary: {
    en: 'You have been prescribed 4 medications for a respiratory infection with fever. Take all medicines on time and complete the full course. Avoid cold drinks and rest well.',
    ur: 'آپ کو سانس کی تکلیف اور بخار کے لیے 4 دوائیں تجویز کی گئی ہیں۔ تمام دوائیں وقت پر لیں اور پورا کورس مکمل کریں۔',
    ps: 'تاسو د سږي د ناروغۍ او تبې لپاره ۴ درمل تجویز شوي دي. ټول درمل په وخت واخلئ او بشپړ کورس بشپړ کړئ.',
    pa: 'ਤੁਹਾਨੂੰ ਸਾਹ ਦੀ ਲਾਗ ਅਤੇ ਬੁਖਾਰ ਲਈ 4 ਦਵਾਈਆਂ ਦਿੱਤੀਆਂ ਗਈਆਂ ਹਨ। ਸਾਰੀਆਂ ਦਵਾਈਆਂ ਸਮੇਂ ਸਿਰ ਲਓ।',
    ar: 'لقد صُرفت لك 4 أدوية لعلاج التهاب الجهاز التنفسي مع الحمى. تناول جميع الأدوية في الوقت المحدد وأكمل الجرعة الكاملة.',
  },

  medicines: [
    {
      id: 1,
      name: 'Amoxicillin',
      brandName: 'Amoxil',
      type: 'Antibiotic',
      dosage: '500mg',
      frequency: 'Three times a day (Morning, Afternoon, Night)',
      duration: '7 days',
      purpose: 'Treats bacterial infection causing your throat and chest symptoms',
      instructions: 'Take with food to avoid stomach upset. Complete the full 7-day course even if you feel better.',
      warnings: ['Do not skip doses', 'Tell doctor if you are allergic to penicillin', 'May cause mild stomach upset'],
      color: 'blue',
      icon: '💊',
    },
    {
      id: 2,
      name: 'Paracetamol',
      brandName: 'Panadol / Disprin',
      type: 'Painkiller & Fever Reducer',
      dosage: '1000mg (2 tablets of 500mg)',
      frequency: 'Every 6 hours when needed for fever or pain',
      duration: 'As needed, max 5 days',
      purpose: 'Reduces your fever and relieves body aches and headache',
      instructions: 'Do not exceed 4g (8 tablets of 500mg) in 24 hours. Take with water.',
      warnings: ['Do not take with alcohol', 'Avoid if you have liver disease', 'Do not exceed recommended dose'],
      color: 'green',
      icon: '🌡️',
    },
    {
      id: 3,
      name: 'Cetirizine',
      brandName: 'Zyrtec / Alaryl',
      type: 'Antihistamine',
      dosage: '10mg',
      frequency: 'Once daily at bedtime',
      duration: '5 days',
      purpose: 'Relieves runny nose, sneezing, and throat irritation',
      instructions: 'Take at night as it may cause drowsiness. Do not drive after taking this medicine.',
      warnings: ['May cause drowsiness', 'Avoid alcohol', 'Do not drive or operate heavy machinery'],
      color: 'purple',
      icon: '🤧',
    },
    {
      id: 4,
      name: 'Vitamin C',
      brandName: 'Redoxon / Celin',
      type: 'Supplement',
      dosage: '1000mg',
      frequency: 'Once daily (Morning)',
      duration: '14 days',
      purpose: 'Boosts your immune system to help fight the infection faster',
      instructions: 'Can be taken with or without food. Effervescent tablet — dissolve in water before drinking.',
      warnings: ['High doses may cause stomach upset', 'Inform doctor if you have kidney stones'],
      color: 'orange',
      icon: '🍊',
    },
  ],

  specialNotes: {
    en: [
      'Drink at least 8-10 glasses of water daily',
      'Rest and avoid strenuous physical activity for 3–4 days',
      'Avoid cold drinks, ice cream, and cold weather exposure',
      'Return to clinic if fever persists beyond 3 days or worsens',
      'Eat light, warm, easily digestible foods',
    ],
    ur: [
      'روزانہ کم از کم 8-10 گلاس پانی پئیں',
      '3-4 دن آرام کریں اور سخت ورزش سے گریز کریں',
      'ٹھنڈے مشروبات اور آئس کریم سے پرہیز کریں',
      'اگر 3 دن سے زیادہ بخار رہے تو دوبارہ ڈاکٹر سے ملیں',
    ],
    ps: [
      'هره ورځ لږ تر لږه ۸-۱۰ ګیلاسه اوبه وڅښئ',
      '۳-۴ ورځې آرام وکړئ او د سختو فعالیتونو مخه ونیسئ',
    ],
    pa: [
      'ਰੋਜ਼ਾਨਾ ਘੱਟੋ-ਘੱਟ 8-10 ਗਲਾਸ ਪਾਣੀ ਪੀਓ',
      '3-4 ਦਿਨ ਆਰਾਮ ਕਰੋ',
    ],
    ar: [
      'اشرب ما لا يقل عن 8-10 أكواب من الماء يومياً',
      'استرح وتجنب المجهود البدني لمدة 3-4 أيام',
      'تجنب المشروبات الباردة والآيس كريم',
    ],
  },

  followUp: 'Return after 7 days or immediately if symptoms worsen',
}

// ─── Testimonials ────────────────────────────────────────────────────────────
export const testimonials = [
  {
    id: 1,
    name: 'Fatima Khan',
    role: 'Patient, Lahore',
    avatar: 'FK',
    rating: 5,
    text: 'My mother is 70 and cannot read English prescriptions. MediRead AI explained everything in simple Urdu — it was a life-changing experience for our family.',
  },
  {
    id: 2,
    name: 'Dr. Bilal Mahmood',
    role: 'General Physician, Karachi',
    avatar: 'BM',
    rating: 5,
    text: 'I recommend this app to my patients who struggle to understand prescriptions. It accurately represents what I write and explains it clearly.',
  },
  {
    id: 3,
    name: 'Sana Yousaf',
    role: 'Caregiver, Peshawar',
    avatar: 'SY',
    rating: 5,
    text: 'Taking care of elderly parents is hard. MediRead helps me manage all their medicines correctly. The audio feature is fantastic for my father who cannot read.',
  },
  {
    id: 4,
    name: 'Ahmed Raza',
    role: 'Patient, Islamabad',
    avatar: 'AR',
    rating: 4,
    text: 'The confidence score feature is brilliant. I know exactly how reliable the reading is. Saved me from a potential wrong dosage mistake.',
  },
]

// ─── Language options ─────────────────────────────────────────────────────────
export const languages = [
  { code: 'en', label: 'English',  nativeLabel: 'English',  flag: '🇬🇧', dir: 'ltr' },
  { code: 'ur', label: 'Urdu',     nativeLabel: 'اردو',     flag: '🇵🇰', dir: 'rtl' },
  { code: 'ps', label: 'Pashto',   nativeLabel: 'پښتو',     flag: '🏔️', dir: 'rtl' },
  { code: 'pa', label: 'Punjabi',  nativeLabel: 'ਪੰਜਾਬੀ',  flag: '🌾', dir: 'ltr' },
  { code: 'ar', label: 'Arabic',   nativeLabel: 'العربية',  flag: '🇸🇦', dir: 'rtl' },
]

// ─── Processing steps ─────────────────────────────────────────────────────────
export const processingSteps = [
  { id: 1, label: 'Uploading Image',          icon: '📤', duration: 1200 },
  { id: 2, label: 'Reading Prescription',     icon: '👁️', duration: 1800 },
  { id: 3, label: 'Identifying Medicines',    icon: '💊', duration: 2000 },
  { id: 4, label: 'Generating Instructions',  icon: '📋', duration: 1500 },
  { id: 5, label: 'Preparing Results',        icon: '✨', duration: 1000 },
]

// ─── Features ─────────────────────────────────────────────────────────────────
export const features = [
  {
    icon: '🔍',
    title: 'AI-Powered Reading',
    description: 'Advanced OCR technology reads even the most difficult handwritten prescriptions with high accuracy.',
  },
  {
    icon: '🌐',
    title: 'Multi-Language Support',
    description: 'Get your prescription explained in Urdu, Pashto, Punjabi, Arabic, or English.',
  },
  {
    icon: '🔊',
    title: 'Audio Readout',
    description: 'Listen to your prescription instructions with our text-to-speech feature — perfect for low-literacy users.',
  },
  {
    icon: '⚠️',
    title: 'Warning Alerts',
    description: 'Automatic detection of drug interactions, dosage warnings, and allergy-related alerts.',
  },
  {
    icon: '📊',
    title: 'Confidence Score',
    description: 'Know exactly how confident the AI is in its reading so you can verify with your doctor when needed.',
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    description: 'Your prescription images are processed securely and never stored on our servers.',
  },
]

// ─── How it works steps ───────────────────────────────────────────────────────
export const howItWorksSteps = [
  {
    step: '01',
    title: 'Upload Prescription',
    description: 'Take a photo or upload an image of your handwritten prescription from any device.',
    icon: '📱',
  },
  {
    step: '02',
    title: 'AI Analyzes',
    description: 'Our AI reads the handwriting, identifies medicines, dosages, and doctor instructions.',
    icon: '🤖',
  },
  {
    step: '03',
    title: 'Understand Clearly',
    description: 'Get a simple, clear breakdown of every medicine, how to take it, and what to watch out for.',
    icon: '💡',
  },
]
export interface Service {
  num: string
  title: string
  description: string
  tags: string[]
  colorClass: string
  isLight: boolean
  emoji: string
  image?: string
}

export interface GalleryGroup {
  cat: string
  title: string
  emoji: string
  g1: string
  g2: string
  caption: string
  category: string
  images: string[]
}

/* ---------- helpers ---------- */

const STORAGE =
  "https://lnxlzzrcmwfnnbpmepcr.supabase.co/storage/v1/object/public/images"

const S = (folder: string, file: string) => `${STORAGE}/${folder}/${file}`

/* ---------- services ---------- */

export const services: Service[] = [
  {
    num: "01", title: "تنسيق ورد",
    description: "وردٌ يحكي مزاج المناسبة: ممرّات، جداريات، وبوكيهات تُقطَف ذوقًا قبل أن تُقطَف لونًا.",
    tags: ["ممرات وردية", "جداريات زهور", "بوكيهات"],
    colorClass: "c1", isLight: true, emoji: "🌸",
    image: S("wrd", "entr.webp")
  },
  {
    num: "02", title: "حفل تخرج",
    description: "فرحة النجاح تستحق إطارًا يليق بها: ركن تصوير، لوحات تهنئة، وإضاءة تحتفي بالمجتهد.",
    tags: ["ركن تصوير", "لوحات تهنئة", "إضاءة احتفالية"],
    colorClass: "c2", isLight: true, emoji: "🎓",
    image: S("graduation", "1.jpg")
  },
  {
    num: "03", title: "خطوبة",
    description: "بداية الحكاية أجملُ حين تُروى بمشهدٍ دافئ: كوشة خطوبة وضيافةٌ تُذكَر.",
    tags: ["كوشة خطوبة", "طاولات ضيافة", "إنارة دافئة"],
    colorClass: "c3", isLight: true, emoji: "💍",
    image: S("khotoba", "1.webp")
  },
  {
    num: "04", title: "عيد ميلاد",
    description: "عمرٌ جديد يُحتفَل على طريقتك: ثيم حسب الطلب، ركن حلويات، وأقواس بالونات.",
    tags: ["ثيم مخصص", "ركن حلويات", "بالونات وأقواس"],
    colorClass: "c4", isLight: false, emoji: "🎂",
    image: S("birth_day", "1.jpg")
  },
  {
    num: "05", title: "كوش أفراح",
    description: "عرشُ الليلة كلّها: تصميمٌ حصري بخامات فاخرة يتناغم مع هندسة القاعة.",
    tags: ["تصميم حصري", "خامات فاخرة", "تناغم مع القاعة"],
    colorClass: "c5", isLight: false, emoji: "👑",
    image: S("kosha", "1.jpg")
  },
  {
    num: "06", title: "ولائم",
    description: "ضيافةٌ تُذكر: طاولات منسّقة، بوفيهات أنيقة، وأدوات تُشرّف أصحاب الدعوة.",
    tags: ["تنسيق طاولات", "بوفيهات أنيقة", "أدوات فاخرة"],
    colorClass: "c6", isLight: false, emoji: "🍽️",
    image: S("wlaim", "1.jpg")
  },
  {
    num: "07", title: "تنسيق داخلي كامل",
    description: "القاعة تتحوّل كليًا: إضاءة معمارية، أسقف وستائر، ومسرحٌ وممرّات تستقبل الضيوف.",
    tags: ["إضاءة معمارية", "أسقف وستائر", "مسرح وممرات"],
    colorClass: "c7", isLight: false, emoji: "🕯️",
    image: S("inner_space", "1.jpg")
  },
  {
    num: "08", title: "تنسيق خارجي كامل",
    description: "تحت السماء نرتّب الفرح: خيام ملكية، جلسات خارجية، وإنارةٌ معلّقة كالنجوم.",
    tags: ["خيام ملكية", "جلسات خارجية", "إنارة معلقة"],
    colorClass: "c8", isLight: false, emoji: "⛺",
    image: S("outer_space", "1.jpg")
  },
]

/* ---------- gallery (8 groups, 1 per category) ---------- */

export const gallery: GalleryGroup[] = [
  {
    cat: "ورد", title: "جدار وردٍ متدرّج", emoji: "🌸",
    g1: "#E7CBE2", g2: "#C489B1",
    caption: "جدار وردٍ متدرّج", category: "تنسيق ورد",
    images: ["entr.webp", "girly.jpg", "um.jpg", "welcome.webp"].map(f => S("wrd", f)),
  },
  {
    cat: "كوش", title: "كوشة عرسٍ بلون التوت", emoji: "👑",
    g1: "#8E3A62", g2: "#5C315C",
    caption: "كوشة عرسٍ بلون التوت", category: "كوش",
    images: ["1.jpg","2.jpg","3.webp","4.jpg","5.jpg","6.webp","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.webp","15.jpg","16.png"].map(f => S("kosha", f)),
  },
  {
    cat: "تخرج", title: "ركن تهنئة التخرج", emoji: "🎓",
    g1: "#C489B1", g2: "#7A2F52",
    caption: "ركن تهنئة التخرج", category: "تخرج",
    images: ["1.jpg", "2.webp", "3.jpg", "4.jpg"].map(f => S("graduation", f)),
  },
  {
    cat: "ميلاد", title: "ثيم ميلادٍ وردي", emoji: "🎂",
    g1: "#F1E3EE", g2: "#C489B1",
    caption: "ثيم ميلادٍ وردي", category: "ميلاد",
    images: ["1.jpg", "2.jpg", "3.webp", "4.jpg"].map(f => S("birth_day", f)),
  },
  {
    cat: "خطوبة", title: "طاولة خطوبةٍ دافئة", emoji: "💍",
    g1: "#A96795", g2: "#5C315C",
    caption: "طاولة خطوبةٍ دافئة", category: "خطوبة",
    images: ["1.webp"].map(f => S("khotoba", f)),
  },
  {
    cat: "ولائم", title: "طاولات وليمةٍ ملكية", emoji: "🍽️",
    g1: "#7A2F52", g2: "#421D36",
    caption: "طاولات وليمةٍ ملكية", category: "ولائم",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.webp", "5.webp", "6.jpg"].map(f => S("wlaim", f)),
  },
  {
    cat: "داخلي", title: "قاعةٌ مضاءة بالثريات", emoji: "🕯️",
    g1: "#5C315C", g2: "#C489B1",
    caption: "قاعةٌ مضاءة بالثريات", category: "داخلي كامل",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"].map(f => S("inner_space", f)),
  },
  {
    cat: "خارجي", title: "جلسةٌ تحت الإنارة", emoji: "⛺",
    g1: "#421D36", g2: "#A96795",
    caption: "جلسةٌ تحت الإنارة", category: "خارجي كامل",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.webp"].map(f => S("outer_space", f)),
  },
]

/* ---------- marquee / voices / nav ---------- */

export const MARQUEE_ITEMS = [
  "تنسيق ورد", "حفل تخرج", "خطوبة", "عيد ميلاد", "كوش أفراح", "ولائم", "تنسيق داخلي كامل", "تنسيق خارجي كامل",
]

export const VOICES = [
  { text: "«دخلت القاعة قبل العرس بساعة ولم أصدّق أنها نفس القاعة! الكوشة والممرّ فاقا التصور.»", author: "أم فيصل — عرس" },
  { text: "«ركن التخرج لابنتي كان لوحة؛ كل ضيف صوّر عنده. تنظيمٌ والتزامٌ بالموعد حرفيًا.»", author: "أبو سارة — حفل تخرج" },
  { text: "«ثيم عيد الميلاد طابق شخصية ابني تمامًا، والحلويات مرتّبة كأنها معرض. شكرًا تولكان!»", author: "نورة العتيبي — عيد ميلاد" },
  { text: "«وليمة الخطوبة كانت فخمة وذوقًا عاليًا؛ الطاولات والورد والإضاءة تناغمٌ غريب.»", author: "عائلة الحربي — خطوبة" },
]

export const NAV_LINKS = [
  { href: "#services", label: "تخصصاتنا" },
  { href: "#musicians", label: "عازفينا" },
  { href: "#steps",    label: "طريقتنا" },
  { href: "#voices",   label: "آراء العملاء" },
]
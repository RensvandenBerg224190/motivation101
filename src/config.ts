/**
 * Central config for Joe's site.
 *
 * The application form posts directly to Joe's existing Google Form
 * ("MOTIVATION 101 — COACHING APPLICATION"), so every submission keeps
 * landing in the same Google Forms responses / spreadsheet he uses today.
 *
 * NOTE: the Google Form has no name/email question, so contact details
 * collected on this site are appended to the "#1 goal" answer (first
 * column in his sheet). If Joe adds real Name/Email questions to the
 * form later, add their entry IDs below and drop the append logic in
 * ApplicationForm.tsx.
 */
export const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSfsYw72Tvg0iM0GBQxI2YGYi4yy2pS7r3gah7s6OmxS3j9ONA/formResponse'

export const FORM_ENTRIES = {
  goal: 'entry.942024293', // What is your #1 goal right now?
  obstacles: 'entry.2033261766', // What are the biggest things holding you back?
  ninetyDays: 'entry.3108560', // What would you like to accomplish over the next 90 days?
  fitnessLevel: 'entry.1335918544', // How would you describe your current fitness level?
  seriousness: 'entry.1687922932', // How serious are you about changing your life?
  invest: 'entry.736672866', // Are you financially prepared to invest...? ("Yes" | "No")
} as const

export const SOCIALS = {
  instagram: 'https://www.instagram.com/theebigjoe',
  youtube: 'https://www.youtube.com/@theebigjoe',
  facebook: 'https://www.facebook.com/joe.hawley.165',
} as const

/**
 * Store products. checkoutUrl points at Joe's Gumroad product; Gumroad
 * handles payment, VAT, and instant PDF delivery, so the static site
 * needs zero backend. Swap the URL here if the store moves elsewhere.
 */
export const STORE = {
  ebook: {
    title: 'The First 90 Days: Sober & Strong',
    tagline: 'The no-BS playbook to quit drinking, build real strength, and take your life back.',
    price: '$29',
    cover: '/images/ebook-first90-cover.jpg',
    checkoutUrl: 'https://theebigjoe.gumroad.com/l/first90',
  },
  comingSoon: {
    title: 'Motivation 101: The Daily Playbook',
    tagline: 'Routines, standards, and the daily habits behind the discipline.',
  },
} as const

export const REELS = [
  {
    quote: 'Pray as hard as you train',
    image: '/images/reel_pray.jpg',
    url: 'https://www.instagram.com/theebigjoe/reel/DcY8E1lx49h/',
  },
  {
    quote: 'Money is not the problem',
    image: '/images/reel_money.jpg',
    url: 'https://www.instagram.com/theebigjoe/reel/Dc7BnMnBSin/',
  },
  {
    quote: 'Life is short',
    image: '/images/reel_life.jpg',
    url: 'https://www.instagram.com/theebigjoe/reel/DcWHpqkxlUX/',
  },
  {
    quote: 'Your excuses.',
    image: '/images/reel_excuses.jpg',
    url: 'https://www.instagram.com/theebigjoe/reel/Dc9ULuyueMK/',
  },
] as const

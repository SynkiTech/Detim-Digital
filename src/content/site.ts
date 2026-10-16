/**
 * Neutral, non-skill data only (Master Prompt §8).
 * Skill-specific copy lives in ./product-marketing/* and ./grants/*.
 */
export const site = {
  name: "Detim Digital",
  person: "Oluwadetimi Ajayi",
  email: "oluwadetimiajayi@gmail.com",
  phone: "+234 813 075 5869",
  whatsapp: "https://wa.me/2348130755869",
  linkedin: "https://linkedin.com/in/detimi",
  calendly: "https://calendly.com/oluwadetimiajayi/30min",
  location: "Nigeria (working remotely worldwide)",
  timezone: "Africa/Lagos",
  timezoneLabel: "Lagos, Nigeria (WAT)",
  available: true,
  ui: {
    availableLabel: "Available for projects",
    backHome: "← Home",
    hireMe: "Hire me",
    sendBrief: "Send a brief",
    bookHeading: "Book a 30-minute call with Oluwadetimi",
    copyright: `© ${new Date().getFullYear()} Detim Digital. All rights reserved.`,
  },
} as const;

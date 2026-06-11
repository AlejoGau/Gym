export interface GymConfig {
  name: string;
  slogan: string;
  primary: string;
  secondary: string;
  accent: string;
  city: string;
  whatsapp: string;
  instagram: string;
  logo: string | null;
  image: string;
  trial: string;
}

/**
 * Reads gym landing configuration from URL query parameters.
 * Provides fallback defaults derived from the design system if options are missing.
 * 
 * @param searchParams The query parameters from the active URL.
 * @returns The parsed and sanitized GymConfig object.
 */
export function getGymConfig(searchParams: URLSearchParams): GymConfig {
  const name = searchParams.get("name") || "FORGE FITNESS";
  const slogan = searchParams.get("slogan") || "ENTRENÁ AL LÍMITE";
  
  // Base default colors from DESIGN.md
  // primary default: Electric Lime (#caf300)
  // secondary default: High-Contrast Orange (#ff571a)
  // accent default: Dark Text (#171e00) or White (#ffffff) depending on background contrast
  const primary = searchParams.get("primary") || "#caf300";
  const secondary = searchParams.get("secondary") || "#ff571a";
  const accent = searchParams.get("accent") || "#171e00"; // default contrast color for primary background
  
  const city = searchParams.get("city") || "Palermo";
  const whatsapp = searchParams.get("whatsapp") || "5491123456789";
  const instagram = searchParams.get("instagram") || "forgefitness";
  const logo = searchParams.get("logo") || null;
  
  // Default hero image path
  const image = searchParams.get("image") || "https://lh3.googleusercontent.com/aida-public/AB6AXuB64ebsGZ8sq4OWraakR-CsgiqZbqfmLpPzS3gk24a9kuow-I7A_d9r-KK4BvKqzPTrGikRVdGyX0P4PieKex0V-tz7v-Xz5wIGUPiXKb-T0yqFyZ0NLWpWqcwM5Wr7qZTzG1N1aa5T1rYb3e8ElOMS2HSmhS0M1aU8aEjmZqD339__xmNSHaV4B30EyDRApbjdV-FhGyJSL4XEx2hPoqnic9B6m7ACv9DC_59UKHtkXQMzmrsENSizby0faSaKYMqMCaBaoAT8wBU";
  const trial = searchParams.get("trial") || "Clase de prueba gratis";

  return {
    name,
    slogan,
    primary,
    secondary,
    accent,
    city,
    whatsapp,
    instagram,
    logo,
    image,
    trial,
  };
}

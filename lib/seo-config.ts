// lib/seo-config.ts
export const defaultSEO = {
    title: "Bigfarl - Retro Membership",
    description: "Join our retro-themed membership with games, rewards, and more!",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://yourdomain.com",
      site_name: "Bigfarl",
      images: [
        {
          url: "https://yourdomain.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Bigfarl Membership",
        },
      ],
    },
    twitter: {
      handle: "@bigfarl",
      site: "@bigfarl",
      cardType: "summary_large_image",
    },
  }
  
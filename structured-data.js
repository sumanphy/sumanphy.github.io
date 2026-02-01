const structuredData = {
  "@context": "https://schema.org",
  "@type": ["Person", "WebSite"],
  "name": "Suman Mondal",
  "url": "https://sumanphy.github.io/",
  "sameAs": [
    "https://scholar.google.com/citations?user=GygfZgYAAAAJ&hl=en",
    "https://orcid.org/0000-0002-2512-1533",
    "https://www.researchgate.net/profile/Suman-Mondal-12",
    "https://github.com/sumanphy",
    "https://www.linkedin.com/in/suman-mondal-468904342/"
  ],
  "jobTitle": "Postdoctoral Researcher",
  "worksFor": {
    "@type": "Organization",
    "name": "Max Planck Institute for the Physics of Complex Systems",
    "url": "https://www.pks.mpg.de"
  },
  "description": "I am a theoretical condensed matter physicist. My research dives into the equilibrium and non-equilibrium properties of quantum many-body systems. I explore quantum phases and phase transitions, topological properties, and non-equilibrium physics.",
  "image": "https://sumanphy.github.io/images/my_photo_400x400.JPG",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Nöthnitzer Str. 38",
    "addressLocality": "Dresden",
    "postalCode": "01187",
    "addressCountry": "DE"
  }
};

const script = document.createElement('script');
script.type = 'application/ld+json';
script.textContent = JSON.stringify(structuredData);
document.head.appendChild(script);
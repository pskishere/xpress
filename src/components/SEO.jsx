import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  const siteTitle = 'MCNews';
  const fullTitle = `${title} | ${siteTitle}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {url && <link rel="canonical" href={url} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* JSON-LD structured data */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": "${title}",
            "description": "${description}",
            "image": "${image || '/og-image.svg'}",
            "author": {
              "@type": "Organization",
              "name": "MCNews Team"
            },
            "publisher": {
              "@type": "Organization",
              "name": "MCNews",
              "logo": {
                "@type": "ImageObject",
                "url": "/favicon.ico"
              }
            },
            "datePublished": "${new Date().toISOString()}",
            "dateModified": "${new Date().toISOString()}"
          }
        `}
      </script>
    </Helmet>
  );
};

export default SEO;
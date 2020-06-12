import { useLocation } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import slugify from 'slugify';

function SEO({
  title = null,
  image = null,
  description = '',
  lang = 'en',
  keywords = [],
  additionalMeta = [],
}) {
  const data = useStaticQuery(graphql`
    query {
      site {
        ...SiteInfo
      }
    }
  `).site.siteMetadata;

  const { pathname } = useLocation();

  const meta = {
    title: title || data.title,
    template: title ? `%s | ${data.title}` : `%s`,
    description: description || data.description,
    keywords: [...data.keywords, ...keywords].join(','),
    lang: lang || data.lang,
    twitter: data.twitter || '',
    image: {
      src: `${data.url}${(image && image.src) || data.image.src}`,
      width: (image && image.width) || data.image.width,
      height: (image && image.height) || data.image.height,
    },
    url: `${data.url}${pathname}`,
  };

  const hasImage = (image && image.src) || (data.image && data.image.src);

  // HTML Class Name
  // page--index
  // page--success
  const htmlClassName = `page--${slugify(`${pathname.substr(1) || 'index'}`)}`;

  return (
    <Helmet
      htmlAttributes={{
        lang: meta.lang,
        class: htmlClassName,
      }}
      title={meta.title}
      titleTemplate={meta.template}
      meta={[
        {
          name: `description`,
          content: meta.description,
        },
        {
          name: 'keywords',
          content: meta.keywords,
        },
        {
          property: `og:title`,
          content: meta.title,
        },
        {
          property: `og:description`,
          content: meta.description,
        },
        {
          property: `og:type`,
          content: 'website',
        },
        {
          name: `twitter:creator`,
          content: meta.twitter,
        },
        {
          name: `twitter:title`,
          content: meta.title,
        },
        {
          name: `twitter:description`,
          content: meta.description,
        },
      ]
        .concat(
          hasImage
            ? [
                {
                  property: 'og:image',
                  content: meta.image.src,
                },
                {
                  property: 'og:image:width',
                  content: meta.image.width,
                },
                {
                  property: 'og:image:height',
                  content: meta.image.height,
                },
                {
                  name: 'twitter:card',
                  content: 'summary_large_image',
                },
              ]
            : [
                {
                  name: 'twitter:card',
                  content: 'summary',
                },
              ]
        )
        .concat(meta)}
    >
      <link rel="icon" href={'/favicon.ico'} />
    </Helmet>
  );
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  additionalMeta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
};

export default SEO;

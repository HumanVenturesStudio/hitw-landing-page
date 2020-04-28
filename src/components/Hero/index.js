import React from 'react';
import cx from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';

import withReleaseInfo from 'common/lib/withReleaseInfo';

import CTA from 'components/CTA';

import styles from './styles.module.scss';
import { isVideoAsset, isImageAsset } from '../../common/lib/expressions';

const HeroContainer = ({ background, fullScreen, children }) => {
  const isImage = isImageAsset(background);
  const isVideo = isVideoAsset(background);

  // Prepare inline styles to apply image file
  const inlineStyle = {};
  if (isImage) {
    inlineStyle.backgroundImage = `url("${`/${background}`}")`;
  }

  // Prepare video element
  let videoBg;
  let videoExt;
  if (isVideo) {
    // Grab Video file extension to set <source type="video/[mp4|avi|webm]">
    videoExt = background.split('.').pop();
    // Video Tag
    videoBg = (
      <video
        id="hero-background-video"
        className={cx('hero--video', styles.HeroVideo)}
        playsInline
        autoPlay
        muted
        loop
        // TODO: Consider Poster Frame
        // poster=""
      >
        <source src={background} type={`video/${videoExt}`} />
      </video>
    );
  }

  return (
    <div
      className={cx(
        {
          [styles.HeroFullScreen]: fullScreen,
          [styles.HeroBgImage]: isImage,
          [styles.HeroBgVideo]: isVideo,
        },
        styles.Hero,
        'hero'
      )}
      style={inlineStyle}
    >
      {videoBg}
      {children}
    </div>
  );
};

const Hero = ({ release, backgroundImage = '/images/site.png' }) => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { name: { eq: "Hero" } }) {
        ...HeroContent
      }
    }
  `);
  const { html, frontmatter } = data.markdownRemark;
  const { hide, fullScreen } = frontmatter;

  if (hide) {
    return null;
  }

  return (
    <HeroContainer
      background={frontmatter.background || backgroundImage}
      fullScreen={fullScreen}
    >
      <div
        className={cx('hero--content', styles.Content)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <CTA label={frontmatter.ctaLabel} url={frontmatter.ctaUrl} />
    </HeroContainer>
  );
};

export default withReleaseInfo(Hero);

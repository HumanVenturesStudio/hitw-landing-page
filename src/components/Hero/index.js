import React from 'react';
import cx from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';

import CTA from 'components/CTA';
import styles from './styles.module.scss';

const Hero = ({ backgroundImage = '/images/site.png' }) => {
  const data = useStaticQuery(graphql`
    query {
      gitBranch(current: { eq: true }) {
        ...GitInfo
      }
      markdownRemark(frontmatter: { name: { eq: "Hero" } }) {
        ...HeroContent
      }
    }
  `);

  const { background } = data.markdownRemark.frontmatter;
  const html = data.markdownRemark.html;

  const style = {
    backgroundImage: `url("${
      background ? `/images/${background}` : backgroundImage
    }")`,
  };

  return (
    <div className={cx('hero', styles.Hero)} style={style}>
      <div
        className={cx(styles.Content)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <CTA />
    </div>
  );
};

export default Hero;

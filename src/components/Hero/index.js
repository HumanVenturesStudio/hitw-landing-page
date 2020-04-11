import React from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';
import { useStaticQuery, graphql } from 'gatsby';

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
    <div
      className={cx('hero', styles.Hero)}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Hero;

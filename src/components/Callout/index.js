import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.module.scss';
import { useStaticQuery, graphql } from 'gatsby';

export const CALLOUT_ALIGNED_LEFT = 'left-aligned';
export const CALLOUT_ALIGNED_RIGHT = 'right-aligned';
export const CALLOUT_BIG_NUMBERS = 'big-numbers';
export const CALLOUT_FULL_BLEED = 'full-bleed';
export const CALLOUT_FORMATS = [
  CALLOUT_ALIGNED_LEFT,
  CALLOUT_ALIGNED_RIGHT,
  CALLOUT_BIG_NUMBERS,
  CALLOUT_FULL_BLEED,
];

const Callout = ({ name, format = 'left' }) => {
  const data = useStaticQuery(graphql`
    query {
      gitBranch(current: { eq: true }) {
        ...GitInfo
      }
      allMarkdownRemark(
        filter: { frontmatter: { name: { regex: "/Callout/" } } }
      ) {
        totalCount
        edges {
          node {
            ...CalloutContent
          }
        }
      }
    }
  `);

  // Note:  Query retrieved all Callout Markdown
  //        Filter here matching on Callout `name` prop
  const { html, frontmatter } = data.allMarkdownRemark.edges.find(
    (edge) => edge.node.frontmatter.name === name
  ).node;
  const calloutFormat = frontmatter.format || format;
  const inlineStyle = {};

  if (frontmatter.background) {
    inlineStyle.backgroundImage = `url("${`/images/${frontmatter.background}`}")`;
  }

  if (frontmatter.hide === true) {
    return null;
  }

  return (
    <div
      id={`${frontmatter.name}`}
      className={cx('callout', styles.Callout, {
        [styles.CalloutLeft]: calloutFormat === CALLOUT_ALIGNED_LEFT,
        [styles.CalloutRight]: calloutFormat === CALLOUT_ALIGNED_RIGHT,
        [styles.CalloutFull]: calloutFormat === CALLOUT_FULL_BLEED,
        [styles.CalloutThree]: calloutFormat === CALLOUT_BIG_NUMBERS,
        [styles.hasBg]: frontmatter.background,
      })}
      style={inlineStyle}
    >
      <div
        className={cx(styles.Content)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

Callout.propTypes = {
  name: PropTypes.string,
  format: PropTypes.oneOf(CALLOUT_FORMATS),
};

export default Callout;

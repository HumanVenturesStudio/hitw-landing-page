import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.module.scss';
import { useStaticQuery, graphql } from 'gatsby';

export const CALLOUT_LEFT = 'left';
export const CALLOUT_FULL = 'full';
export const CALLOUT_RIGHT = 'right';
export const CALLOUT_THREE = 'three';
export const CALLOUT_FORMATS = [
  CALLOUT_LEFT,
  CALLOUT_FULL,
  CALLOUT_THREE,
  CALLOUT_FULL,
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
  const { html, frontmatter } = data.allMarkdownRemark.edges.find(
    (edge) => edge.node.frontmatter.name === name
  ).node;
  const calloutFormat = frontmatter.format || format;
  const inlineStyle = {};

  if (frontmatter.background) {
    inlineStyle.backgroundImage = `url("${`/images/${frontmatter.background}`}")`;
  }

  return (
    <div
      id={`${frontmatter.name}`}
      className={cx('callout', styles.Callout, {
        [styles.CalloutLeft]: calloutFormat === CALLOUT_LEFT,
        [styles.CalloutRight]: calloutFormat === CALLOUT_RIGHT,
        [styles.CalloutFull]: calloutFormat === CALLOUT_FULL,
        [styles.CalloutThree]: calloutFormat === CALLOUT_THREE,
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

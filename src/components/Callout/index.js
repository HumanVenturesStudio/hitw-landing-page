import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.module.scss';
import { useStaticQuery, graphql } from 'gatsby';

export const CALLOUT_LEFT = 'left';
export const CALLOUT_RIGHT = 'right';
export const CALLOUT_THREE = 'three';
export const CALLOUT_FORMATS = [CALLOUT_LEFT, CALLOUT_RIGHT, CALLOUT_THREE];

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

  return (
    <div
      id={`${frontmatter.name}`}
      className={cx('callout', styles.Callout, {
        [styles.CalloutLeft]: calloutFormat === CALLOUT_LEFT,
        [styles.CalloutRight]: calloutFormat === CALLOUT_RIGHT,
        [styles.CalloutThree]: calloutFormat === CALLOUT_THREE,
      })}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

Callout.propTypes = {
  name: PropTypes.string,
  format: PropTypes.oneOf(CALLOUT_FORMATS),
};

export default Callout;

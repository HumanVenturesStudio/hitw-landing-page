import cx from 'classnames';
import withReleaseInfo from 'common/lib/withReleaseInfo';
import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.scss';

export const CALLOUT_ALIGNED_LEFT = 'left-aligned';
export const CALLOUT_ALIGNED_RIGHT = 'right-aligned';
export const CALLOUT_ALIGNED_CENTER = 'center-aligned';
export const CALLOUT_BIG_NUMBERS = 'big-numbers';
export const CALLOUT_FULL_BLEED = 'full-bleed';
export const CALLOUT_FOUR_UP = 'four-up';
export const CALLOUT_FORMATS = [
  CALLOUT_ALIGNED_LEFT,
  CALLOUT_ALIGNED_RIGHT,
  CALLOUT_ALIGNED_CENTER,
  CALLOUT_BIG_NUMBERS,
  CALLOUT_FULL_BLEED,
  CALLOUT_FOUR_UP,
];

const calloutStyle = {
  [CALLOUT_ALIGNED_LEFT]: styles.CalloutLeft,
  [CALLOUT_ALIGNED_RIGHT]: styles.CalloutRight,
  [CALLOUT_ALIGNED_CENTER]: styles.CalloutCenter,
  [CALLOUT_FULL_BLEED]: styles.CalloutFull,
  [CALLOUT_BIG_NUMBERS]: styles.CalloutBigNumbers,
  [CALLOUT_FOUR_UP]: styles.CalloutFourUp,
};

export const CONFIG = {
  format: CALLOUT_FULL_BLEED,
  background: null,
  wrap: true,
  hide: false,
};

const Callout = ({ release, name, children, config = {} }) => {
  const data = useStaticQuery(graphql`
    query {
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

  const configuration = {
    ...CONFIG,
    ...frontmatter.config,
    ...config,
  };

  if (configuration.hide === true) {
    return null;
  }

  return (
    <div
      id={`${frontmatter.name}`}
      className={cx(
        'callout',
        styles.Callout,
        calloutStyle[configuration.format],
        {
          [styles.hasBg]: configuration.background,
        }
      )}
      style={
        !!configuration.background
          ? {
              backgroundImage: `url("${`/images/${configuration.background}`}")`,
            }
          : null
      }
    >
      {html && html.length && (
        <div
          className={cx('callout-content', styles.Content)}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
      {children && (
        <div className={cx('callout-content', styles.Content)}>
          {configuration.wrap ? <section>{children}</section> : children}
        </div>
      )}
    </div>
  );
};

Callout.propTypes = {
  name: PropTypes.string,
  config: PropTypes.shape({
    background: PropTypes.string,
    format: PropTypes.oneOf(CALLOUT_FORMATS),
  }),
};

export default withReleaseInfo(Callout);

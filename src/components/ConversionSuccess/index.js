import React from 'react';
import cx from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';

import { trackEvent } from 'common/lib/analytics';
import withReleaseInfo from 'common/lib/withReleaseInfo';

import styles from './styles.module.scss';

const ConversionSuccess = ({ release }) => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { name: { eq: "Success" } }) {
        ...SuccessContent
      }
    }
  `);

  const { html, frontmatter } = data.markdownRemark;

  React.useEffect(() => {
    if (frontmatter.redirect === true) {
      setTimeout(() => {
        document.location.href = '/';
      }, 5000);
    }
  }, [frontmatter.redirect]);

  React.useEffect(() => {
    trackEvent(trackEvent.EVENT__CONVERSION__SUCCESS, { release });
  }, [release]);

  return (
    <div
      id={`${frontmatter.name}`}
      className={cx('success', styles.ConversionSuccess)}
    >
      <div
        className={cx(styles.Content)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default withReleaseInfo(ConversionSuccess);

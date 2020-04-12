import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';

import styles from './styles.module.scss';

const EmailCapture = () => {
  const data = useStaticQuery(graphql`
    query {
      gitBranch(current: { eq: true }) {
        ...GitInfo
      }
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

  return (
    <div
      id={`${frontmatter.name}`}
      className={cx('success', styles.EmailCaptureSuccess)}
    >
      <div
        className={cx(styles.Content)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default EmailCapture;

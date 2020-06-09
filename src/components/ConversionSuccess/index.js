import cx from 'classnames';
import { trackEvent } from 'common/lib/analytics';
import { CONVERSION_SESSION_KEY } from 'common/lib/data';
import persist from 'common/lib/persist';
import withReleaseInfo from 'common/lib/withReleaseInfo';
import DangerousHTMLContent from 'dangerously-set-html-content';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styles from './styles.module.scss';

const COOKIE_KEY = 'success';

const TOKENS = {
  FNAME: '',
  LNAME: '',
  PHONE: '',
  EMAIL: '',
  ZIPCODE: '',
  BIRTHDAY: '',
};

const CONFIG = {
  redirect: true,
  redirectInSeconds: 5,
  tokens: TOKENS,
};

const ConversionSuccess = ({ release, config = {} }) => {
  const [successTracked, setSuccessTracked] = React.useState(
    persist.session.read(COOKIE_KEY) || false
  );

  const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { name: { eq: "Success" } }) {
        ...SuccessContent
      }
    }
  `);

  const { html, frontmatter } = data.markdownRemark;

  const configuration = {
    ...CONFIG,
    ...frontmatter.config,
    ...config,
  };

  const conversionValue = persist.session.read(CONVERSION_SESSION_KEY) || {};

  /**
   * Get Token from Token Match
   * @param {string} tokenMatchStr "{{CONVERSION__FNAME}}"
   * @returns {string} "FNAME"
   */
  const getToken = (tokenMatchStr) =>
    tokenMatchStr
      .replace(/{/g, '')
      .replace(/}/g, '')
      .split('__')[1] || null;

  /**
   * Get Token Value
   * 1. From Conversion Submission (Session Storage)
   * 2. From Theme Code (Frontmatter, Component Props)
   * 3. From Component DEFAULTS
   * 4. Empty String (Null Safe)
   * @param {string} token
   */
  const getTokenValue = (token) =>
    conversionValue[token] ||
    configuration.tokens[token] ||
    TOKENS[token] ||
    '';

  /**
   * Replace {{CONVERSION__TOKEN}} from Raw HTML with values before it's parsed and rendered
   * @param {string} rawHtml
   */
  const applyTokenValues = (rawHtml) => {
    let updatedHtml = rawHtml;
    const tokenMatches = updatedHtml.match(/{{(CONVERSION__[A-z]+)}}/gi) || [];
    tokenMatches.forEach((tokenMatch) => {
      const token = getToken(tokenMatch);
      if (token) {
        updatedHtml = updatedHtml.replace(
          `{{CONVERSION__${token}}}`,
          getTokenValue(token)
        );
      }
    });
    return updatedHtml;
  };

  /**
   * Effect:
   * Redirect after Success
   */
  React.useEffect(() => {
    if (configuration.redirect === true) {
      setTimeout(() => {
        document.location.href = '/';
      }, configuration.redirectInSeconds * 1000);
    }
  }, [configuration.redirect, configuration.redirectInSeconds]);

  /**
   * Effect:
   * Track Success Once
   */
  React.useEffect(() => {
    if (!successTracked) {
      trackEvent(trackEvent.EVENT__CONVERSION__SUCCESS, {
        release,
      });
      persist.session.write(COOKIE_KEY, true);
      setSuccessTracked(true);
    }
  }, [release, successTracked]);

  return (
    <div
      id={`${frontmatter.name}`}
      className={cx('success', styles.ConversionSuccess)}
    >
      <div className={cx('success--content', styles.Content)}>
        <DangerousHTMLContent html={applyTokenValues(html)} />
      </div>
    </div>
  );
};

export default withReleaseInfo(ConversionSuccess);

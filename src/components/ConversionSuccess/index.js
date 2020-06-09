import cx from 'classnames';
import { trackEvent } from 'common/lib/analytics';
import { CONVERSION_SESSION_KEY } from 'common/lib/data';
import persist from 'common/lib/persist';
import withReleaseInfo from 'common/lib/withReleaseInfo';
import DangerousHTMLContent from 'dangerously-set-html-content';
import { graphql, useStaticQuery } from 'gatsby';
import Cookies from 'js-cookie';
import React from 'react';
import styles from './styles.module.scss';

const COOKIE_KEY = 'success';

const CONFIG = {
  redirect: true,
  redirect_in_seconds: 5,
};

const FALLBACK_VALUES = {
  FNAME: '',
  LNAME: '',
  PHONE: '',
  ZIPCODE: '',
  BIRTHDAY: '',
};

const ConversionSuccess = ({ release, config = {} }) => {
  const [successTracked, setSuccessTracked] = React.useState(
    Cookies.get(COOKIE_KEY) || false
  );

  const conversionValues = persist.session.read(CONVERSION_SESSION_KEY) || {};
  const conversionKeys = Object.keys(conversionValues);
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

  const matches = html.match(/{{(CONVERSION__[A-z]+)}}/gi) || [];
  let cleanMarkup = html;
  matches.forEach((match) => {
    const token = match
      .replace(/{/g, '')
      .replace(/}/g, '')
      .split('__')[1];
    if (token) {
      cleanMarkup = cleanMarkup.replace(
        `{{CONVERSION__${token}}}`,
        conversionValues[token] || FALLBACK_VALUES[token] || ''
      );
    }
  });

  React.useEffect(() => {
    if (configuration.redirect === true) {
      setTimeout(() => {
        document.location.href = '/';
      }, configuration.redirect_in_seconds * 1000);
    }
  }, [configuration.redirect, configuration.redirect_in_seconds]);

  React.useEffect(() => {
    if (!successTracked) {
      trackEvent(trackEvent.EVENT__CONVERSION__SUCCESS, {
        release,
      });
      Cookies.set(COOKIE_KEY, true);
      setSuccessTracked(true);
    }
  }, [release, successTracked]);

  return (
    <div
      id={`${frontmatter.name}`}
      className={cx('success', styles.ConversionSuccess)}
    >
      <div className={cx('success--content', styles.Content)}>
        <DangerousHTMLContent html={cleanMarkup} />
      </div>
    </div>
  );
};

export default withReleaseInfo(ConversionSuccess);

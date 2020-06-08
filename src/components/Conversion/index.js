import cx from 'classnames';
import { trackEvent } from 'common/lib/analytics';
import withReleaseInfo from 'common/lib/withReleaseInfo';
import DangerousHTMLContent from 'dangerously-set-html-content';
import { graphql, useStaticQuery } from 'gatsby';
import isEmpty from 'lodash.isempty';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.scss';

export const CONFIG = {
  heading: null,
  first: {
    hide: false,
    label: null,
  },
  last: {
    hide: false,
    label: null,
  },
  email: {
    hide: false,
    label: null,
  },
};

/**
 * Get Action URL from Mailchimp Embed
 * @param {string} html
 * @returns {string|null} "https://netlify.us19.list-manage.com/subscribe/post?u=1f28b6be6f07eec26646ad787&amp;id=4637b5fba8"
 */
const getMailchimpAction = (html) => {
  let chunk = html.split('action="')[1];
  return (chunk && chunk.split('"')[0]) || null;
};

/**
 * Get Honeypot key from Mailchimp Embed
 * @param {string} html
 * @returns {string|null} b_1f28b6be6f07eec26646ad787_4637b5fba8
 */
const getMailchimpHoneypot = (html) => {
  let chunk = html.split('tabindex="-1"')[0];
  let chunk2 = chunk.split('name=');

  return (chunk2.length && chunk2.pop().replace(/\"/g, '')) || null;
};

const FormField = ({ name, label, onChange, ...attrs }) => {
  const id = `field[${name}]`;
  return (
    <label className={cx('conversion--label', styles.Label)} htmlFor={id}>
      <input
        className={cx('conversion--input', styles.Input)}
        id={id}
        name={name}
        onChange={onChange}
        {...attrs}
      />
      {label && (
        <div className={cx('conversion--label-text', styles.LabelText)}>
          {label}
        </div>
      )}
    </label>
  );
};

const Conversion = ({ release, id, config = {} }) => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { name: { eq: "Conversion" } }) {
        ...ConversionContent
      }
    }
  `);

  const { html, frontmatter } = data.markdownRemark;

  const configuration = {
    ...CONFIG,
    ...frontmatter.config,
    ...config,
  };

  // HACK:
  // Extract the Action & Honeypot from Mailchimp Embed Code
  const action = getMailchimpAction(html);
  const honeypot = getMailchimpHoneypot(html);

  const [first, setFirst] = React.useState('');
  const [last, setLast] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [hasIntent, setHasIntent] = React.useState();

  React.useEffect(() => {
    if (hasIntent === true) {
      trackEvent(trackEvent.EVENT__CONVERSION__INTENT, { release });
    }
  }, [hasIntent, release]);

  if (frontmatter.hide) {
    return null;
  }

  if (!action) {
    console.warn('Could not find action in Mailchimp embed');
  }

  if (!honeypot) {
    console.warn('Could not find honeypot in Mailchimp embed');
  }

  return (
    (frontmatter.useCustom && (
      <div id={id} className={cx('conversion--form', styles.CustomForm, {})}>
        <div className={cx('conversion--content', styles.Content)}>
          <DangerousHTMLContent html={html} />
        </div>
      </div>
    )) ||
    (!frontmatter.useCustom && (
      <div className={cx('conversion--form', styles.Form)}>
        <div className={cx('conversion--content', styles.Content)}>
          {!isEmpty(configuration.heading) && (
            <h3 className={cx('conversion--heading', styles.ConversionHeading)}>
              {configuration.heading}
            </h3>
          )}
          <form method="POST" name="mc-embedded-subscribe-form" action={action}>
            <input
              type="hidden"
              name={honeypot}
              tabIndex="-1"
              style={{ position: 'absolute', left: '-200vw' }}
              aria-hidden="true"
            />
            {!configuration.first.hide && (
              <FormField
                label={configuration.first.label || 'Enter your first name'}
                onChange={(e) => {
                  setHasIntent(true);
                  setFirst(e.target.value);
                }}
                type="text"
                name="MERGE1"
                value={first}
                id={id}
                required
              />
            )}
            {!configuration.last.hide && (
              <FormField
                label={configuration.last.label || 'Enter your last name'}
                onChange={(e) => {
                  setHasIntent(true);
                  setLast(e.target.value);
                }}
                type="text"
                name="MERGE2"
                value={last}
                required
              />
            )}
            {!configuration.email.hide && (
              <FormField
                label={configuration.email.label || 'Enter your email'}
                onChange={(e) => {
                  setHasIntent(true);
                  setEmail(e.target.value);
                }}
                type="email"
                name="MERGE0"
                value={email}
                required
              />
            )}
            <button
              className={cx('conversion--submit', styles.Submit)}
              type="submit"
            >
              {frontmatter.submitLabel}
            </button>
          </form>
        </div>
      </div>
    ))
  );
};

Conversion.propTypes = {
  release: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  config: PropTypes.object,
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default withReleaseInfo(Conversion);

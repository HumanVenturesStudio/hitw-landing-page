import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.module.scss';
import { useStaticQuery, graphql } from 'gatsby';

const FormField = ({ name, label, onChange, ...attrs }) => {
  const id = `field[${name}]`;
  return (
    <label className={styles.Label} htmlFor={id}>
      <input
        className={styles.Input}
        id={id}
        name={name}
        onChange={onChange}
        {...attrs}
      />
      {label && <div className={styles.LabelText}>{label}</div>}
    </label>
  );
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
};

const EmailCapture = () => {
  const [first, setFirst] = React.useState('');
  const [last, setLast] = React.useState('');
  const [email, setEmail] = React.useState('');

  const data = useStaticQuery(graphql`
    query {
      gitBranch(current: { eq: true }) {
        ...GitInfo
      }
      markdownRemark(frontmatter: { name: { eq: "Form" } }) {
        ...FormContent
      }
    }
  `);

  const { html, frontmatter } = data.markdownRemark;

  return (
    (frontmatter.useCustom && (
      <div
        id={`${frontmatter.name}`}
        className={cx('callout', styles.Form, {})}
      >
        <div
          className={cx(styles.Content)}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    )) ||
    (!frontmatter.useCustom && (
      <div className={cx('form', styles.Form)}>
        <div className={cx(styles.Content)}>
          <form
            method="POST"
            name="mc-embedded-subscribe-form"
            action={frontmatter.action}
          >
            <input type="hidden" name="u" value={frontmatter.u} />
            <input type="hidden" name="id" value={frontmatter.id} />
            <input
              type="hidden"
              name={frontmatter.honeypot}
              tabIndex="-1"
              style={{ position: 'absolute', left: '-200vw' }}
              aria-hidden="true"
            />

            <FormField
              label="Enter your first name"
              onChange={(e) => setFirst(e.target.value)}
              type="text"
              name="MERGE1"
              value={first}
              id="subscribe"
              required
            />
            <FormField
              label="Enter your last name"
              onChange={(e) => setLast(e.target.value)}
              type="text"
              name="MERGE2"
              value={last}
              required
            />
            <FormField
              label="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="MERGE0"
              value={email}
              required
            />
            <button className={styles.Submit} type="submit">
              {frontmatter.submitLabel}
            </button>
          </form>
        </div>
      </div>
    ))
  );
};

export default EmailCapture;

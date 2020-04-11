import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.module.scss';

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

const handleSubmit = (e, data) => {
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encode({ 'form-name': 'contact', ...data }),
  })
    .then(() => alert('Success!'))
    .catch((error) => alert(error));

  e.preventDefault();
};

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

const id = 'sign-up';

const EmailCapture = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  return (
    <form
      id={`${id}`}
      className={styles.Form}
      netlify-honeypot="bot-field"
      data-netlify="true"
      onSubmit={(e) => handleSubmit(e, { name, email })}
    >
      <input type="hidden" name="bot-field" />
      <FormField
        label="Enter your name"
        onChange={(e) => setName(e.target.value)}
        type="text"
        name="name"
        value={name}
        required
      />
      <FormField
        label="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="email"
        value={email}
        required
      />
      <button className={styles.Submit} type="submit">
        Sign Up Now!
      </button>
    </form>
  );
};

export default EmailCapture;

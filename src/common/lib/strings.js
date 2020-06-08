import React from 'react';

/**
 * Convert "&amp;" to "&"
 * @param {String} str A string containing html entities like &amp; &ellip; etc
 */
export const parseEntities = (str) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = str;
  return textarea.value;
};

/**
 * @param {String} text
 * @param {String|CSSModule Reference} className
 * @returns {Array[node]}
 */
export const withParagraphs = (text, className = null) =>
  (text &&
    typeof text === 'string' &&
    text.split('\n').map((paragraph, index) => (
      <p key={index} className={className}>
        {paragraph}
      </p>
    ))) ||
  text;

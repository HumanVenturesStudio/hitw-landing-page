import React from 'react';
import { DOC } from './global';

/**
 * Convert "&amp;" to "&"
 * @param {String} str A string containing html entities like &amp; &ellip; etc
 */
export const parseEntities = (str) => {
  // TODO: Clean this up
  // Hack for Gatsby SSR
  if (DOC) {
    const textarea = DOC.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
  }
  return str;
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

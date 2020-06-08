/**
 * Convert "&amp;" to "&"
 * @param {String} str A string containing html entities like &amp; &ellip; etc
 */
export const parseEntities = (str) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = str;
  return textarea.value;
};

/* ==================================================================
// Landing Page Scripts -- Add any custom javascript here.
// Note: This is loaded on every page.
// ================================================================== */

import $ from 'jquery';

const WIN = typeof window !== `undefined` ? window : null;

const Events = WIN && WIN.LandingPage.Events;

Events &&
  Events.once(Events.EVENT.Ready, function() {
    const $html = $('html');
    switch ($html.get(0).className) {
      case 'page--index':
        return index();
      case 'page--success':
        return success();
      default:
        break;
    }
  });

/**
 * Index Page JS
 */
function index() {
  /**
   * Your JS
   */
  const items = $('.accordion dt');
  items.off('click.nume').on('click.nume', function(event) {
    const label = $(event.target).text();
    WIN.LandingPage.track('nume:learn', {
      label: label,
    });
  });
}

/**
 * Success Page JS
 */
function success() {
  /**
   * Your JS
   */
}

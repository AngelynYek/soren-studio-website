export function navigate(url) {
  if (url === window.location.pathname + window.location.search) return;
  window.history.pushState(null, '', url);
  window.dispatchEvent(new Event('popstate'));
}

// Lets internal links stay plain <a> tags without reloading the page.
export function followInternalLink(event) {
  const link = event.target.closest('a[href]');
  const openElsewhere =
    event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
  if (!link || openElsewhere || link.target) return;
  if (link.origin !== window.location.origin) return;
  event.preventDefault();
  navigate(link.pathname + link.search);
  window.scrollTo(0, 0);
}

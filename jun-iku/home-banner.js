// The homepage banner stays hidden until launch is approved.
const banner = document.getElementById('juniku-preview');
if (banner && !banner.hidden) {
  const frame = banner.querySelector('iframe[data-src]');
  if (frame) frame.src = frame.dataset.src;
}

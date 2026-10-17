#!/bin/bash
# Mobile interaction battery: menu, modal, theme toggle, form fonts.
set -e
echo "== 1. Mobile menu at 320 (PMM) =="
agent-browser set viewport 320 690 >/dev/null
agent-browser open "http://localhost:3000/product-marketing" >/dev/null
agent-browser wait --load networkidle >/dev/null 2>&1
agent-browser wait 1500 >/dev/null
agent-browser eval "document.querySelector('header button[aria-label*=menu]').click()" >/dev/null
agent-browser wait 600 >/dev/null
agent-browser screenshot /home/z/my-project/download/m2-menu-320.png >/dev/null
agent-browser eval "(() => {
  const menu = document.querySelector('[aria-label*=menu]') && document.querySelector('.fixed.inset-0.z-50');
  if (!menu) return 'FAIL: menu not open';
  const r = menu.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  const inner = Array.from(menu.querySelectorAll('a,button')).map(el => el.getBoundingClientRect()).filter(b => b.right > vw + 1 || b.left < -1 || b.width === 0);
  const items = menu.textContent.slice(0, 120);
  return 'menu ' + Math.round(r.width) + 'x' + Math.round(r.height) + ' | outOfBounds=' + inner.length + ' | items: ' + items.replace(/\s+/g, ' ');
})()"
agent-browser eval "document.querySelector('.fixed.inset-0.z-50 button[aria-label*=Close]').click()" >/dev/null
agent-browser wait 600 >/dev/null
agent-browser eval "(() => 'menu closed: ' + (document.querySelector('.fixed.inset-0.z-50') ? 'STILL OPEN' : 'yes') + ', bodyOverflow=' + (document.body.style.overflow || 'restored'))()"
echo ""
echo "== 2. Menu anchor jump (Grants, 390) =="
agent-browser set viewport 390 844 >/dev/null
agent-browser open "http://localhost:3000/grants-consulting" >/dev/null
agent-browser wait --load networkidle >/dev/null 2>&1
agent-browser wait 1500 >/dev/null
agent-browser eval "document.querySelector('header button[aria-label*=menu]').click()" >/dev/null
agent-browser wait 500 >/dev/null
agent-browser find text "Services" click >/dev/null 2>&1 || agent-browser eval "Array.from(document.querySelectorAll('.fixed.inset-0.z-50 button')).find(b => b.textContent.trim() === 'Services')?.click()" >/dev/null
agent-browser wait 1400 >/dev/null
agent-browser eval "(() => 'menuOpen=' + Boolean(document.querySelector('.fixed.inset-0.z-50')) + ' scrollY=' + Math.round(window.scrollY) + ' servicesTop=' + Math.round(document.querySelector('#services').getBoundingClientRect().top))()"
echo ""
echo "== 3. Calendly modal at 390 (PMM) =="
agent-browser open "http://localhost:3000/product-marketing" >/dev/null
agent-browser wait --load networkidle >/dev/null 2>&1
agent-browser wait 1200 >/dev/null
agent-browser eval "Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith('Hire me')).click()" >/dev/null
agent-browser wait 2200 >/dev/null
agent-browser screenshot /home/z/my-project/download/m2-modal-390.png >/dev/null
agent-browser eval "(() => {
  const dlg = document.querySelector('[data-calendly-modal]');
  if (!dlg) return 'FAIL: modal missing';
  const iframe = dlg.querySelector('iframe');
  const r = dlg.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  return 'modal ' + Math.round(r.width) + 'x' + Math.round(r.height) + ' vw=' + vw + ' | iframe=' + (iframe ? 'yes' : 'loading') + ' | bodyLocked=' + (document.body.style.overflow === 'hidden');
})()"
agent-browser press Escape >/dev/null
agent-browser wait 700 >/dev/null
agent-browser eval "(() => 'modal closed: ' + (document.querySelector('[data-calendly-modal]') ? 'STILL OPEN' : 'yes') + ', bodyOverflow=' + (document.body.style.overflow || 'restored'))()"
echo ""
echo "== 4. Theme toggle tap (Home, 390) =="
agent-browser open "http://localhost:3000/" >/dev/null
agent-browser wait --load networkidle >/dev/null 2>&1
agent-browser wait 1200 >/dev/null
agent-browser eval "document.querySelector('header button[aria-label^=Switch]').click()" >/dev/null
agent-browser wait 600 >/dev/null
agent-browser eval "(() => 'mode=' + document.documentElement.dataset.mode)"
agent-browser screenshot /home/z/my-project/download/m2-home-day-390.png >/dev/null
agent-browser eval "document.querySelector('header button[aria-label^=Switch]').click()" >/dev/null
agent-browser wait 400 >/dev/null
agent-browser eval "(() => 'mode=' + document.documentElement.dataset.mode)"
echo ""
echo "== 5. Form input font-size on phone (book brief, 390) =="
agent-browser open "http://localhost:3000/product-marketing/book" >/dev/null
agent-browser wait --load networkidle >/dev/null 2>&1
agent-browser wait 1200 >/dev/null
agent-browser eval "(() => {
  const input = document.querySelector('#brief-name');
  input.focus();
  return 'name input font-size=' + getComputedStyle(input).fontSize + ' (>=16px means no iOS zoom)';
})()"
echo ""
echo "== 6. Tap-target re-probe (boxes >= 40px on interactive, fixed els incl.) =="
agent-browser open "http://localhost:3000/product-marketing" >/dev/null
agent-browser wait --load networkidle >/dev/null 2>&1
agent-browser wait 1200 >/dev/null
agent-browser eval "(() => {
  const out = [];
  document.querySelectorAll('header a, header button').forEach(el => {
    const r = el.getBoundingClientRect();
    if (getComputedStyle(el).display === 'none' || r.width === 0) return;
    if (r.width < 40 || r.height < 38) out.push(el.tagName + ' ' + (el.getAttribute('aria-label') || el.textContent).trim().slice(0,20) + ' [' + Math.round(r.width) + 'x' + Math.round(r.height) + ']');
  });
  return out.length ? 'SMALL: ' + out.join(' | ') : 'header controls all >=40px';
})()"

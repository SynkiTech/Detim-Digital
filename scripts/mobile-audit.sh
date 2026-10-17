#!/bin/bash
# Mobile overflow probe: for each route x width, load page and measure
# document scrollWidth vs viewport, plus list offending elements.
ROUTES=("/" "/product-marketing" "/grants-consulting" "/product-marketing/book" "/grants-consulting/book")
WIDTHS=(320 360 375 390 414 428 768 1024)

for W in "${WIDTHS[@]}"; do
  agent-browser set viewport "$W" 800 >/dev/null
  for R in "${ROUTES[@]}"; do
    agent-browser open "http://localhost:3000$R" >/dev/null
    agent-browser wait --load networkidle >/dev/null 2>&1
    agent-browser wait 1200 >/dev/null
    RES=$(agent-browser eval "(() => {
      const vw = document.documentElement.clientWidth;
      const sw = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
      const offenders = [];
      if (sw > vw + 1) {
        document.querySelectorAll('body *').forEach(el => {
          const r = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          if (cs.position === 'fixed' || cs.display === 'none') return;
          if (r.width > 1 && (r.right > vw + 1 || r.left < -1)) {
            offenders.push(el.tagName + '.' + String(el.className).split(' ').slice(0,3).join('.') + ' r=' + Math.round(r.right));
          }
        });
      }
      return (sw > vw + 1 ? 'OVERFLOW' : 'ok') + ' vw=' + vw + ' sw=' + sw + (offenders.length ? ' | ' + offenders.slice(0,6).join(' ; ') : '');
    })()" 2>/dev/null)
    echo "w=$W route=$R => $RES"
  done
done

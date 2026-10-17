#!/bin/bash
# Hit-zone verification v3. Probes elementFromPoint 1px inside each small
# control's right/left box edge: the tap must resolve to the control.
# Selectors must NOT contain single quotes.
set -e
openat () {
  agent-browser set viewport 390 844 >/dev/null
  agent-browser open "http://localhost:3000$1" >/dev/null
  agent-browser wait --load networkidle >/dev/null 2>&1
  agent-browser wait 1200 >/dev/null
}

probe () { # right edge: dx<0 inside, dx>0 outside
  agent-browser eval "(() => {
    const el = document.querySelector('$1');
    if (!el) return 'FAIL $3: not found';
    const r = el.getBoundingClientRect();
    const hit = document.elementFromPoint(r.right + $2, r.top + r.height / 2);
    const ok = hit && (hit === el || el.contains(hit));
    return (ok ? 'PASS' : 'FAIL') + ' $3 -> ' + (hit ? hit.tagName + '.' + String(hit.className).split(' ').slice(0,2).join('.') : 'null');
  })()"
}

probeL () { # left edge: dx<0 outside, dx>0 inside
  agent-browser eval "(() => {
    const el = document.querySelector('$1');
    if (!el) return 'FAIL $3: not found';
    const r = el.getBoundingClientRect();
    const hit = document.elementFromPoint(r.left + $2, r.top + r.height / 2);
    const ok = hit && (hit === el || el.contains(hit));
    return (ok ? 'PASS' : 'FAIL') + ' $3 -> ' + (hit ? hit.tagName + '.' + String(hit.className).split(' ').slice(0,2).join('.') : 'null');
  })()"
}

echo "== PMM footer (scrolled to bottom) =="
openat /product-marketing
agent-browser eval "window.scrollTo(0, document.body.scrollHeight)" >/dev/null
agent-browser wait 600 >/dev/null
probe "footer a[aria-label^=Email]" -1 "email icon right edge"
probe "footer a[aria-label=WhatsApp]" -1 "whatsapp icon right edge"
probe "footer a[aria-label=LinkedIn]" -1 "linkedin icon right edge"
probeL "footer a[aria-label=LinkedIn]" -1 "linkedin left seam (expect neighbour A)"
probe "footer a[aria-label*=Home]" -1 "quiet Home link right edge"

echo "== PMM nav pill (back to top) =="
agent-browser eval "window.scrollTo(0, 0)" >/dev/null
agent-browser wait 500 >/dev/null
probe "header button[aria-label^=Switch]" -1 "theme toggle right edge"
probeL "header button[aria-label*=menu]" -1 "burger left edge"
probeL "header button[aria-label*=menu]" 1 "burger inside left"
probe "header a[aria-label^=Detim]" -1 "logo right edge"
probe "header a[aria-label*=Home]" -1 "Home pill right edge"
probeL "header a[aria-label*=Home]" 1 "Home pill inside left"

echo "== PMM hero CV link =="
probe "main section a[download]" -1 "hero CV link right edge"

echo "== Home footer icons =="
openat /
probe "footer a[aria-label^=Email]" -1 "home email icon"
probe "footer a[aria-label=LinkedIn]" -1 "home linkedin icon"

echo "== FAQ send-a-brief (PMM) =="
openat /product-marketing
agent-browser eval "document.querySelector('#faq').scrollIntoView()" >/dev/null
agent-browser wait 800 >/dev/null
probe "#faq a[href*=book]" -1 "send-a-brief right edge"

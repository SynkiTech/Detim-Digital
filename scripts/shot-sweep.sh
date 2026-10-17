#!/bin/bash
# Screenshot sweep: all routes x key widths, night mode.
set -e
D=/home/z/my-project/download
shot () { # route width height name
  agent-browser set viewport "$2" "$3" >/dev/null
  agent-browser open "http://localhost:3000$1" >/dev/null
  agent-browser wait --load networkidle >/dev/null 2>&1
  agent-browser wait 1800 >/dev/null
  agent-browser screenshot "$D/$4.png" >/dev/null
  echo "saved $4"
}

shot "/" 320 690 m2-home-320
shot "/" 390 844 m2-home-390
shot "/" 428 926 m2-home-428
shot "/" 768 1024 m2-home-768
shot "/product-marketing" 320 690 m2-pmm-320
shot "/product-marketing" 390 844 m2-pmm-390
shot "/grants-consulting" 390 844 m2-grants-390
shot "/grants-consulting" 320 690 m2-grants-320
shot "/product-marketing/book" 390 844 m2-book-pmm-390
shot "/grants-consulting/book" 320 690 m2-book-grants-320

# landscape phones
shot "/" 844 390 m2-home-landscape
shot "/product-marketing" 844 390 m2-pmm-landscape

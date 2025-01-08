#!/usr/bin/sh

cd /home/javier/pages/ && sh build.sh
cp -r /home/javier/pages/public/* /home/javier/website/
cd /home/javier/website/
git add .
git commit -m "commit $(date '+%Y-%m-%d | %r')"
git push && echo "website updated and pushed to codeberg" || echo "something is wrong..."

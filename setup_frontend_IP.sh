#!/bin/bash

# Change IP in main.js, powerJS.js, setup.js, index.html and setup-page.html
WIFI_IP="$(ifconfig | grep -A 1 'wl' | tail -1 | grep -oP '(?<=inet\s)\d+(\.\d+){3}')"

sed -i "s+http://.*:8000+http://$WIFI_IP:8000+g"  $HOME/restaurant_bot/webapp/webapp_frontend/assets/js/main.js

sed -i "s+http://.*:8000+http://$WIFI_IP:8000+g" $HOME/restaurant_bot/webapp/webapp_frontend/assets/js/powerJS.js

sed -i "s+http://.*:8000+http://$WIFI_IP:8000+g" $HOME/restaurant_bot/webapp/webapp_frontend/assets/js/setup.js

sed -i "s+http://.*:8000+http://$WIFI_IP:8000+g"  $HOME/restaurant_bot/webapp/webapp_frontend/index.html

sed -i "s+http://.*:8000+http://$WIFI_IP:8000+g"  $HOME/restaurant_bot/webapp/webapp_frontend/setup-page.html

#/bin/sh

echo "Installing Cloud9..."
echo "-----------------------"

git clone https://github.com/ajaxorg/cloud9.git c9
cd c9
npm install
npm install -g bower
bower install
cd ..

echo "Success."
echo ""
echo "Installing Cloud9Hub..."
echo "-----------------------"

git clone https://github.com/AVGP/cloud9hub.git cloud9hub
cd cloud9hub
npm install
echo "Success."

echo "Last steps"
echo "-----------------------"
echo "1. Create a Github app."
echo "2. Copy cloud9hub/config.js.example to cloud9hub/config.js"
echo "3. Edit your cloud9hub/config.js"
echo ""
echo "Have a lot of fun!"

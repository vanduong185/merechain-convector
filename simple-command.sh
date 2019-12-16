# Start a local blockchain
npm run env:restart
# Install the chaincode
npm run cc:start -- merechain

# Start your web server
IDENTITY=admin-bachmai npx lerna run start --scope server-1 --stream

# upgrade chaincode
npm run cc:upgrade -- merechain [version]

# start debug
npm run cc:start:debug -- merechain

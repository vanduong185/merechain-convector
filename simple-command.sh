# Start a local blockchain
npm run env:restart
# Install the chaincode
npm run cc:start -- patient

# Start your web server
npx lerna run start --scope server --stream

# Seed some participants
hurl invoke patient participant_register admin "Admin" -u admin
hurl invoke patient participant_register admin-bachmai "Admin Bach Mai" admin -u user1 -o org1
hurl invoke patient participant_register admin-vietduc "Admin Viet Duc" admin -u user1 -o org2

# upgrade chaincode
npm run cc:upgrade -- patient [version]

# start debug
npm run cc:start:debug -- patient

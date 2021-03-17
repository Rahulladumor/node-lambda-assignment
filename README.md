# Serverless APIs Using MySQL (Sequalize) , Express, Node, Lambda

## Deploy Steps

  1.`git clone https://github.com/Rahulladumor/node-lambda-assignment.git`

  2. `npm install`

  3. `npm install -g serverless`

  4. go to `configs` folder update `db.config.js` with your remote MySQL credentials.

  6. Deploy on AWS : `sls deploy --stage {dev/prod} --aws-profile {name}` 

  
  5. for check test cases : go to `test` folder and update `config.js` file with your endpoint url.

  6. Run `npm run test`


const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

console.log('API_URL:', process.env.API_URL);
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

const envConfig = `
export const environment = {
  production: true,
  API_URL: '${process.env.API_URL || 'http://localhost:3000'}',
  openaiApiKey: '${process.env.OPENAI_API_KEY || ''}'
};
`;

fs.writeFileSync('src/environments/environment.ts', envConfig);
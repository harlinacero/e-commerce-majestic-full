export const environment = {
    production: true,
    API_URL: process.env['API_URL'] || 'http://localhost:3000',
    openaiApiKey: process.env['OPENAI_API_KEY'] || ''
};

const https = require('https');

const COOKIE_NAME = 'smalg.platform.auth';

const execute = async (event) => {
    const { code } =  JSON.parse(event.body);
    if (!code) {
        return {
            status: 400,
            data: { message: 'code is required.' },
        }
    }
   
    const params = {
       code,
       client_id: process.env.GITHUB_CLIENT_ID,
       client_secret: process.env.GITHUB_CLIENT_SECRET
    };

    const authRequest = new Promise((resolve, reject) => {
        const options = {
          host: 'github.com',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          path: '/login/oauth/access_token',
          port: '443',
          method: 'POST',
        };
        
        const callback = response => {
          let body = '';
          response.on('data', chunk => body += chunk);
          response.on('end', () => resolve(body));
        };
        const req = https.request(options, callback);
        req.on('error', reject);
        req.write(JSON.stringify(params));
        
        req.end();
    });
    
    const ret = {};
    ret.data = JSON.parse(await authRequest);
    if (ret.data.error) {
        if (ret.data.error === 'bad_verification_code') {
            return {
                status: 403,
                data: ret.data,
            }
        }
        return {
            status: 400,
            data: ret.data,
        }
    }
    return ret;
}

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin' : 'https://smalg-platform.netlify.app',
        'Access-Control-Allow-Credentials' : true
    };
    try {
        const response = await execute(event);
        const statusCode = response.status || 200;
        const cookies = {
            'Set-Cookie': [
                `${COOKIE_NAME}.access_token=${response.data.access_token}; Max-Age=${response.data.expires_in}`,
                `${COOKIE_NAME}.refresh_token=${response.data.refresh_token}; Max-Age=${response.data.refresh_token_expires_in}`,
                `${COOKIE_NAME}.scope=${response.data.scope}; Max-Age=${response.data.refresh_token_expires_in}`,
                `${COOKIE_NAME}.token_type=${response.data.token_type}; Max-Age=${response.data.refresh_token_expires_in}`
            ]
        };
        return {
            statusCode,
            headers,
            //multiValueHeaders: statusCode >= 200 && statusCode < 300 | cookies,
            body: JSON.stringify(response.data),
        }
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: 'Error' }),
        } 
    }
};
 exports.handler = async (event) => {
    
    const params = `client_id=${process.env.GITHUB_CLIENT_ID}&scope=public_repo`;
    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin' : 'https://smalg-platform.netlify.app',
            'Access-Control-Allow-Credentials' : true
        },
        body: JSON.stringify({ url: `https://github.com/login/oauth/authorize?${params}` }),
    };
    return response;

};

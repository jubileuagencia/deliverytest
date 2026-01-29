
const https = require('https');
const fs = require('fs');
const path = require('path');

const token = 'sbp_7bf85eab5ae9e0578a2b2116248f7c81c4985701';
const projectRef = 'qnvlzzprxgragohfwsnc';

// Read the SQL file
const sqlFilePath = path.join(__dirname, 'create_b2b_schema.sql');
const sqlQuery = fs.readFileSync(sqlFilePath, 'utf8');

const data = JSON.stringify({
    query: sqlQuery
});

const options = {
    hostname: 'api.supabase.com',
    path: `/v1/projects/${projectRef}/database/query`,
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

const req = https.request(options, (res) => {
    let responseBody = '';

    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
            console.log('✅ Migration Successful!');
            console.log(responseBody);
        } else {
            console.error(`❌ Migration Failed: Status ${res.statusCode}`);
            console.error(responseBody);
        }
    });
});

req.on('error', (e) => {
    console.error(`❌ Request Error: ${e.message}`);
});

req.write(data);
req.end();

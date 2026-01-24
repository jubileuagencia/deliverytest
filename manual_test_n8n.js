
const WEBHOOK_URL = 'https://jubileuagencia.app.n8n.cloud/webhook-test/51d1e943-615d-4033-b7af-86b9d0040556';

const testPayload = {
    event: 'manual_test',
    message: 'Testing from Antigravity Agent',
    timestamp: new Date().toISOString()
};

console.log(`Sending manual test request to: ${WEBHOOK_URL}`);

fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testPayload)
})
    .then(async res => {
        console.log(`Status: ${res.status} ${res.statusText}`);
        const text = await res.text();
        console.log('Response:', text);
    })
    .catch(err => {
        console.error('Error sending request:', err);
    });

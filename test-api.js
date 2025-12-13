import axios from 'axios';

const testEndpoint = async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/destinations');
        console.log('Status:', res.status);
        console.log('Data:', res.data);
    } catch (err) {
        console.error('Error:', err.message);
        if (err.response) {
             console.error('Response Status:', err.response.status);
             console.error('Response Data:', err.response.data);
        }
    }
};

testEndpoint();

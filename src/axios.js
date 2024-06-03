

import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'YOUR_API_BASE_URL_HERE',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default apiClient;


import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://my-blog-server-app.vercel.app/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default apiClient;

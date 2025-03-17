import envConfiguration from "@/configurations/env.configuration-1.0.0";
import axios from 'axios';

const { backend_url } = envConfiguration;

const apiClient = axios.create({
    baseURL: backend_url,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;
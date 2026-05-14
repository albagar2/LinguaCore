import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const isGuest = localStorage.getItem('isGuest') === 'true';

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // If in guest mode, block any mutations (POST, PUT, DELETE, PATCH)
  if (isGuest && config.method && ['post', 'put', 'delete', 'patch'].includes(config.method.toLowerCase())) {
    console.warn(`[Guest Mode] Blocking ${config.method.toUpperCase()} request to ${config.url}`);
    
    toast.info("Guest Mode Active", {
      description: "Changes are not saved to the server in showcase mode."
    });

    // We throw a cancel error to prevent the request from being sent
    const controller = new AbortController();
    config.signal = controller.signal;
    controller.abort('GUEST_MODE_RESTRICTION');
    
    return Promise.reject({
      config,
      message: 'Changes are not saved in Guest Mode',
      isGuestMode: true,
      response: {
        status: 200,
        data: { message: 'Guest mode: success (mocked)', success: true }
      }
    });
  }

  return config;
});

// Add a response interceptor to handle the guest mode restriction gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.isGuestMode) {
      return Promise.resolve(error.response);
    }
    return Promise.reject(error);
  }
);

export default api;

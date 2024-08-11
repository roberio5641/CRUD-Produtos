import axios from 'axios';

    const api = axios.create({
        baseURL: 'https://interview.t-alpha.com.br',
    })

    api.interceptors.request.use(config=>{
        const token = localStorage.getItem('token');
        if(token){
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    })

    export const registerUser = async (userData) => {
      const response = await api.post('api/auth/register', userData); 
      return response.data;
    };

    export const login = async (credentials) => {
        const response = await api.post('api/auth/login', credentials);
        return response.data;
    };

    export const fetchProducts = async () => {
        const response = await api.get('/api/products/get-all-products');
        return response.data;
      };
      
      export const createProduct = async (product) => {
        const response = await api.post('/api/products/create-product', product);
        return response.data;
      };
      
      export const updateProduct = async (id, product) => {
        const response = await api.patch(`/api/products/update-product/${id}`, product);
        return response.data;
      };
      
      export const deleteProduct = async (id) => {
        const response = await api.delete(`/api/products/delete-product/${id}`);
        return response.data;
      };
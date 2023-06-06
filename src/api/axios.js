import defaultAxios from 'axios';

const axios = defaultAxios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export default axios;
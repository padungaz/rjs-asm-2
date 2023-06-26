import defaultAxios from 'axios';

// tạo một instance của axios với baseURL: ...
const axios = defaultAxios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export default axios;
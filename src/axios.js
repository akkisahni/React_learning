import axios from 'axios';

const instance = axios.create({
    baseURL:"https://burgerbuilder-4a941.firebaseio.com/"
});

export default instance;
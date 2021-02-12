import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://burgerbuilder-59a73-default-rtdb.firebaseio.com/'
})

export default instance;
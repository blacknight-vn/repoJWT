import axios from 'axios';

const axiosInstanceSignUp = axios.create({
    baseURL: 'http://localhost:8080'
});

axiosInstanceSignUp.interceptors.response.use(async (response) => {
    if (response.status === 202) {
        let message = response;    
        axios.defaults.withCredentials = true;
        await axios.get('http://localhost:8080/refresh')
        .then(async (response) => {
            console.log(response.data.message);
            if (response.data.authorization) {
                localStorage.setItem('accessToken', response.data.accessToken);
                await axios.get('http://localhost:8080/auth', {
                    headers: {'x-access-token': localStorage.getItem('accessToken')}
                }).then((response) => {
                    console.log(response.data.message);
                    message = response;
                })    
            }
        })
        return message
    }
    return response;
}, async (err) => {
    return Promise.reject(err)
})

export default axiosInstanceSignUp;

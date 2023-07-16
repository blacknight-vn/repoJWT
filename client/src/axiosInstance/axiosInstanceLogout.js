import axios from 'axios';

const axiosInstanceLogout = axios.create({
    baseURL: 'http://localhost:8080'
});

axiosInstanceLogout.interceptors.response.use((response) => {
    return response;
}, async (err) => {
    if (err.response.status === 401) {
        let message;

        axios.defaults.withCredentials = true
        await axios.get('http://localhost:8080/refresh')
        .then( async (response) => {
            console.log(response.data.message);

            if (response.data.authorization) {
                localStorage.setItem('accessToken', response.data.accessToken);
                await axios.get('http://localhost:8080/logout', {
                    headers: {'x-access-token': localStorage.getItem('accessToken')}
                }).then((response) => {
                    console.log(response.data.message);
                    message = response;
                })
            } else {
                message = response;
            }
        }
    )

        return message;
    };
    return Promise.reject(err)
})

export default axiosInstanceLogout;

import axios from 'axios';
import CallToast from './toast';

const request = (api, model, type, callBack) => {
    if (type === "post") {
        axios.post(api, model).then(res => {
            callBack(res);
        })
            .catch(err => {
                CallToast("error", err.response.data.message);
            });
    } else {
        axios.get(api).then(res => {
            callBack(res);
        })
            .catch(err => {
                CallToast("error", err.response.data.message);
            });
    }
}

export default request;
import api from '../../AxiosConfig/contacts';

const VerifyToken = async () => {


    if (!localStorage.getItem("token"))
        return false;
    
    try {
        // The code is sent by default in the header request via the Axios Config file
        const res = await api.get(`/verify_token`);
        return res.data;

    } catch (error) {
        console.log(error);
        return false;
    }
};

export default VerifyToken;

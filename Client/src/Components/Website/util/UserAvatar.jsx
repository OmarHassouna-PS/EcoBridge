import React, { useContext, useEffect, useState } from 'react'
import api from '../../../AxiosConfig/contacts';
import { Context } from '../../../Context/AuthContext';
import userImage from './../../../Images/user.png'

export default function UserAvatar({style, state, selectedImage}) {
    const [imageData, setImageData] = useState('');
    const values = useContext(Context);

    const fetchImage = async () => {
        try {
            const response = await api.get(`/get_user_avatar`);
            
            const buffer = response.data.avatar_image?.data;
            
            let binary = "";
            const bytes = new Uint8Array(buffer);
            const len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            
            const avatar = btoa(binary);
            
            setImageData(avatar);

        } catch (error) {
            console.error(error);
        }
    };
    useEffect( () => {
        fetchImage()
    }, [state, values])

    if (selectedImage) {
        return  <img src={selectedImage && URL.createObjectURL(selectedImage)} className={style} alt="View the image that will be changed" />
    }
    else if (imageData) {
        return <img src={`data:image/png;base64,${imageData}`} className={style} alt="User Image" />
    }
    else {
        return  <img src={userImage} className={style} alt="Static User Image" />
    }
}

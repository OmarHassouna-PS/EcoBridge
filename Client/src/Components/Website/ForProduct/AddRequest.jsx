import React, { useRef, useState, useEffect, useContext, useReducer } from 'react'
import { Context } from '../../../Context/AuthContext';
import '../../../CSS/Add-Show-request.css'
import Slider from '../util/Slider';
import api from '../../../AxiosConfig/contacts';
import Unauthorized from './../../Website/General/Unauthorized'
import Loader from './../../Website/General/Loader'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';


export default function AddRequest() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const goBack = () => {
    window.history.back();
  };

  const values = useContext(Context);
  const cardId = useParams('id');
  const fileRef = useRef();
  const [state, forceUpdate] = useReducer((x) => x + 1, 0);

  function notify(toastMessage, toastType) {
    toast(toastMessage, {
      type: toastType
    })
  };

  const [isEdit, setIsEdit] = useState(false);

  const [request, setRequest] = useState({
    material_type: '',
    title: '',
    condition: '',
    location: '',
    additional_info: '',
    quantity: '',
  });


  const [checkInput, setCheckInput] = useState({
    material_type: false,
    title: false,
    condition: false,
    location: false,
    additional_info: false,
    quantity: false,
  });

  const [messageWarning, setMessageWarning] = useState({
    material_type: '',
    title: '',
    condition: '',
    location: '',
    additional_info: '',
    quantity: '',
    submit: ""
  });

  const [arrayImages, setArrayImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModle] = useState('')
  const [modalImg, setModalImg] = useState('');

  // Edit
  async function getRequest() {
    try {
      const response = await api.get(`/request/${cardId.id}`);
      setRequest(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (cardId.id) {
      setIsEdit(true);
      getRequest();
    }
  }, [cardId])

  // add
  function handleGallery(event) {
    if (event.target.tagName === 'IMG') {
      setModle('block');
      setModalImg(event.target.src);
    }
  };

  function handleSliderImage(e) {
    const files = Array.from(e.target.files);
    setArrayImages((prevArray) => [...files]);
  }

  function deleteImage(index) {
    setArrayImages((prevArray) => {
      const newArray = [...prevArray];
      newArray.splice(index, 1);
      return newArray;
    });
  }

  function createElements() {
    return arrayImages.map((image, index) => (
      <div className="swiper-slide" key={index}>
        <div className="image">
          <img src={URL.createObjectURL(image)} alt="image" />
          <span onClick={() => deleteImage(index)}>&times;</span>
        </div>
      </div>
    ));
  }

  const handleButtonClick = () => {
    fileRef.current.click();
  };

  async function handleSubmitAdd(event) {
    event.preventDefault();

    if (
      request.additional_info &&
      request.condition &&
      request.location &&
      request.material_type &&
      request.quantity &&
      request.quantity > 0 &&
      request.title
    ) {
      setLoading(true);

      try {
        const res = await api.post(`/request`, { request: request, images: arrayImages }, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        notify('The request has been add successfully, your request is pending for admin approval', 'success');
        setArrayImages([]);
        setRequest({
          material_type: '',
          title: '',
          condition: '',
          location: '',
          additional_info: '',
          quantity: '',
        });
        setMessageWarning({
          ...messageWarning,
          submit:
            "",
        });
        setLoading(false);

      } catch (err) {
        setLoading(false);
        console.log(err)
        setMessageWarning({
          ...messageWarning,
          submit:
            "Something went wrong, please try again later.",
        });
      }

    } else {
      setMessageWarning({
        ...messageWarning,
        submit:
          "Please fill in all fields or verify that the input is correct.",
      });
    }
  }

  async function handleSubmitEdit(event) {
    event.preventDefault();

    if (
      request.additional_info &&
      request.condition &&
      request.location &&
      request.material_type &&
      request.quantity &&
      request.quantity > 1 &&
      request.title
    ) {

      setLoading(true);

      delete request.images
      try {
        const res = await api.put(`/request`, { request: request }, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        notify('The request has been updated successfully', 'success');
        setArrayImages([]);
        setMessageWarning({
          ...messageWarning,
          submit:
            "",
        });
        setLoading(false);
        forceUpdate()

      } catch (err) {
        setLoading(false);
        console.log(err)
        setMessageWarning({
          ...messageWarning,
          submit:
            "Something went wrong, please try again later.",
        });
      }

    } else {
      setMessageWarning({
        ...messageWarning,
        submit:
          "Please fill in all fields or verify that the input is correct.",
      });
    }
  }

  if (values.UserInfo?.role !== 'company') {
    return (
      <Unauthorized />
    )
  }

  else if (loading) {
    return (
      <Loader />
    )
  }


  return (
    <>
      <ToastContainer />
      <main className="container-fluid row justify-content-center align-items-center m-0 p-0">
        <section className="col-12 hero-card">
          <h1 className="hero-text-card">{isEdit ? 'Edit the request' : 'Add a request'}</h1>
        </section>

        <section className="container-fluid col-12 row justify-content-center my-5 py-4 container-show-request">
          <form onSubmit={isEdit ? handleSubmitEdit : handleSubmitAdd} className="row justify-content-center">
            <p className="col-12 text-start text-font black-color">

              {isEdit ? 'Edit the material recycling request form' : 'Request Material Recycling Form.'}
            </p>
            <div className="row gx-3 mb-3">
              <div className="col-12 ">
                <label
                  className="text-font text-bold-color label"
                  htmlFor="ConditionWast"
                >
                  Title
                </label>
                <input defaultValue={request?.title}
                  onBlur={(e) => setRequest({ ...request, title: e.target.value })}
                  className="form-control"
                  id="ConditionWast"
                  type="text"
                  name="title"
                />
                <span className="error-Massage" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.title}</span>
              </div>
            </div>
            <div className="row gx-3 mb-3">
              <div className="col-md-6">
                <div className="select mb-3">
                  <label
                    className="text-font text-bold-color label"
                    htmlFor="TypeOfWaste"
                  >
                    Material type
                  </label>
                  <select
                    value={request.material_type}
                    onChange={(e) => setRequest({ ...request, material_type: e.target.value })}
                    required
                    id="TypeOfWaste"
                    className="form-select form-control"
                  >
                    <option value="" disabled>
                      Choose waste type
                    </option>
                    <option value="paper">Paper</option>
                    <option value="cardboard">Cardboard</option>
                    <option value="plastic">Plastic</option>
                    <option value="glass">Glass</option>
                    <option value="metal">Metal</option>
                    <option value="electronics">Electronics</option>
                    <option value="textiles">Textiles</option>
                    <option value="batteries">Batteries</option>
                    <option value="oils">Oils</option>
                  </select>


                  <span className="error-Massage" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.material_type}</span>
                </div>
              </div>
              <div className="col-md-6">
                <label
                  className="text-font text-bold-color label"
                  htmlFor="ConditionWast"
                >
                  Condition
                </label>
                <input defaultValue={request?.condition}
                  onBlur={(e) => setRequest({ ...request, condition: e.target.value })}
                  className="form-control"
                  id="ConditionWast"
                  type="text"
                  name="ConditionWast"
                />
                <span className="error-Massage" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.condition}</span>
              </div>
            </div>
            <div className="row gx-3 mb-3">
              <div className="col-md-6">
                <label className="text-font text-bold-color label" htmlFor="location">
                  Location
                </label>
                <input defaultValue={request?.location}
                  onBlur={(e) => setRequest({ ...request, location: e.target.value })}
                  className="form-control"
                  id="location"
                  type="text"
                  name="location"
                />
                <span className="error-Massage" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.location}</span>
              </div>
              <div className="col-md-6">
                <label className="text-font text-bold-color label" htmlFor="quantity">
                  Quantity - KG
                </label>
                <input defaultValue={request?.quantity}
                  onBlur={(e) => setRequest({ ...request, quantity: e.target.value })}
                  className="form-control"
                  id="quantity"
                  type="number"
                  name="quantity"
                />
                <span className="error-Massage" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.quantity}</span>
              </div>
            </div>
            <div className="row gx-3 mb-3">
              <div className="col-12 ">
                <label className="text-font text-bold-color label" htmlFor="location">
                  Additional information
                </label>
                <textarea defaultValue={request?.additional_info}
                  onBlur={(e) => setRequest({ ...request, additional_info: e.target.value })}
                  className="form-control"
                  name=""
                  id=""
                  cols={30}
                  rows={10}
                />
                <span className="error-Massage" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.additional_info}</span>
              </div>
            </div>
            <div className="row gx-3 mb-3">
              <div className="col-12">

                <input ref={fileRef}
                  onChange={handleSliderImage}
                  className='d-none'
                  type="file"
                  multiple="multiple"
                  accept="image/jpeg, image/png, image/jpg"
                  name='images'
                  defaultValue={request.images}
                />
                {isEdit ?
                  <></>
                  :
                  <div className="md-button d-flex justify-content-start">
                    <button className="button text-center first-btn" type={'button'} onClick={handleButtonClick}>
                      Upload images
                    </button>
                  </div>
                }
                <span className="error-Massage" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.images}</span>
                <div onClick={(e) => handleGallery(e)} className="gallery">
                  <Slider blocks={createElements()} />
                </div>
              </div>
            </div>
            <div onClick={() => setModle('none')} className="modal" style={{ display: modal }}>
              <img src={modalImg} className="modal-content" style={{ display: modalImg }} />
            </div>
            <div className="md-button row  mt-4 justify-content-center gap-4">

              <button type="submit" className="button p-0">
                {isEdit ? "Save" : "Add"}
              </button>
              {isEdit &&

                <button type="button" onClick={goBack} className="button p-0">
                  Cancel 
                </button>
              }
            </div>
          </form>
          <span className="error-Massage text-center mt-3" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.submit}</span>
        </section>
      </main>
    </>
  )
}

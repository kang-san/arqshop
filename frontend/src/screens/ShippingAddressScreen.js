import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
  const navigate = useNavigate();
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);
  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  if (!userInfo) {
    navigate('/signin');
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    // if (!newLat || !newLng) {
    //   moveOn = window.confirm(
    //     'You did not set your location on map. Continue?'
    //   );
    // }
    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          city,
          postalCode,
          country,
          lat: newLat,
          lng: newLng,
        })
      );
      navigate('/payment');
    }
  };
  // const chooseOnMap = () => {
  //   dispatch(
  //     saveShippingAddress({
  //       fullName,
  //       address,
  //       city,
  //       postalCode,
  //       country,
  //       lat,
  //       lng,
  //     })
  //   );
  //   navigate('/map');
  // };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>배송정보</h1>
        </div>
        <div>
          <label htmlFor="fullName">이름</label>
          <input
            type="text"
            id="fullName"
            placeholder="이름을 입력해주세요"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">주소</label>
          <input
            type="text"
            id="address"
            placeholder="주소를 입력해주세요"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">도시</label>
          <input
            type="text"
            id="city"
            placeholder="도시를 입력해주세요"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">우편번호</label>
          <input
            type="text"
            id="postalCode"
            placeholder="우편번호를 입력해주세요"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">국가</label>
          <input
            type="text"
            id="country"
            placeholder="국가명을 입력해주세요"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        {/*<div>*/}
        {/*  <label htmlFor="chooseOnMap">Location</label>*/}
        {/*  <button type="button" onClick={chooseOnMap}>*/}
        {/*    Choose On Map*/}
        {/*  </button>*/}
        {/*</div>*/}
        <div>
          <label />
          <button className="primary" type="submit">
            배송정보 제출하기
          </button>
        </div>
      </form>
    </div>
  );
}

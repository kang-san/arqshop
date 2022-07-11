import React from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {detailsProduct, updateProduct} from "../actions/productActions";
import {PRODUCT_UPDATE_RESET} from "../constants/productConstants";
import Axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const ROOT_URL =  'http://7zone.co.kr:5000';

Axios.defaults.baseURL = ROOT_URL;
if (localStorage.getItem('auth_jwt_token')) {
  Axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
}
Axios.defaults.headers.post['Content-Type'] = 'application/json';

export default function ProductEditScreen(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const productUpdate = useSelector((state)=> state.productUpdate);
  const {loading: loadingUpdate, error: errorUpdate, success: successUpdate }= productUpdate;

  const productDetails = useSelector((state)=> state.productDetails);
  const { loading, error, product } = productDetails;
  const dispatch = useDispatch();
  useEffect(()=> {
    if(successUpdate) {
      navigate('/productlist');
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      console.log("[Product 디테일 가져오기    "+ JSON.stringify(productId))
      dispatch(detailsProduct(productId));
    }else{
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setBrand(product.brand);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }

  }, [product, dispatch, productId, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(updateProduct({
      _id: productId,
      name,
      price,
      image,
      category,
      brand,
      countInStock,
      description,
    }))
  }
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  console.log(" getUserInfo >>>>  "+userInfo.token)

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    console.log("파일 append"+JSON.stringify(formData))
    try {
      const {data} = await Axios.post(`/api/uploads`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`
          }}
      );
      console.log(" 업로드된 파일 결과 데이터   >>>>>>>>> "+JSON.stringify(data))
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      console.log("서버 전송에러")

      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  }

  return(
      <div>
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>상품 등록및 수정하기 </h1>
          </div>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && <MessageBox variant="danger">{error}</MessageBox>}
          {loading ? (
              <LoadingBox></LoadingBox>
          ) : error ? (
              <MessageBox></MessageBox>
          ) : (
              <>
                <div>
                  <label htmlFor="name">상품명</label>
                  <input
                      id="name"
                      type="text"
                      placeholer="이름을 입력해주세요"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="price">가격</label>
                  <input
                      id="price"
                      type="text"
                      placeholer="가격을 입력해주세요"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="image">상품이미지</label>
                  <input
                      id="image"
                      type="text"
                      placeholder="상품이미지명을 입력하세요"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="imageFile">파일업로드</label>
                  <input
                      type="file"
                      id="imageFile"
                      name='image'
                      accept='image/*'
                      label="상품이미지를 등록해주세요"
                      onChange={uploadFileHandler}
                  ></input>
                  {loadingUpload && <LoadingBox></LoadingBox>}
                  {errorUpload && (
                      <MessageBox variant="danger">{errorUpload}</MessageBox>
                  )}
                </div>
                <div>
                  <label htmlFor="category">카테고리</label>
                  <input
                      id="category"
                      type="text"
                      placeholer="카테고리를 입력해주세요"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="brand">브랜드</label>
                  <input
                      id="brand"
                      type="text"
                      placeholer="브랜드를 입력해주세요"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="countInStock">재고수량</label>
                  <input
                      id="countInStock"
                      type="text"
                      placeholer="재고수량을 입력해주세요"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="name">상품소개</label>
                  <textarea
                      id="description"
                      type="text"
                      placeholer="제품소개를 입력해주세요"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <label></label>
                  <button
                      className="primary"
                      type="submit"
                  >
                    제출하기
                  </button>
                </div>
              </>
          )
          }
        </form>
      </div>
  )
}
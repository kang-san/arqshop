import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';
import SearchBox from "../components/SearchBox";
import MCarousel from "../components/MCarousel";
import { Carousel } from 'react-responsive-carousel';

export default function HomeScreen() {

  const cdata = [
    {
      image:
          "https://cdn.pixabay.com/photo/2017/07/02/19/24/dumbbells-2465478_960_720.jpg",
      caption: `<div>
        스포츠 용품<br/>
      </div>`,
    },
    {
      image:
          "https://post-phinf.pstatic.net/MjAyMDA2MTdfMjcw/MDAxNTkyMzc1Nzk1MDk2.m-MSwDfyukUbMgAVNv2fg6V6tee0bwgTRMJibq1JQ-gg.bro7A-KluyWJVbGMe6syjiBRfbuB8QKFQXbkeblnB74g.JPEG/shutterstock_570190234.jpg?type=w1200",
      caption: "<div>화장품</div>",
    },
    {
      image:
          "https://phmkorea.com/wp-content/uploads/2019/12/%EC%A3%BC%EB%B0%A9-%EC%9A%A9%ED%92%88-%ED%8C%AC-%EA%B1%B8%EC%96%B4%EB%86%93%EA%B8%B0.jpg",
      caption: "<div>주방용품</div>",
    },
    {
      image:
          "http://img4.tmon.kr/cdn4/deals/2021/12/28/9442989662/original_9442989662_mobile_5b29a_1640660896production.jpg",
      caption: "<div>여행</div>",
    },
    {
      image:
          "https://cdn.mindgil.com/news/photo/202202/73617_12449_132.jpg",
      caption: "<div>가전</div>",
    },
    {
      image:
          "https://file.mk.co.kr/meet/neds/2021/05/image_readtop_2021_506874_16220146424659085.jpg",
      caption: "<div>캠핑</div>",
    },
    {
      image:
          "https://file.mk.co.kr/meet/yonhap/2022/04/29/image_readtop_2022_380934_0_101412.jpg",
      caption: "<div>장난감</div>",
    },
    {
      image:
        "http://cdn.koreahealthlog.com/news/photo/202008/24033_12826_250.jpg",
      caption: "<div>야채과일</div>",
    },
    {
      image:
      "https://img.wowtv.co.kr/wowtv_news/dnrs/20210802/B20210802141005247.jpg",
      caption: "<div>정육</div>",
    },
  ];

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  console.log("[Home Screen]    >>>>>> " + JSON.stringify(products))
  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  return (


    <div>
      <div className="row.center">
        <SearchBox />
      </div>
      <div>
        <MCarousel
            cdata={cdata}
            time={3000}
            width="850px"
            height="500px"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={true}
            thumbnailWidth="100px"
            showNavBtn={true}
            style={{
              textAlign: "center",
              maxWidth: "850px",
              margin: "10px auto",
            }}
        />
      </div>


      {/*<h2>베스트 판매자</h2>*/}
      {/*{loadingSellers ? (*/}
      {/*  <LoadingBox></LoadingBox>*/}
      {/*) : errorSellers ? (*/}
      {/*  <MessageBox variant="danger">{errorSellers}</MessageBox>*/}
      {/*) : (*/}
      {/*  <>*/}
      {/*    {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}*/}
      {/*    <Carousel showArrows autoPlay showThumbs={false}>*/}
      {/*      {sellers.map((seller) => (*/}
      {/*        <div key={seller._id}>*/}
      {/*          <Link to={`/seller/${seller._id}`}>*/}
      {/*            <img src={seller.seller.logo} alt={seller.seller.name} />*/}
      {/*            <p className="legend">{seller.seller.name}</p>*/}
      {/*          </Link>*/}
      {/*        </div>*/}
      {/*      ))}*/}
      {/*    </Carousel>*/}
      {/*  </>*/}
      {/*)}*/}

      <h2>추천 상품</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const bcrypt = require("bcryptjs");

const data = {
  users: [
    {
      name: 'san',
      email: 'junbuck@gmail.com',
      password: bcrypt.hashSync('1214', 8),
      isSeller:false,
      isAdmin: true,
      seller: {
        name: 'san',
        logo: 'https://7zone.s3.amazonaws.com/san-m.jpg',
        description: '강산',
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: 'kang',
      email: 'junbuck01@naver.com',
      password: bcrypt.hashSync('1214', 8),
      isSeller: false,
      isAdmin: true,
      seller: {
        name: 'kang',
        logo: 'https://7zone.s3.amazonaws.com/san.jpg',
        description: '강산',
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: 'choi',
      email: 'poetry707@nate.com',
      password: bcrypt.hashSync('qwer', 8),
      isSeller: false,
      isAdmin: true,
      seller: {
        name: '최윤철',
        logo: 'https://7zone.s3.amazonaws.com/logo-arq2.jpg',
        description: '최윤철',
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: 'yoon',
      email: 'poetry@nate.com',
      password: bcrypt.hashSync('qwer', 8),
      isSeller: true,
      isAdmin: false,
      seller: {
        name: '최윤철',
        logo: 'https://7zone.s3.amazonaws.com/logo-arq2.jpg',
        description: '최윤철',
        rating: 4.5,
        numReviews: 120,
      },
    },
  ],
  products: [
    {
      name: '나이키 신발',
      category: '신발',
      image: 'https://7zone.s3.amazonaws.com/nike1.jpg',
      price: 12000,
      countInStock: 10,
      brand: '나이키',
      rating: 4.5,
      numReviews: 10,
      description: '나이키 한정수량 상품입니다.',
    },
    {
      name: 'LG 디오스',
      category: '가전',
      image: 'https://7zone.s3.amazonaws.com/rf.jpg',
      price: 1000000,
      countInStock: 20,
      brand: 'LG',
      rating: 4.0,
      numReviews: 10,
      description: 'LG 디오스 냉장고 신제품(모델명: R-U913LBWS)은 ▲ 세계 최대 910 리터 용량 ▲ 세계 유일',
    },
    {
      name: '테팔 후라이팬',
      category: '주방',
      image: 'https://7zone.s3.amazonaws.com/tefal.jpg',
      price: 22000,
      countInStock: 0,
      brand: 'Lacoste',
      rating: 4.8,
      numReviews: 17,
      description: '하이 퀄리티 상품입니다',
    },
    {
      name: '나이키 슬림 바지',
      category: '바지',
      image: 'https://7zone-product.s3.amazonaws.com/nike-slim-p.jpg',
      price: 78000,
      countInStock: 15,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 14,
      description: '하이퀄리티 바지입니다.',
    },
    {
      name: '설화수 기초세트',
      category: '화장품',
      image: 'https://7zone.s3.amazonaws.com/cos1.jpg',
      price: 65000,
      countInStock: 5,
      brand: '설화수',
      rating: 4.5,
      numReviews: 10,
      description: '하이퀄리티 화장품 입니다.',
    },
    {
      name: '타임',
      category: '패션',
      image: 'https://7zone.s3.amazonaws.com/time-c.jpg',
      price: 390000,
      countInStock: 12,
      brand: 'time',
      rating: 4.5,
      numReviews: 15,
      description: '하이퀄리티 상품입니다.',
    },
    {
      name: '샤넬백',
      category: '패션',
      image: 'https://7zone.s3.amazonaws.com/chanel.jpg',
      price: 1190000,
      countInStock: 12,
      brand: 'chanel',
      rating: 4.5,
      numReviews: 15,
      description: '하이퀄리티 상품입니다.',
    },
    {
      name: '불가리',
      category: '패션',
      image: 'https://7zone.s3.amazonaws.com/b1.jpg',
      price: 2390000,
      countInStock: 12,
      brand: '불가리',
      rating: 4.5,
      numReviews: 15,
      description: '하이퀄리티 상품입니다.',
    },
  ],
};
module.exports= data;
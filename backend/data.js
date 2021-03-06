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
        logo: '/images/san-m.jpg',
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
        logo: '/images/san.jpg',
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
        logo: '/images/logo-arq2.jpg',
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
        logo: '/images/logo-arq2.jpg',
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
      image: '/images/nike1.jpg',
      price: 12000,
      countInStock: 10,
      brand: '나이키',
      rating: 4.5,
      numReviews: 10,
      description: '나이키 한정수량 상품입니다.',
    },
    {
      name: 'ST',
      category: '미용',
      image: '/images/ST.jpg',
      price: 1000000,
      countInStock: 20,
      brand: 'ST',
      rating: 4.0,
      numReviews: 10,
      description: 'ST는 피부운동 페이스 마사지기 입니다.',
    },
    {
      name: '테팔 후라이팬',
      category: '주방',
      image: '/images/tefal.jpg',
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
      image: '/images/nike-slim-p.jpg',
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
      image: '/images/cos1.jpg',
      price: 65000,
      countInStock: 5,
      brand: '설화수',
      rating: 4.5,
      numReviews: 10,
      description: '하이퀄리티 화장품 입니다.',
    },
    {
      name: '닥터콜',
      category: '건강',
      image: '/images/Dr.Call.jpg',
      price: 3500000,
      countInStock: 12,
      brand: 'DrCall',
      rating: 4.5,
      numReviews: 15,
      description: '40도의 원적외선 온열을 몸속 깊숙히 침투시켜 심부열을 형성하는 건강보조기입니다',
    },
  ],
};
module.exports= data;
/** @jsx jsx */
import { jsx } from '@emotion/core';
import ArticleList from '../components/ArticleList';

const dummy = [
  {
    id: 1,
    title: '배고파용',
    content: '점심은 뭐 먹을까요?',
    group: 'free',
    createAt: '2020-09-25T17:46:28.678Z',
    updateAt: '2020-09-25T17:46:28.678Z',
    author: {
      id: '0684305f-abe2-40d0-a035-07b6f282da07',
      name: 'kaka',
      group: 'food',
      thumbnail: null,
      coverImg: null,
      email: 'kaka@test.com',
      description: null,
    },
  },
  {
    id: 2,
    title: '까페는 어떨까요?',
    content: '까페는 항상 사람이 많던데',
    group: 'free',
    createAt: '2020-09-25T18:49:28.223Z',
    updateAt: '2020-09-25T18:49:28.223Z',
    author: {
      id: '0684305f-abe2-40d0-a035-07b6f282da07',
      name: 'kaka',
      group: 'food',
      thumbnail: null,
      coverImg: null,
      email: 'kaka@test.com',
      description: null,
    },
  },
  {
    id: 3,
    title: '까페는 어떨까요2?',
    content: '까페는 항상 사람이 많던데',
    group: 'free',
    createAt: '2020-09-25T19:19:14.980Z',
    updateAt: '2020-09-25T19:19:14.980Z',
    author: {
      id: '0684305f-abe2-40d0-a035-07b6f282da07',
      name: 'kaka',
      group: 'food',
      thumbnail: null,
      coverImg: null,
      email: 'kaka@test.com',
      description: null,
    },
  },
];

export default (function HomePage(): JSX.Element {
  // const {
  //   product: { products: allProducts, toggleWish, wishs },
  //   ui: { productPage, productPageUp, productScroll },
  // } = useStore();

  return <ArticleList articles={dummy} />;
});

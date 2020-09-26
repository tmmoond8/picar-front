import { observable } from 'mobx';
import Article from '../types/Article';
import APIS from '../apis';

export interface ArticleStoreInterface {
  bestArticles: Article[];
  articles: Article[];
}

class ArticleStore implements ArticleStoreInterface {
  @observable bestArticles: Article[];
  @observable articles: Article[];

  constructor() {
    this.bestArticles = [];
    this.articles = [];
    this.fetch();
  }

  async fetch() {
    try {
      const {
        data: { articles },
      } = await APIS.article.list();
      this.articles = articles;
    } catch (error) {
      console.error(error);
    }
  }
}

export default ArticleStore;

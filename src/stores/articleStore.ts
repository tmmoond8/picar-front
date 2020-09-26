import { observable, computed, action } from 'mobx';
import Article from '../types/Article';

export interface ArticleStoreInterface {
  bestArticles: Article[];
}

class ArticleStore implements ArticleStoreInterface {
  @observable bestArticles: Article[];

  constructor() {
    this.bestArticles = [];
  }
}

export default ArticleStore;

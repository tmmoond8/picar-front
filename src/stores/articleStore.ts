import { observable, computed, action } from 'mobx';
import Article from '../types/Article';
import APIS from '../apis';
import { navigations } from '../types/constants';

export interface ArticleStoreInterface {
  bestArticles: Article[];
  articles: Article[];
  selectedGroup: string;
  groupIndex: number;
}

class ArticleStore implements ArticleStoreInterface {
  @observable bestArticles: Article[];
  @observable articles: Article[];
  @observable selectedGroup: string;

  constructor() {
    this.bestArticles = [];
    this.articles = [];
    this.selectedGroup = navigations[0].name;
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

  @computed
  get groupIndex() {
    return Math.max(
      navigations.findIndex(({ name }) => name === this.selectedGroup),
      0,
    );
  }

  set groupIndex(index: number) {
    this.selectedGroup = navigations[index].name;
  }
}

export default ArticleStore;

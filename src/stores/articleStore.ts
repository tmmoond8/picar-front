import { observable, computed, action } from 'mobx';
import Article from '../types/Article';
import APIS from '../apis';
import { NAVIGATIONS, LOUNGE, LOUNGES } from '../types/constants';

export interface ArticleStoreInterface {
  bestArticles: Article[];
  articles: Article[];
  selectedGroup: string;
  groupIndex: number;
  selectedLounge: string;
}

class ArticleStore implements ArticleStoreInterface {
  @observable bestArticles: Article[];
  @observable articles: Article[];
  @observable selectedGroup: string;
  @observable selectedLounge: string;

  constructor() {
    this.bestArticles = [];
    this.articles = [];
    this.selectedGroup = LOUNGE;
    this.selectedLounge = LOUNGES[0].name;
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
      NAVIGATIONS.findIndex(({ name }) => name === this.selectedGroup),
      0,
    );
  }

  set groupIndex(index: number) {
    this.selectedGroup = NAVIGATIONS[index].name;
  }
}

export default ArticleStore;

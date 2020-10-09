import { observable, computed, action } from 'mobx';
import Article from '../types/Article';
import APIS from '../apis';
import { NAVIGATIONS, ROUNGE, ROUNGES } from '../types/constants';

export interface ArticleStoreInterface {
  bestArticles: Article[];
  articles: Article[];
  selectedGroup: string;
  groupIndex: number;
  selectedRounge: string;
  flickingMoveTo: (index: number) => void;
}

class ArticleStore implements ArticleStoreInterface {
  @observable bestArticles: Article[];
  @observable articles: Article[];
  @observable selectedGroup: string;
  @observable selectedRounge: string;
  @observable flickingMoveTo: (index: number) => void;

  constructor() {
    this.bestArticles = [];
    this.articles = [];
    this.selectedGroup = ROUNGE;
    this.selectedRounge = ROUNGES[0].name;
    this.flickingMoveTo = () => {
      console.error('flickingMoveTo not initalized');
    };
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

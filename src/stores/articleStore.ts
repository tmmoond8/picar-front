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
  loungeArticles: Article[];
  freeArticles: Article[];
  humorArticles: Article[];
  govermentSupportArticles: Article[];
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
    this.fetchList();
  }

  async fetchList() {
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
  
  @computed
  get loungeArticles() {
    return this.articles.filter(
      (_article) => _article.group === this.selectedLounge,
    );
  }

  @computed
  get freeArticles() {
    return this.articles.filter((article) => article.group === '자유');
  }

  @computed
  get humorArticles() {
    return this.articles.filter((article) => article.group === '유머');
  }

  @computed
  get govermentSupportArticles() {
    return this.articles.filter((article) => article.group === '정부지원');
  }
}

export default ArticleStore;

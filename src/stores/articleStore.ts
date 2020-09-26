import { observable, computed } from 'mobx';
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
    this.selectedGroup = navigations[1].name;
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
    let foundIndex = navigations.findIndex(
      ({ name }) => name === this.selectedGroup,
    );
    if (foundIndex) {
      return foundIndex;
    }
    foundIndex = (navigations[0] as any).items.findIndex(
      (subNav: any) => subNav.name === this.selectedGroup,
    );
    return foundIndex;
  }
}

export default ArticleStore;

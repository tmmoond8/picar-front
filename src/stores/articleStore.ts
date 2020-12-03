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
  bookmarks: Set<number>;
  addBookmark: (articleId?: number) => void;
  removeBookmark: (articleId?: number) => void;
}

class ArticleStore implements ArticleStoreInterface {
  @observable bestArticles: Article[];
  @observable articles: Article[];
  @observable selectedGroup: string;
  @observable selectedLounge: string;
  @observable bookmarks: Set<number>;

  constructor() {
    this.bestArticles = [];
    this.articles = [];
    this.selectedGroup = LOUNGE;
    this.selectedLounge = LOUNGES[0].name;
    this.bookmarks = new Set();
    this.fetchList();
    this.fetchBookmark();
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

  async fetchBookmark() {
    try {
      const {
        data: { bookmarks },
      } = await APIS.bookmark.list();

      this.bookmarks = new Set(bookmarks);
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

  @action
  async addBookmark(articleId?: number) {
    if (!articleId) return;
    try {
      await APIS.bookmark.add(articleId);
      this.bookmarks = new Set(this.bookmarks).add(articleId);
    } catch (error) {
      console.error(error);
    }
  }
  @action
  async removeBookmark(articleId?: number) {
    if (!articleId) return;
    try {
      await APIS.bookmark.remove(articleId);
      const newBookmarks = new Set(this.bookmarks);
      newBookmarks.delete(articleId);
      this.bookmarks = newBookmarks;
    } catch (error) {
      console.error(error);
    }
  }
}

export default ArticleStore;

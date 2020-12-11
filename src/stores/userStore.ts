import { observable, action } from 'mobx';
import Cookies from 'js-cookie';
import APIS from '../apis';
import { Profile } from '../types/User';


const initalProfile = {
  code: 'guest',
  name: 'guest',
  thumbnail: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1604485453/noticon/s1qvpjwfeim5gqbvm2cl.png',
  profileImage: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1604485453/noticon/s1qvpjwfeim5gqbvm2cl.png',
  description: '',
  group: '요식업',
  isOwner: true,
  email: 'test@gmail.com',
}

export interface UserStoreInterface {
  profile: Profile;
  setProfile: (profile: Profile) => void;
  bookmarks: Set<number>;
  addBookmark: (articleId?: number) => void;
  removeBookmark: (articleId?: number) => void;
  needLogin: () => boolean;
}

class UserStore implements UserStoreInterface {
  @observable profile: Profile;
  @observable bookmarks: Set<number>;
  @observable needLogin: () => boolean;
  
  constructor() {
    this.profile = initalProfile;
    this.bookmarks = new Set();
    this.fetch();
    this.fetchBookmark();
    this.needLogin = () => (console.log('need initialized'), false);
  }

  async fetch() {
    try {
      const {
        data: {
          ok, data
        },
      } = await APIS.auth.getUser();
      if (ok) {
        this.profile = data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  @action
  setProfile(profile: Profile) {
    this.profile = profile;
    this.fetchBookmark();
  }

  async fetchBookmark() {
    if(!Cookies.get('access_token')) {
      return;
    }
    
    try {
      const {
        data: { bookmarks },
      } = await APIS.bookmark.list();

      this.bookmarks = new Set(bookmarks);
    } catch (error) {
      console.error(error);
    }
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

export default UserStore;

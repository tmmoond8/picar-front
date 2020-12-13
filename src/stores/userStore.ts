import { observable, action } from 'mobx';
import Cookies from 'js-cookie';
import APIS from '../apis';
import { Profile } from '../types/User';
import { EmotionType } from '../types/Emotion';


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
  bookmarks: Set<number>;
  emotions: Record<number, EmotionType | null>;
  setProfile: (profile: Profile) => void;
  addBookmark: (articleId?: number) => void;
  removeBookmark: (articleId?: number) => void;
  needLogin: () => boolean;
  setEmotion: (articleId: number, emotionType: EmotionType | null) => void;
}

class UserStore implements UserStoreInterface {
  @observable profile: Profile;
  @observable bookmarks: Set<number>;
  @observable emotions: Record<number, EmotionType | null>;
  @observable needLogin: () => boolean;
  
  constructor() {
    this.profile = initalProfile;
    this.bookmarks = new Set();
    this.emotions = {};
    this.fetch();
    this.needLogin = () => (console.log('need initialized'), false);
    if(Cookies.get('access_token')) {
      this.fetchBookmark();
      this.fetchEmotion();
    }
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
    this.fetchEmotion();
  }

  async fetchBookmark() {
    try {
      const {
        data: { ok, bookmarks },
      } = await APIS.bookmark.list();
      if (ok) {
        this.bookmarks = new Set(bookmarks);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async fetchEmotion() {
    try {
      const {
        data: { ok, emotions },
      } = await APIS.emotion.list();
      if (ok) {
        this.emotions = emotions.reduce((accum, emotion) => {
          accum[emotion.articleId] = emotion.type;
          return accum; 
        }, {} as Record<number, EmotionType>)
      }
    } catch (error) {
      console.error(error);
    }
  }

  @action
  async setEmotion(articleId: number, emotionType: EmotionType | null) {
    this.emotions = {
      ...this.emotions,
      [articleId]: emotionType,
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

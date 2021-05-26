import { observable, action, computed } from 'mobx';
import APIS from '../apis';
import { Profile } from '../types/User';
import { Notification } from '../types/Notification';
import Comment from '../types/Comment';
import { EmotionType } from '../types/Emotion';
import { Stores, CommonStore } from '.';

const initalProfile = {
  code: 'guest',
  name: 'guest',
  thumbnail: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1604485453/noticon/s1qvpjwfeim5gqbvm2cl.png',
  profileImage: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1604485453/noticon/s1qvpjwfeim5gqbvm2cl.png',
  description: '',
  group: '테슬라 모델Y',
  isOwner: true,
  email: 'test@gmail.com',
}

export interface UserStoreInterface extends CommonStore {
  profile: Profile;
  bookmarks: Set<number>;
  emotions: Record<number, EmotionType>;
  comments: Record<number, Comment[]>;
  notifications: Notification[];
  setProfile: (profile: Profile) => void;
  addBookmark: (articleId?: number) => void;
  removeBookmark: (articleId?: number) => void;
  needLogin: () => boolean;
  setEmotion: (articleId: number, emotionType: EmotionType) => void;
  checkNotifications: (notificationIds: string[]) => void;
  isLogined: boolean;
}

class UserStore implements UserStoreInterface {
  @observable profile: Profile;
  @observable bookmarks: Set<number>;
  @observable emotions: Record<number, EmotionType>;
  @observable comments: Record<number, Comment[]>;
  @observable notifications: Notification[];
  @observable needLogin: () => boolean;
  rootStore: Stores | null;

  constructor() {
    this.profile = initalProfile;
    this.bookmarks = new Set();
    this.emotions = {};
    this.comments = {};
    this.notifications = [];
    this.fetch();
    this.needLogin = () => (console.log('need initialized'), true);
    this.rootStore = null;
  }

  fetchUserData() {
    this.fetchBookmark();
    this.fetchEmotion();
    this.fetchComment();
    this.fetchNotification();
  }

  async fetch() {
    try {
      const {
        data: {
          ok, data
        },
      } = await APIS.auth.getUser();
      if (ok) {
        this.setProfile(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  @action
  setProfile(profile: Profile) {
    this.profile = profile;
    this.fetchUserData();
    this.rootStore!.article.selectedLounge = profile.group ?? this.rootStore!.article.selectedGroup;
  }

  async fetchComment() {
    try {
      const {
        data: { ok, userComments },
      } = await APIS.comment.getMyComments();
      if (ok) {
        this.comments = userComments.reduce((accum, comment) => {
          if (!accum[comment.articleId]) {
            accum[comment.articleId] = [];
          }
          accum[comment.articleId].push(comment);
          return accum;
        }, {} as Record<number, Comment[]>)
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
  async setEmotion(articleId: number, emotionType: EmotionType) {
    if (this.emotions[articleId] === emotionType) {
      const nextEmotion = { ...this.emotions };
      delete nextEmotion[articleId];
      this.emotions = nextEmotion;
    } else {
      this.emotions = {
        ...this.emotions,
        [articleId]: emotionType,
      }
    }
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

  async fetchNotification() {
    try {
      const {
        data,
      } = await APIS.notification.list();
      if (data.ok) {
        this.notifications = data.notifications;
      }
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

  @action
  async checkNotifications(notificationIds: string[]) {
    this.notifications = this.notifications.map(noti => {
      if (notificationIds.includes(noti.id)) {
        noti.isViewd = true;
      }
      return noti;
    })
  }

  @computed
  get isLogined() {
    return this.profile.code !== 'guest';
  }

  bindRoot(rootStore: Stores) {
    this.rootStore = rootStore;
  }
}

export default UserStore;

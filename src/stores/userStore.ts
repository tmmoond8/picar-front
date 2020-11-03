import { observable, computed } from 'mobx';
import Article from '../types/Article';
import APIS from '../apis';
import { Profile } from '../types/User';

export interface UserStoreInterface {
  profile: Profile | null;
}

class UserStore implements UserStoreInterface {
  @observable profile: Profile | null;

  constructor() {
    this.profile = null;
  }

  // async fetch() {
  //   try {
  //     const {
  //       data: { articles },
  //     } = await APIS.article.list();
  //     this.articles = articles;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

}

export default UserStore;

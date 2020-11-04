import { observable, computed } from 'mobx';
import APIS from '../apis';
import { Profile } from '../types/User';

export interface UserStoreInterface {
  profile: Profile | null;
}

class UserStore implements UserStoreInterface {
  @observable profile: Profile | null;

  constructor() {
    this.profile = null;
    this.fetch();
  }

  async fetch() {
    try {
      const {
        data: {
          ok, data
        },
      } = await APIS.auth.check();
      if (ok) {
        this.profile = data;
      }
    } catch (error) {
      console.error(error);
    }
  }

}

export default UserStore;

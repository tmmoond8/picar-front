import { observable, action, computed } from 'mobx';
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
}

class UserStore implements UserStoreInterface {
  @observable _profile: Profile;

  constructor() {
    this._profile = initalProfile;
    this.fetch();
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

  @computed
  get profile() {
    return this._profile;
  }

  set profile(profile: Profile) {
    this._profile = profile;
  }
}

export default UserStore;

import firebase from 'firebase';

import env from '../env';

const firebaseConfig = {
  apiKey: env.REACT_APP_API_URL,
  authDomain: env.REACT_APP_FB_AUTH_DOMAIN,
  databaseURL: env.REACT_APP_FB_URL,
  projectId: env.REACT_APP_FB_PROJECT_ID,
  storageBucket: env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: env.REACT_APP_FB_APP_ID,
  measurementId: env.REACT_APP_FB_MEASUREMENT_ID,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

class Firebase {
  private firebase: firebase.database.Database;
  constructor() {
    this.firebase = firebase.database();
  }
  async getViews(): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      this.firebase.ref('/').on('value', function (data) {
        resolve(data.toJSON() ?? {});
      });
    });
  }
  async increaseView(id: string): Promise<void> {
    const target = this.firebase.ref(`/${id}`);
    const targetValue = await target.once('value');
    target.set(targetValue.val() + 1);
  }
}
export default new Firebase();
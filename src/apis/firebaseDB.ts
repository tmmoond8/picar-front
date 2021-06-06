import firebase from 'firebase';

import env from '../env';

const firebaseConfig = {
  apiKey: env.REACT_APP_FB_API_KEY,
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
  async increaseView(id: string): Promise<number> {
    const target = this.firebase.ref(`/${id}`);
    try {
      const targetValue = await target.once('value');
      target.set(targetValue.val() + 1);
      return targetValue.val() + 1;
    } catch (error) {
      return -1;
    }
  }
}
export default new Firebase();
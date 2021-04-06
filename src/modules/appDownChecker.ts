import { differenceInDays } from 'date-fns';
const APP_DOWNLOAD = 'APP_DOWNLOAD';

export default {
  saveLocal: () => {
    localStorage.setItem(APP_DOWNLOAD, Date.now().toString());
  },
  saveSession: () => {
    sessionStorage.setItem(APP_DOWNLOAD, Date.now().toString());
  },
  needShow: () => {
    const local = localStorage.getItem(APP_DOWNLOAD);
    const session = sessionStorage.getItem(APP_DOWNLOAD);
    const diffLocalDays = local ? differenceInDays(Date.now(), new Date(parseInt(local))) : 0;
    const diffSessionDays = session ? differenceInDays(Date.now(), new Date(parseInt(session))) : 0;
    if (local && diffLocalDays < 1 || session &&  diffSessionDays < 3) {
      return false;
    }
    return true;
  }
}
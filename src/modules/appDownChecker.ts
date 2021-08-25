import differenceInDays from 'date-fns/differenceInSeconds';
const APP_DOWNLOAD = 'APP_DOWNLOAD';

const localStorage = globalThis?.localStorage;

export default {
  saveLocal: () => {
    if (!localStorage) return;
    localStorage.setItem(APP_DOWNLOAD, Date.now().toString());
  },
  saveSession: () => {
    if (!localStorage) return;
    sessionStorage.setItem(APP_DOWNLOAD, Date.now().toString());
  },
  needShow: () => {
    if (!localStorage) return false;
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
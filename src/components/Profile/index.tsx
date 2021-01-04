import Photo from './Photo';
import * as Whos from './Who';
import Profile from './Profile';
import Form from './ModificationForm';
import * as StylingComponent from './StylingComponent';

export default {
  Photo,
  Profile,
  Form,
  ...Whos,
  ...StylingComponent,
};

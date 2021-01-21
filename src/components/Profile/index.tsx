import Photo from './Photo';
import * as Whos from './Who';
import Profile from './Profile';
import Form from './ModificationForm';
import Header from './Header';
import * as StylingComponent from './StylingComponent';

export default {
  Photo,
  Profile,
  Header,
  Form,
  ...Whos,
  ...StylingComponent,
};

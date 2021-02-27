import Squircle from '../Squircle';
import * as Whos from './Who';
import Profile from './Profile';
import Form from './ModificationForm';
import Header from './Header';
import * as StylingComponent from './StylingComponent';

export default {
  Photo: Squircle,
  Profile,
  Header,
  Form,
  ...Whos,
  ...StylingComponent,
};

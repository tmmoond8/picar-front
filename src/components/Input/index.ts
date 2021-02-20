import TextField from './TextField';
import TextFieldOutline from './TextFieldOutline';
import Switch from './Switch';
import Label from './Label';
import TextArea from './TextArea';
import * as hooks from './hooks';
import { TextFieldHandler as _TextFieldHandler } from './hooks';

export default {
  TextField,
  TextFieldOutline,
  TextArea,
  Label,
  Switch,
  ...hooks,
}

export type TextFieldHandler = _TextFieldHandler;
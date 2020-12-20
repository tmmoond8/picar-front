import TextField from './TextField';
import TextFieldOutline from './TextFieldOutline';
import Switch from './Switch';
import Label from './Label';
import * as hooks from './hooks';
import { TextFieldHandler as _TextFieldHandler } from './hooks';

export default {
  TextField,
  TextFieldOutline,
  Label,
  Switch,
  ...hooks,
}

export type TextFieldHandler = _TextFieldHandler;
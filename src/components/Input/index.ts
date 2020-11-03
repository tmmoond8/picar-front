import TextField from './TextField';
import Switch from './Switch';
import * as hooks from './hooks';
import { TextFieldHandler as _TextFieldHandler } from './hooks';

export default {
  TextField,
  Switch,
  ...hooks,
}

export type TextFieldHandler = _TextFieldHandler;
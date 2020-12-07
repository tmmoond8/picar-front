import TextField from './TextField';
import Switch from './Switch';
import Label from './Label';
import * as hooks from './hooks';
import { TextFieldHandler as _TextFieldHandler } from './hooks';

export default {
  TextField,
  Label,
  Switch,
  ...hooks,
}

export type TextFieldHandler = _TextFieldHandler;
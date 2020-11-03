import TextField from './TextField';
import Switch from './Switch';
import * as hooks from './hooks';
import { TextFiledHandler as _TextFiledHandler } from './hooks';

export default {
  TextField,
  Switch,
  ...hooks,
}

export type TextFiledHandler = _TextFiledHandler;
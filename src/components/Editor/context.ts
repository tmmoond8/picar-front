import React from 'react';
import Article from '../../types/Article';

export { observer } from 'mobx-react';

const EditorContext = React.createContext<{
  article?: Article;
  title: string;
  step: number;
  content: string;
  selected: string;
  onClose: () => void;
  setStep: (step: number) => void;
  setTitle: (title: string) => void;
  setSelected: (selcted: string) => void;
  setContent: (content: string) => void;
  HeaderRight?: React.ReactNode;
}>({
  title: '',
  content: '',
  step: 0,
  selected: '',
  setStep: () => {},
  setTitle: () => {},
  setContent: () => {},
  setSelected: () => {},
  onClose: () => {},
});

EditorContext.displayName = 'EditorContext';

export const useEditorContext = () => {
  return React.useContext(EditorContext);
};

export default EditorContext;
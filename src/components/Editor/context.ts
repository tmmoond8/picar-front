import React from 'react';
import Article from '../../types/Article';

export { observer } from 'mobx-react';

const EditorContext = React.createContext<{
  article?: Article;
  title: string;
  step: number;
  content: string;
  selected: string;
  photos: string;
  thumbnail: string;
  onClose: () => void;
  setStep: (step: number) => void;
  setTitle: (title: string) => void;
  setSelected: (selcted: string) => void;
  setContent: (content: string) => void;
  syncArticle: (article: Article) => void;
  setPhotos: (photos: string) => void;
  setThumbnail: (thumbnail: string) => void;
}>({
  title: '',
  content: '',
  step: 0,
  selected: '',
  photos: '',
  thumbnail: '',
  setStep: () => {},
  setTitle: () => {},
  setContent: () => {},
  setSelected: () => {},
  onClose: () => {},
  syncArticle: () => {},
  setPhotos: () => {},
  setThumbnail: () => {},
});

EditorContext.displayName = 'EditorContext';

export const useEditorContext = () => {
  return React.useContext(EditorContext);
};

export default EditorContext;
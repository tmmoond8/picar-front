import React, { ReactNode, useContext } from 'react';
import {
  Provider,
  MobXProviderContext,
  observer as _observer,
} from 'mobx-react';
import ArticleStore, { ArticleStoreInterface } from './articleStore';

export interface Stores {
  article: ArticleStoreInterface;
}

export const article = new ArticleStore();

const rootStore: Stores = {
  article,
};

export const MobxProvider = (props: { children: ReactNode }): JSX.Element => (
  <Provider {...rootStore}>{props.children}</Provider>
);

export const useStore = () => useContext(MobXProviderContext) as Stores;

export const observer = _observer;

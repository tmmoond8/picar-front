import React, { ReactNode, useContext } from 'react';
import {
  Provider,
  MobXProviderContext,
  observer as _observer,
} from 'mobx-react';
import ArticleStore, { ArticleStoreInterface } from './articleStore';
import UiStroe, { UiStoreInterface } from './uiStore';

export interface Stores {
  article: ArticleStoreInterface;
  ui: UiStoreInterface;
}

export const article = new ArticleStore();
export const ui = new UiStroe();

const rootStore: Stores = {
  article,
  ui,
};

export const MobxProvider = (props: { children: ReactNode }): JSX.Element => (
  <Provider {...rootStore}>{props.children}</Provider>
);

export const useStore = () => useContext(MobXProviderContext) as Stores;

export const observer = _observer;

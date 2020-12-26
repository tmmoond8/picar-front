import React, { ReactNode, useContext } from 'react';
import {
  Provider,
  MobXProviderContext,
  observer as _observer,
} from 'mobx-react';
import ArticleStore, { ArticleStoreInterface } from './articleStore';
import UiStroe, { UiStoreInterface } from './uiStore';
import UserStroe, { UserStoreInterface } from './userStore';
import UtilStroe, { UtilStoreInterface } from './utilStore';

export interface Stores {
  article: ArticleStoreInterface;
  ui: UiStoreInterface;
  user: UserStoreInterface;
  util: UtilStoreInterface;
}

export const article = new ArticleStore();
export const ui = new UiStroe();
export const user = new UserStroe();
export const util = new UtilStroe();

const rootStore: Stores = {
  article,
  ui,
  user,
  util,
};

export const MobxProvider = (props: { children: ReactNode }): JSX.Element => (
  <Provider {...rootStore}>{props.children}</Provider>
);

export const useStore = () => useContext(MobXProviderContext) as Stores;

export const observer = _observer;

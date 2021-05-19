import BaseHelmet from './BaseHelmet';
import ArticleHelmet from './ArticleHelmet';

type OwwnersHelmet = typeof BaseHelmet & {
  Article: typeof ArticleHelmet;
}

(BaseHelmet as OwwnersHelmet).Article = ArticleHelmet;

export default BaseHelmet as OwwnersHelmet;
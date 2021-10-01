import BaseHelmet from './BaseHelmet';
import ArticleHelmet from './ArticleHelmet';

type PicarHelmet = typeof BaseHelmet & {
  Article: typeof ArticleHelmet;
};

(BaseHelmet as PicarHelmet).Article = ArticleHelmet;

export default BaseHelmet as PicarHelmet;

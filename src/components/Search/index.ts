import SearchInput from './SearchInput';
import PopularArticleList from './PopularArticleList';
import Recommandations from './Recommandations';
import * as StylingComponents from './StylingComponent';

export default {
    Input: SearchInput,
    PopArticles: PopularArticleList,
    Recommandations: Recommandations,
    ...StylingComponents,
}
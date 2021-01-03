import SearchInput from './SearchInput';
import PopularArticleList from './PopularArticleList';
import Recommandations from './Recommandations';
import SearchResults from './SearchResults';
import UserList from './UserList';
import * as StylingComponents from './StylingComponent';

export default {
    Input: SearchInput,
    PopArticles: PopularArticleList,
    Recommandations: Recommandations,
    SearchResults: SearchResults,
    UserList: UserList,
    ...StylingComponents,
}
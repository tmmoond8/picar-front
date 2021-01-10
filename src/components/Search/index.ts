import SearchInput from './SearchInput';
import PopularArticleList from './PopularArticleList';
import Recommendations from './Recommendations';
import SearchResults from './SearchResults';
import UserList from './UserList';
import * as StylingComponents from './StylingComponent';

export default {
    Input: SearchInput,
    PopArticles: PopularArticleList,
    Recommendations: Recommendations,
    SearchResults: SearchResults,
    UserList: UserList,
    ...StylingComponents,
}
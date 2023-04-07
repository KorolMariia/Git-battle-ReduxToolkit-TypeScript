import { useEffect, memo, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPopularRepos } from '../../state/popularSlice';
import Loader from '../../Components/Loader';
import { RootState, GetPopularReposParams } from '../../types';
import { ThunkDispatch } from 'redux-thunk';

const Repos: FC = memo((): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, any>>();
  const loading = useSelector(({ popular }: RootState) => popular.loading);
  const repos = useSelector(({ popular }: RootState) => popular.repos);
  const selectedLanguage = useSelector(({ popular }: RootState) => popular.selectedLanguage);
  const searchName = useSelector(({ popular }: RootState) => popular.searchName);

  useEffect((): void => {
    const params: GetPopularReposParams = { selectedLanguage, searchName };
    if (params.searchName) {
      dispatch(getPopularRepos(params));
    } else {
      dispatch(getPopularRepos({ selectedLanguage }));
    }
  }, [dispatch, selectedLanguage, searchName]);



  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ul className="popular-list">
        {repos.length ? (
          repos.map((repo, index) => (
            <li key={repo.id} className="popular-item">
              <div className="popular-rank">#{index + 1}</div>
              <ul className="space-list-items">
                <li>
                  <img
                    className="avatar"
                    src={repo.owner.avatar_url}
                    alt="Avatar"
                  />
                </li>
                <li>
                  <a href={repo.html_url} target="_blank" rel="noreferrer">
                    {repo.name}
                  </a>
                </li>
                <li>@{repo.owner.login}</li>
                <li>{repo.stargazers_count}</li>
              </ul>
            </li>
          ))
        ) : (
          <p className="error">No repos</p>
        )}
      </ul>
    </>
  );
});

export default Repos;
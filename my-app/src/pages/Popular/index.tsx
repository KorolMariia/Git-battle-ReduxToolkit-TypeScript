import { FC } from 'react';
import SearchRepos from './SearchRepos';
import Languages from './Languages';
import Repos from './Repos';

const Popular: FC = (): JSX.Element => (
  <>
    <SearchRepos />
    <Languages />
    <Repos />
  </>
);

export default Popular;

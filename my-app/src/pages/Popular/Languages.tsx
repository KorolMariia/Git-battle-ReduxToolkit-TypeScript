import { memo, FC, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../../state/popularSlice';
import { RootState } from '../../types';

const Languages: FC = memo((): JSX.Element => {
  const dispatch = useDispatch();
  const languages = useSelector(({ popular }: RootState) => popular.languages);
  const selectedLanguage = useSelector(({ popular }: RootState) => popular.selectedLanguage);

  return (
    <>
      <ul className="languages">
        {languages.map((language: string): JSX.Element => (
          <li
            key={language}
            className={selectedLanguage === language.toLowerCase() ? 'active' : ''}
            onClick={(): void => {
              dispatch(setLanguage(language.toLowerCase()));
            }}
          >
            {language as ReactNode}
          </li>
        ))}
      </ul>
    </>
  );
});

export default Languages;

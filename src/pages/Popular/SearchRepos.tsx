import { useState, useCallback, memo, ChangeEvent, KeyboardEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import { setSearchName } from '../../state/popularSlice';
import { BiSearchAlt } from 'react-icons/bi';
import { RootState } from '../../types';

const SearchRepos: FC = memo((): JSX.Element => {
  const dispatch = useDispatch();
  const searchName = useSelector(({ popular }: RootState) => popular.searchName);
  const [searchValue, setSearchValue] = useState(searchName);
  const [errorSearchValue, setErrorSearchValue] = useState<string | null>(null);

  const delayedSearch = useCallback(
    debounce((searchValue: string) => {
      dispatch(setSearchName(searchValue));
    }, 600),
    [dispatch],
  );

  type InputEvent = ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>;

  const onChangeHandler = (event: InputEvent) => {
    const value = (event.target as HTMLInputElement).value;
    setSearchValue(value);
    if (!value) {
      setErrorSearchValue('This field is required');
      delayedSearch(value);
    } else if (!/^[a-zA-Z]+$/gi.test(value)) {
      setErrorSearchValue('This field must contain only English letters');
    } else {
      delayedSearch(value);
      setErrorSearchValue(null);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setErrorSearchValue(null);
      setSearchValue('');
    }
    if (event.key === 'Enter') {
      onChangeHandler(event as InputEvent);
      setSearchValue('');
    }
  };

  return (
    <>
      <div className="search-wrap">
        <input
          type="text"
          onChange={onChangeHandler}
          value={searchValue}
          className="searchTerm"
          placeholder="Enter name ..."
          onKeyDown={handleKeyDown}
          aria-describedby="search-error"
        />
        {errorSearchValue && <span id="search-error">{errorSearchValue}</span>}
        <button className="searchButton">
          <BiSearchAlt />
        </button>
      </div>
    </>
  );
});

export default SearchRepos;

import { useState, memo, FC, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPlayer } from '../../state/battleSlice';
import Loader from '../../Components/Loader';
import { RootState, InputPlayerProps } from '../../types';
import { ThunkDispatch } from 'redux-thunk';

const InputPlayer: FC<InputPlayerProps> = memo(({ id }): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, any>>();
  const loadingPlayer = useSelector(({ battle }: RootState) => battle.loadingPlayer);
  const errorPlayer = useSelector(({ battle }: RootState) => battle.errorPlayer);
  const [username, setUsername] = useState('');

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    const params = { username, id };
    dispatch(getPlayer(params));
    setUsername('');
  };

  return (
    <div className="column border">
      {loadingPlayer[id] ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="column">
          <label className="header">
            Username {id}:
            <input
              className="inputPlayer"
              id={String(id)}
              type="text"
              placeholder="GitHub username"
              autoComplete="off"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
          <button className="button" disabled={!username}>
            Submit
          </button>
        </form>
      )}
      {errorPlayer[id] && <div className="error">{errorPlayer[id]}</div>}
    </div>
  );
});

export default InputPlayer;

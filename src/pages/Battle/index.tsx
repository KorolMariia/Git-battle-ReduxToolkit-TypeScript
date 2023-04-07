import { useMemo, Fragment, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleReset } from '../../state/battleSlice';
import InputPlayer from './InputPlayer';
import PreviewPlayer from './PreviewPlayer';
import { RootState } from '../../types';

const Battle: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const initialStatePlayers = useSelector(({ battle }: RootState) => battle.initialStatePlayers);
  const playersIds = useSelector(({ battle }: RootState) => battle.playersIds)

  const renderPlayers = () =>
    playersIds.map((id: number): JSX.Element => {
      const { username, avatar } = initialStatePlayers[id];
      return (
        <Fragment key={id}>
          {avatar ? (
            <PreviewPlayer avatar={avatar} username={username}>
              <input
                type="button"
                className="reset"
                value="Reset"
                onClick={() => dispatch(handleReset(id))}
              />
            </PreviewPlayer>
          ) : (
            <InputPlayer key={id} id={id} />
          )}
        </Fragment>
      );
    });

  const showBattleButton = useMemo(() => {
    return (
      Object.values(initialStatePlayers).every(({ avatar }) => avatar) && (
        <Link
          to={{
            pathname: '/battle/results',
            search: `?playerOne=${initialStatePlayers[1].username}&playerTwo=${initialStatePlayers[2].username}`,
          }}
          className="button"
        >
          Battle
        </Link>
      )
    );
  }, [initialStatePlayers]);

  return (
    <>
      <section className="row">{renderPlayers()}</section>
      {showBattleButton}
    </>
  );
};

export default Battle;

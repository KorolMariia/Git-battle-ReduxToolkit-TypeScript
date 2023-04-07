import { useEffect, memo, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Link } from 'react-router-dom';
import { getBattle, handleReset } from '../../state/battleSlice';
import PreviewPlayer from './PreviewPlayer';
import Loader from '../../Components/Loader';
import { MdThumbDown } from 'react-icons/md';
import { GiTargetPrize } from 'react-icons/gi';
import { RootState, renderPlayer } from '../../types';

const ButtleResults: FC = memo((): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, any>>();
  const loadingBattle = useSelector(({ battle }: RootState) => battle.loadingBattle);
  const resultsBattle = useSelector(({ battle }: RootState) => battle.resultsBattle);
  const queryParams = new URLSearchParams(window.location.search);
  const playerOne = queryParams.get('playerOne') || '';
  const playerTwo = queryParams.get('playerTwo') || '';

  useEffect(() => {
    const params: string[] = [playerOne, playerTwo]
    dispatch(getBattle(params));
  }, [playerOne, playerTwo, dispatch]);

  if (loadingBattle) {
    return <Loader />;
  }

  const renderPlayer = ({ player, score }: renderPlayer, index: number) => (
    <PreviewPlayer
      key={player.id}
      username={player.login}
      avatar={player.avatar_url}
    >
      <p className="playerStatus">
        {index ? (
          <>
            <MdThumbDown />
            Loser
          </>
        ) : (
          <>
            <GiTargetPrize />
            Winner
          </>
        )}
      </p>
      <p className="playerStatus">Score: {score}</p>
      <ul className="space-list-items">
        {player.location ? (
          <li>
            <span className="descPlayer">Location:</span> {player.location}
          </li>
        ) : null}
        {player.company ? (
          <li>
            <span className="descPlayer">Company:</span> {player.company}
          </li>
        ) : null}
        {player.followers ? (
          <li>
            <span className="descPlayer">Followers:</span> {player.followers}
          </li>
        ) : null}
        {player.following ? (
          <li>
            <span className="descPlayer">Following:</span> {player.following}
          </li>
        ) : null}
        {player.public_repos ? (
          <li>
            <span className="descPlayer">Public Repos: </span>
            {player.public_repos}
          </li>
        ) : null}
        <li>
          <a href={player.blog} target="_blank" rel="noopener noreferrer">
            {player.blog}
          </a>
        </li>
      </ul>
    </PreviewPlayer>
  );

  const showPlayers = () => {
    return resultsBattle.length ? (
      resultsBattle.map(renderPlayer)
    ) : (
      <p className="error">Failed to load battle results.</p>
    );
  };

  return (
    <>
      <section className="row">{showPlayers()}</section>
      <Link
        to="/battle"
        className="button"
        onClick={(): void => {
          dispatch(handleReset(1));
          dispatch(handleReset(2));
        }}
      >
        Go back
      </Link>
    </>
  );
});

export default ButtleResults;

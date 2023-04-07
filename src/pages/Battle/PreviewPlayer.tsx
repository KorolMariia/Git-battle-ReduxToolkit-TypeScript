import { memo } from 'react';
import { PreviewPlayerProps } from '../../types';

const PreviewPlayer = memo(({ username, avatar, children }: PreviewPlayerProps): JSX.Element => {
  return (
    <div className="column border">
      <img className="avatar" src={avatar} alt="Avatar" />
      <h2 className="username">{username}</h2>
      {children}
    </div>
  );
});

export default PreviewPlayer;

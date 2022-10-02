import './leader.scss';

export type LeaderProps = {
  avatar: string,
  name: string,
  score: string,
}

export const LeaderItem = (props: LeaderProps) => {
  const { avatar, name, score } = props;
  return (
    <li className="leader-list__item">
      <div className="avatar">
        <img src={avatar} />
      </div>
      <div className="name">{name}</div>
      <div className="score">{score}</div>
    </li>
  )
}

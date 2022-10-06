import { PureComponent } from 'react'

export class LeaderItem extends PureComponent {
  // constructor(props) {
  //     super(props);

  // }
  render() {
    const { avatar, name, score } = this.props
    return (
      <div>
        <div className="avatar">
          <img src={avatar} />
        </div>
        <div className="name">{name}</div>
        <div className="score">{score}</div>
      </div>
    )
  }
}

import React from 'react'
import Api from './api'


function Repo({repo}) {
  const {name, desc, lang, stars, forks} = repo
  return (
    <li className='repo'>
      <div className='name'>{name}</div>
      <div className='desc'>{desc}</div>
      <div className='lang'>{lang}</div>
      <div className='stars'>{stars}</div>
      <div className='forks'>{forks}</div>
    </li>
  )
}

/****************** START Repo box branches *************************/
function UserNotFound({username}) {
  return (
    <div className='not-valid'>
      <h4> The user {username} was not found</h4>
    </div>
  )
}

function RepoLoading() {
  return (
    <div className='loading'>
      <h4> Loading </h4>
    </div>
  )
}

function RepoHelp() {
  return (
    <div className='no-username'>
      <h4> Type the github username above and press ENTER </h4>
    </div>
  )
}

function EmptyRepos({username}) {
  return (
    <div className='no-repos'>
      <h4> No repos for user {username} </h4>
    </div>
  )
}

function RepoList(props) {
  return (
    <div>
      <h3>User {props.username} </h3>
      <ul className="repo-list">
        {
          props.repos.map( repo => ( <Repo key={repo.name} repo={repo} /> ) )
        }
      </ul>
    </div>
  )
}
/****************** END Repo box branches *************************/

function RepoContent(props) {
  return props.username ?
    props.loading ?
      <RepoLoading />
      : props.valid ?
          props.repos ?
            <RepoList {...props} />
            : <EmptyRepos {...props} />
          : <UserNotFound {...props} />
    : <RepoHelp />
}

class UsernameInput extends React.Component {
  constructor() {
    super()
    this.state = {username: null}
  }

  render() {
    return (
      <div>
        <label> username </label>
        <input
          onBlur={this.userChangedFocus.bind(this)}
          onKeyUp={this.userChangedKey.bind(this)}
        />
      </div>
    )
  }

  userChanged(username) {
    if( this.state.username === username ) return
    this.setState({username})
    this.props.onUserChange(username)
  }

  userChangedKey(e) {
    if( e.key === 'Enter' ) {
      this.userChanged(e.target.value)
    }
  }

  userChangedFocus(e) {
    this.userChanged(e.target.value)
  }
}

class Repos extends React.Component {
  constructor() {
    super()
    this.state = {username: null, repos: null, valid: null, loading: false}
  }

  render() {
    return (
      <div>
        <UsernameInput onUserChange={this.onUserChange.bind(this)} />
        <RepoContent {...this.state}/>
      </div>
    )
  }

  onUserChange(username) {
    this.setState({username})
    if (username) {
      this.loadRepos(username)
    }
  }

  async loadRepos(username) {
    this.setState({loading: true})
    const {ok, response} = await Api.fetchReposP(username)
    let repos, valid = false
    if (ok) {
      repos = await response
      valid = true
    }
    console.log('setting state', repos)
    this.setState({repos, valid, loading: false})
  }
}

export default Repos

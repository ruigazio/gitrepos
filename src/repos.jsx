import React from 'react'
import Api from './api'

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

function UserNotFound({username}) {
  return (
    <h4> The user {username} was not found</h4>
  )
}


function EmptyRepos({username}) {
  return (
    <h4> No repos for user {username} </h4>
  )
}

function RepoList(props) {
  function Repo(props) {
    return (
        <li className="repo">
          {props.repo.name}
        </li>
    )
  }

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

function RepoContent(props) {
  return props.valid ?
    props.repos ?
      ( <RepoList {...props} /> )
      : ( <EmptyRepos {...props} /> )
    : <UserNotFound {...props} />
}

class Repos extends React.Component {
  constructor() {
    super()
    this.state = {username: null, repos: null, valid: null}
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
    this.loadRepos(username)
  }

  async loadRepos(username) {
    const {ok, response} = await Api.fetchReposP(username)
    let repos, valid = false
    if (ok) {
      repos = await response
      valid = true
    }
    console.log('setting state', repos)
    this.setState({repos, valid})
  }
}


export default Repos

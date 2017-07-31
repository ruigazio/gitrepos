const reposEndpoint = 'http://localhost:3000/githubUserRepos/'

async function fetchReposP(username) {
  const response =  await fetch( reposEndpoint + username )
  return {
    ok: response.ok,
    response: response.json()
  }
}

export default { fetchReposP }


/*
 * returns a request object
 */
function getOptions(username) {
  return {
    hostname: 'api.github.com',
    port: 443,
    path: `/users/${username}/repos`,
    method: 'GET',
    // setting HTTP headers
    headers: {
      'User-Agent': 'ruigazio'
    }
  }
}

function prune ( response, body ) {
  /********************** START OF FUNCTIONS  *********************/
  function pluck( repo ) {
    const { name, description, language,
      stargazers_count, forks_count, html_url
    } = repo
    return {
      name,
      desc: description,
      lang: language,
      stars: stargazers_count,
      forks: forks_count,
      url: html_url
    }
  }
  /********************** END OF FUNCTIONS  ***********************/

  const repos = JSON.parse( body )
  repos.sort( (a, b) => a.stargazers_count - b.stargazers_count )

  return {
    status: 200,
    body: repos.slice(0, 10).map( pluck )
  }
}

/*
 * transparent error handling for the sake of simplicity
 */
function error (response, body) {
  let error
  console.log( 'body: ', body )
  try {
    error = JSON.parse( body )
  } catch (e) {
    error = { error: body }
  }
  return {
    status: response.statusCode,
    body: error
  }
}

module.exports = {
  getOptions,
  success: prune,
  failure: error
}

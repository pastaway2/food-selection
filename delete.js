const { Octokit } = require("@octokit/core");

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
    auth: process.env.TOKEN
  });

  (async () => {
  octokit.request('DELETE /repos/{owner}/{repo}/labels/{name}', {
    owner: 'pastaway2',
    repo: 'try-action',
    name: 'eat this week'
  })
})();
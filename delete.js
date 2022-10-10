const { Octokit } = require("@octokit/core");

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
    auth: process.env.TOKEN
    //auth: "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"
  });

  (async () => {
  octokit.request('DELETE /repos/{owner}/{repo}/labels/{name}', {
    owner: 'pastaway2',
    repo: 'try-action',
    name: 'eat this week'
  })
})();
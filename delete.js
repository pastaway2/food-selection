const { Octokit } = require("@octokit/core");

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
    auth: "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"
  });

  (async () => {
  octokit.request('DELETE /repos/{owner}/{repo}/labels/{name}', {
    owner: 'pastaway2',
    repo: 'try-action',
    name: 'eat this week'
  })
})();
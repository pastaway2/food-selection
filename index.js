const { Octokit } = require("@octokit/core");

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
    auth: node.env.GITHUB_AUTH
  });
  




  (async () => {
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
            owner: 'juice-shop',
            repo: 'juice-shop'
          });

        console.log(response)
    } catch (error) {
        console.log('error  ==> ', error);
    }
})();
//const { Octokit } = require("@octokit/core");
import { Octokit } from "octokit";

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH
  });
  

  (async () => {
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
            owner: 'pastaway2',
            repo: 'try-action'
        });


        const issues = response.data.map(r => {
            return {
                number: r.number,
                title: r.title,
                labels: r.labels.map(l => { return { name: l.name }})
            }
        })

        const filterissues = issues.filter(issue => {
          let haslabel = false

          for(let label of issue.labels){
            if(label.name == 'eat this week') haslabel= true
          }
          return !haslabel
      })

        console.log('Repo issues ==> ', filterissues)
        

        const random = Math.floor(Math.random() * filterissues.length);

        const selected = filterissues[random]
        console.log('This week I eat ==> ', selected)

        if(selected == undefined)
          return false

        await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/labels', {
        owner: 'pastaway2',
        repo: 'try-action',
        issue_number: selected.number,
        labels: [
        'eat this week', 
        ]
        })

    } catch (error) {
        console.log('error  ==> ', error);
    }
})();

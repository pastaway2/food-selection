const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/core");

const octokit = new Octokit({
  auth: process.env.TOKEN
});

let key = core.getInput('food_delete');
if (key == 'food') {






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
          labels: r.labels.map(l => { return { name: l.name } })
        }
      })

      const filterissues = issues.filter(issue => {
        let haslabel = false

        for (let label of issue.labels) {
          if (label.name == 'eat this week') haslabel = true
        }
        return !haslabel
      })

      console.log('Repo issues ==> ', filterissues)


      const random = Math.floor(Math.random() * filterissues.length);

      const selected = filterissues[random]
      console.log('This week I eat ==> ', selected)

      if (selected == undefined)
        return false

      await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/labels', {
        owner: 'pastaway2',
        repo: 'try-action',
        issue_number: selected.number,
        labels: [
          'eat this week',
        ]
      })

      await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/assignees', {
        owner: 'pastaway2',
        repo: 'try-action',
        issue_number: selected.number,
        assignees: [
          'pastaway2',
          'jb7045955'
        ]
      })

    } catch (error) {
      console.log('error  ==> ', error);
    }
  })();

} else {
  (async () => {
    octokit.request('DELETE /repos/{owner}/{repo}/labels/{name}', {
      owner: 'pastaway2',
      repo: 'try-action',
      name: 'eat this week'
    })

    const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner: 'pastaway2',
      repo: 'try-action'
    });


    const issues = response.data.map(r => {
      octokit.request('DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees', {
        owner: 'pastaway2',
        repo: 'try-action',
        issue_number: r.issue_number,
        assignees: [
          'pastaway2'
        ]
      })
    })
  })();
}
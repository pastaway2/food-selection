const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/core");

//Auth to use Octokit
const octokit = new Octokit({
  auth: process.env.TOKEN
});

//To check wether to get the food or reset
let key = core.getInput('food_delete');
if (key == 'food') {


  (async () => {
    try {
      
 //Get all issues in a single repo
      const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: 'pastaway2',
        repo: 'try-action'
      });

//Show in the log what are the issue from the repo
      const issues = response.data.map(r => {
        return {
          number: r.number,
          title: r.title,
          labels: r.labels.map(l => { return { name: l.name } })
        }
      })

 //Filter the issue to get all issue that has no "eaten" label
      const filterissues = issues.filter(issue => {
        let haslabel = false

        for (let label of issue.labels) {
          if (label.name == 'eaten') haslabel = true
        }
        return !haslabel
      })

      console.log('Repo issues ==> ', filterissues)

 //Randomly select issue from the filter issue
      const random = Math.floor(Math.random() * filterissues.length);
      const selected = filterissues[random]
      console.log('This week I eat ==> ', selected)

      if (selected == undefined)
        return false

 //Update the selected issue to create label
      await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/labels', {
        owner: 'pastaway2',
        repo: 'try-action',
        issue_number: selected.number,
        labels: [
          'eaten',
        ]
      })

 //Assign the issue to pastaway2
      await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/assignees', {
        owner: 'pastaway2',
        repo: 'try-action',
        issue_number: selected.number,
        assignees: [
          'pastaway2'
        ]
      })

    } catch (error) {
      console.log('error  ==> ', error);
    }
  })();

} else {
  (async () => {
    
//Delete the "eaten" label
    octokit.request('DELETE /repos/{owner}/{repo}/labels/{name}', {
      owner: 'pastaway2',
      repo: 'try-action',
      name: 'eaten'
    })

    const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner: 'pastaway2',
      repo: 'try-action'
    });

//Remove the assignee
    const issues = response.data.map(r => {
      octokit.request('DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees', {
        owner: 'pastaway2',
        repo: 'try-action',
        issue_number: r.number,
        assignees: [
          'pastaway2'
        ]
      })

    })

    
  })();
}

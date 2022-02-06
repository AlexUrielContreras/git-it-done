var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoName = function () {
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];
    if (repoName) {
    repoNameEl.textContent = repoName;
    getRepoIssures(repoName)
    }else {
        document.location.replace("./index.html");
    }
}

var getRepoIssures = function (repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayIssue(data);
                if (response.headers.get("Link")) {
                    displayWarning(repo)
                }
            });
        } else {
            document.location.replace("./index.html")
        };
    });
}

    var displayIssue = function (issues) {
        if (issues.length === 0) {
            issueContainerEl.textContent = "This repo has no open issues!"
        }
        for (var i = 0; i < issues.length; i++) {
            //create a link element to take users to the issue on github 
            var issueEl = document.createElement("a");
            issueEl.classList = "list-item flex-row justify-space-between align-center";
            issueEl.setAttribute("href", issues[i].html_url);
            issueEl.setAttribute("target", "_blank");

            var titleEl = document.createElement("span");
            titleEl.textContent = issues[i].title

            // append to container
            issueEl.appendChild(titleEl);

            // create a type element
            var typeEl = document.createElement("span");
            //check if issue is an actual issue or a pull request
            if (issues[i].pull_request) {
                typeEl.textContent = "(pull request)";
            } else {
                typeEl.textContent = "(Issue)";
            }
            issueEl.appendChild(typeEl);
            issueContainerEl.appendChild(issueEl)
        };
    };

var displayWarning = function(repo) {
 //add text waring container
    limitWarningEl.textContent = "To see more than 30 issues, visit"
    var linkEl = document.createElement("a");
    linkEl.textContent = " See more issues on github.com ";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    limitWarningEl.appendChild(linkEl);
};


getRepoName();
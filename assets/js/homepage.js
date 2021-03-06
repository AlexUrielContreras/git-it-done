var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageButtonEl = document.querySelector("#lang-btn")

var getUserRepos = function (user) {
    // format the github api url 
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url 
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            displayRepos(data, user);

        });
    });
};
var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value form input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please entere a Github username");
    }
};

var displayRepos = function (repos, searchTerm) {
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    for (var i = 0; i < repos.length; i++) {
        //format repo names
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo 
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // create span element to hold repository name 
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //appen to container 
        repoEl.appendChild(titleEl);

        //append container to dom
        repoContainerEl.appendChild(repoEl);
    }
};

var getFeaturedRepos = function (language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data.items, language)
            });
        } else {
            alert("Error: Github User Not Found");
        };
    });
};

var buttonClickHandler = function (event) {
    var language = event.target.getAttribute("data-language");
    
    if (language) {
        getFeaturedRepos(language)
        repoContainerEl.textContent = "";
    }
}












userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonEl.addEventListener("click", buttonClickHandler);
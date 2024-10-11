window.onload = () => {
    changeStatus("empty");

    let allLanguages = ''

    fetch('./api/prog-languages.json')
        .then((response) => response.json())
        .then((json) => {
            allLanguages = json.map(lang => `language:${lang.value}`).join(' ')
            json.forEach(element => {
                document.querySelector("#prog-languages").appendChild(
                    new Option(element.title, element.value)
                )
            })
        })

    document.getElementById("prog-languages").addEventListener("change", () => {
        changeStatus("loading");

        load()
    })

    function load() {
        const languageName = document.getElementById("prog-languages").value;

        const githubUrl = new URL('https://api.github.com/search/repositories');
        githubUrl.searchParams.append('per_page', '1');
        githubUrl.searchParams.append('page', Math.floor(Math.random() * 1000)) + 1;
        githubUrl.searchParams.append('q', languageName ? `language:${languageName}` : 'stars:>0');
        githubUrl.searchParams.append('order', Math.random() < 0.5 ? 'asc' : 'desc');

        fetch(githubUrl)
            .then(response => response.json())
            .then(json => {
                if (json.items.length > 0) {
                    changeStatus("loaded");

                    const repo = json.items[0]
                    document.getElementById("description").textContent = repo["description"]
                    document.getElementById("language").textContent = repo["language"]
                    document.getElementById("name").textContent = repo["name"]
                    document.getElementById("forks_count").textContent = repo["forks_count"]
                    document.getElementById("open_issues_count").textContent = repo["open_issues_count"]
                    document.getElementById("stargazers_count").textContent = repo["stargazers_count"]
                }
            }).catch(e => {
                changeStatus("error")
            });
    }

    document.getElementById("main-button-refresh").addEventListener("click", () => {
        changeStatus("loading");

        load()
    })

    document.getElementById("main-button-retry").addEventListener("click", () => {
        changeStatus("loading");

        load()
    })

    function changeStatus(status) {
        console.log("status", status)
        switch (status) {
            case "empty": {
                document.getElementById("main-content").style.display = "flex";
                document.getElementById("main-button-refresh").style.display = "none";
                document.getElementById("main-button-retry").style.display = "none";
                document.getElementById("main-content-error").style.display = "none";
                document.getElementById("main-content-success").style.display = "none";
                break;
            }
            case "loading": {
                document.getElementById("main-content").style.display = "flex";
                document.getElementById("main-button-refresh").style.display = "none";
                document.getElementById("main-button-retry").style.display = "none";
                document.getElementById("main-content-error").style.display = "none";
                document.getElementById("main-content-success").style.display = "none";
                document.getElementById("prog-languages").disabled = true;
                document.getElementById("main-content").textContent = "Loadind, please wait..."
                break;
            }
            case "loaded": {
                document.getElementById("prog-languages").disabled = false;
                document.getElementById("main-content-success").style.display = "flex";
                document.getElementById("main-button-refresh").style.display = "flex";
                document.getElementById("main-content").style.display = "none";
                break;
            }
            case "error": {
                document.getElementById("prog-languages").disabled = false;
                document.getElementById("main-content-success").style.display = "none";
                document.getElementById("main-button-refresh").style.display = "none";
                document.getElementById("main-content").style.display = "none";
                document.getElementById("main-button-retry").style.display = "flex";
                document.getElementById("main-content-error").style.display = "flex";
                break;
            }
        }
    }


}
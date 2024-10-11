window.onload = () => {
    changeStatus("empty");

    fetch('./api/prog-languages.json')
        .then((response) => response.json())
        .then((json) => json.forEach(element => {
            document.querySelector("#prog-languages").appendChild(
                new Option(element.title, element.value)
            )
        }))

    document.getElementById("prog-languages").addEventListener("change", () => {
        changeStatus("loading");

        load()
    })

    function load() {
        fetch('./api/repos.json')
            .then((response) => response.json())
            .then((json) => {
                if (json) {
                    changeStatus("loaded");

                    json.forEach(element => {
                        Object.keys(element).forEach(keyname => {
                            document.getElementById(keyname).textContent = element[keyname]
                        });
                    })
                }
            })
    }

    document.getElementById("refresh-button").addEventListener("click", () => {
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
                // document.getElementById("prog-languages").selected
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
$(document).ready(function(){

    async function loadGBFSs(url) {
        let response = await fetch(url);
        let rawCsv = await response.text();
        let csv = $.csv.toArrays(rawCsv);
        csv.shift(); // remove csv header row
        return csv;
    }

    async function loadSelector(url){
        const csv = await loadGBFSs(url);
        const selectGBFS = document.getElementById("selector_gbfs");

        for (let i in csv) {
            let opt = csv[i][1];
            let el = document.createElement("option");
            el.setAttribute("id", csv[i][3]);
            el.textContent = opt;
            el.value = opt;
            selectGBFS.appendChild(el);
        }
    }

    loadSelector('https://raw.githubusercontent.com/landersanmi/GBFS_Systems/main/gbfs_systems.csv');
    
});

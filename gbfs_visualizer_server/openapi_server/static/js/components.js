$(document).ready(function(){

    // Carga del componente en base a los sistemas propocionados en el .csv de la URL
    async function loadGBFSs(url) {
        let response = await fetch(url);
        let rawCsv = await response.text();
        let csv = $.csv.toArrays(rawCsv);
        csv.shift(); // Nos saltamos la fila de los nombres de las columnas
        return csv;
    }

    async function loadSelector(url){
        const csv = await loadGBFSs(url);
        const selectGBFS = document.getElementById("selector_gbfs");

        for (let i in csv) {
            let opt = csv[i][1];
            
            let el = document.createElement("option");
            el.setAttribute("id", csv[i][3]);
            el.value = opt;
            
            let gbfsName = document.createElement("span");
            gbfsName.innerText = opt;
            gbfsName.setAttribute("itemprop", "legalName")
            el.appendChild(gbfsName);
            
            let organizationSection = document.createElement("section");
            organizationSection.setAttribute("itemprop", "organization")
            organizationSection.setAttribute("itemscope", "");
            organizationSection.setAttribute("itemtype", "https://schema.org/Organization");
            organizationSection.appendChild(el);

            let apiSection = document.createElement("section");
            apiSection.setAttribute("itemscope", "");
            apiSection.setAttribute("itemtype", "https://schema.org/WebAPI");
            apiSection.appendChild(organizationSection);

            selectGBFS.appendChild(apiSection);
        }
    }

    loadSelector('https://raw.githubusercontent.com/landersanmi/GBFS_Visualizer/main/gbfs_visualizer_server/openapi_server/db/gbfs_systems.csv');
});

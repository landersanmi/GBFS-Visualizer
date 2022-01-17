$(document).ready(function() {

    "use strict";
  
    /**
     * Cache variables
     */
    var menu = document.querySelector("#c-circle-nav");
    var toggle = document.querySelector("#c-circle-nav__toggle");
    var mask = document.createElement("div");
    var activeClass = "is-active";
  
    /**
     * Create mask
     */
    mask.classList.add("c-mask");
    document.body.appendChild(mask);
  
    /**
     * Listen for clicks on the toggle
     */
    toggle.addEventListener("click", function(e) {
      e.preventDefault();
      toggle.classList.contains(activeClass) ? deactivateMenu() : activateMenu();
    });
  
    /**
     * Listen for clicks on the mask, which should close the menu
     */
    mask.addEventListener("click", function() {
      deactivateMenu();
      console.log('click');
    });
  
    /**
     * Activate the menu 
     */
    function activateMenu() {
      menu.classList.add(activeClass);
      toggle.classList.add(activeClass);
      mask.classList.add(activeClass);
    }
  
    /**
     * Deactivate the menu 
     */
    function deactivateMenu() {
      menu.classList.remove(activeClass);
      toggle.classList.remove(activeClass);
      mask.classList.remove(activeClass);
    }

    function getLang() {
      if (navigator.languages != undefined) 
        return navigator.languages[0]; 
      return navigator.language;
    }

    var language;
    var languageFromQuery = document.getElementById('language').textContent;

    if(languageFromQuery==='noLang' || languageFromQuery ===""){
      language = getLang();
    }else{
      language = languageFromQuery;
    }

    var lang1, lang2, lang1Parent, lang2Parent;
    var TOKEN = document.getElementById('token').textContent;
    console.log("LANG RECIBIDO", language);
    if(language==='eu_ES') language = 'eu';
    if(language==='es'){
      lang1 = document.getElementById('icon_language1');
      lang1.textContent="EN";
      lang1Parent = lang1.parentElement;
      lang1Parent.removeAttribute('href');
      lang1Parent.setAttribute("href", 'http://127.0.0.1:8080/login?token=' + TOKEN + '&lang=en');

      lang2 =document.getElementById('icon_language2');
      lang2.textContent="EU";
      lang2Parent = lang2.parentElement;
      lang2Parent.removeAttribute('href');
      lang2Parent.setAttribute("href", 'http://127.0.0.1:8080/login?token=' + TOKEN + '&lang=eu');
    }else if(language==='eu'){
      lang1 = document.getElementById('icon_language1');
      lang1.textContent="EN";
      lang1Parent = lang1.parentElement;
      lang1Parent.removeAttribute('href');
      lang1Parent.setAttribute("href", 'http://127.0.0.1:8080/login?token=' + TOKEN + '&lang=en');
      
      lang2 =document.getElementById('icon_language2');
      lang2.textContent="CA";
      lang2Parent = lang2.parentElement;
      lang2Parent.removeAttribute('href');
      lang2Parent.setAttribute("href", 'http://127.0.0.1:8080/login?token=' + TOKEN + '&lang=es');
    }else{
      lang1 = document.getElementById('icon_language1');
      lang1.textContent="CA";
      lang1Parent = lang1.parentElement;
      lang1Parent.removeAttribute('href');
      lang1Parent.setAttribute("href", 'http://127.0.0.1:8080/login?token=' + TOKEN + '&lang=es');
      
      lang2 =document.getElementById('icon_language2');
      lang2.textContent="EU";
      lang2Parent = lang2.parentElement;
      lang2Parent.removeAttribute('href');
      lang2Parent.setAttribute("href", 'http://127.0.0.1:8080/login?token=' + TOKEN + '&lang=eu');
    }
  
});
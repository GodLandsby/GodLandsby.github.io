
function switch_page(name) {
    window.history.pushState('', '', new URL(`?${name}`, window.location.href));
    window.dispatchEvent(new Event('popstate'));
}

(async function(){

    const contentsWriter = new ContentsWriter(document.getElementsByTagName("main").item(0), ["top", "menu", "gallery"]);
    const writePage = async () => await contentsWriter.write(window.location.search.slice(1) || "top");
    window.addEventListener('popstate', writePage);
    writePage();

}());
async function setupMenu(element) {
    if(!element) return;
    const md = (await (await fetch(`https://godlandsby.github.io/menu.md`)).text()).replace(/　/g, " ").replace(/-\s?/g, "").replace(/\s*：\s*/g, ":").replace(/~/g, "～").replace(/¥/g, "￥");
    const data = md.split(/#\s?/g).filter(v=>v);
    for(let i in data) {
        const contents = data[i].split(/\n/g).filter(v=>v);
        const header = contents.shift();
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        thead.innerHTML = `<tr><th colspan="2">${header}</th></tr>`;
        for(let content of contents) {
            const tr = document.createElement("tr");
            const tmp = content.split(/:/);
            tr.innerHTML = `<th>${tmp[0]}</th><td>${tmp[1]||""}</td>`;
            tbody.appendChild(tr);
        }
        table.appendChild(thead);
        table.appendChild(tbody);
        element.appendChild(table);
    }
    element.appendChild(document.createElement("table"));
}
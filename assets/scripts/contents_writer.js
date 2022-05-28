
class ContentsWriter {

    #element;

    #stored_elements;

    #contents = {};

    constructor(target_element, stored_elements=[]) {
        this.#element = target_element;
        this.#stored_elements = stored_elements;
    }

    async getContent(name) {
        return (await fetch(`https://godlandsby.github.io/assets/html/${name}.html`)).text();
    }

    async write(name) {
        if(name in this.#contents) {
            this.#element.innerHTML = "";
            for(let child of this.#contents[name]) this.#element.appendChild(child.cloneNode(true));
            return;
        }
        const content = await this.getContent(name);
        this.#element.innerHTML = content;
        if(this.#stored_elements.includes(name)) this.#contents[name] = this.#element.cloneNode(true).children;
    }
}
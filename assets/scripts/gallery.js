async function setupGallery(element) {
    if(!element) return;
    element.innerHTML = "";
    const selected_image = {
        element: null
    }
    const data = (await (await fetch(`https://raw.githubusercontent.com/Godlandsby/Godlandsby.github.io/main/gallery`)).text());
    const list = data.split(/\n/g);
    console.log(list)
    let index = 0;
    const init_length = (10 < list.length)? 10 : list.length;
    while(index < init_length) showImage(element, list[index++], selected_image);
    const showImages = async()=>{
        while(true) {
            if(index >= list.length || window.innerHeight + 100 < element.getBoundingClientRect().bottom) break;
            await showImage(element, list[index++], selected_image);
        }
    }
    await showImages();
    let state = false;
    document.onscroll = async(e)=>{
        if(state) return;
        state = true;
        await showImages();
        state = false;
    }
}

async function showImage(element, url, selected_image) {
    const image = document.createElement("img");
    image.src = url;
    image.className = "";
    image.onclick = ()=>{
        const before_element = selected_image.element;
        image.classList.add("selected");
        selected_image.element = image;
        if(before_element) before_element.className = "loaded";
        if(before_element == image) selected_image.element = null;
    }
    element.appendChild(image);
    await new Promise((resolve)=>{
        image.onload = ()=>{
            image.className = "loaded";
            resolve();
        }
    });
}
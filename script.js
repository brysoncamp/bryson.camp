const projects = [
    {
        title: "Split Prompt",
        description: "Recursive Prompt Splitter for ChatGPT",
        tags: ["Website", "JavaScript", "Tag12", "Tag13"]
    },
    {
        title: "PyFiddle",
        description: "Run and share Python code snippets online",
        tags: ["Web App", "React", "AWS", "Pyodide"]
    },
    {
        title: "Multi-Select for Xero",
        description: "Edit multiple rows in a bill at once",
        tags: ["Web Extension", "JavaScript"]
    },
    {
        title: "DropEntry",
        description: "Automate data entry for Xero",
        tags: ["Web App", "React", "AWS", "Xero API"]
    }
]

const items = []

projects.forEach(project => {
    const tagsHTML = project.tags.map(tag => `<div class="tag">${tag}</div>`).join('');
    const itemHTML = `<div class="item">
        <div class="image-container"></div>
        <div class="info-container">
            <div class="title">${project.title}</div>
            <div class="description">${project.description}</div>
        </div>
        <div class="tags-container">${tagsHTML}</div>
    </div>`;
    items.push(itemHTML);
});

let scrollEnabled = true;

const columns = document.querySelectorAll(".column");

let i = 0;
const getNewItem = () => {
    i = (i + 1) % items.length;
    return items[i];
}

const addNewItem = (column, position) => {
    window.requestAnimationFrame(() => {
        const item = getNewItem();
        column.insertAdjacentHTML(position, item);
    });
    
}

const removeTopItem = (column) => column.removeChild(column.firstChild);
const removeBottomItem = (column) => column.removeChild(column.lastChild);

const addNewTopItem = (column) => window.requestAnimationFrame(() => {
    addNewItem(column, "afterbegin");
    removeBottomItem(column);
});

const addNewBottomItem = (column) => window.requestAnimationFrame(() => {
    addNewItem(column, "beforeend");
    removeTopItem(column);
});

const updateColumnItems = (column) => {
    const scrollableHeight = column.scrollHeight - column.clientHeight;

    const newTopItemRequired = column.scrollTop < scrollableHeight*0.25;
    if (newTopItemRequired) addNewTopItem(column);

    const newBottomItemRequired = column.scrollTop > scrollableHeight*0.75;
    if (newBottomItemRequired) addNewBottomItem(column);
}

const synchroniseScroll = (event) => {
    columns.forEach((otherColumn) => {
        otherColumn.scrollTop = event.target.scrollTop;
    });
}

const handleColumnScroll = (event, column) => {
    if (!scrollEnabled) return;
    synchroniseScroll(event);
    updateColumnItems(column);
    updateMouseOver();
}

columns.forEach((column) => {
    column.addEventListener("scroll", (event) => handleColumnScroll(event, column));
    addNewItem(column, "afterbegin");  
    addNewItem(column, "afterbegin");
    addNewItem(column, "afterbegin");
    addNewItem(column, "afterbegin");
    addNewItem(column, "afterbegin");                  
});

const returnCursor = document.getElementById("returnCursor");

const handleMouseOver = (element) => {
    const hoverItems = document.querySelectorAll(".item-hover");
    hoverItems.forEach((hoverItem) => {
        hoverItem.classList.remove("item-hover");
    });

    const hoverButtons = document.querySelectorAll(".button-hover");
    hoverButtons.forEach((hoverButton) => {
        hoverButton.classList.remove("button-hover");
    });

    const closestItem = element.closest(".item");
    const mouseOverUnclickedItem = closestItem && !closestItem.classList.contains("item-clicked");

    const closestButton = element.closest(".button");
    const canReturn = !closestItem && document.querySelector(".item-clicked");

    
    //console.log("-----_");
    //console.log(closestItem);
    //console.log(document.querySelector(".item-clicked"));

    if (mouseOverUnclickedItem) {
        closestItem.classList.add("item-hover");
        mouseCenter.classList.add("mouse-center-large");
        returnCursor.classList.add("hide-return");
    } else if (closestButton) {
        closestButton.classList.add("button-hover");
        mouseCenter.classList.add("mouse-center-large");
        returnCursor.classList.add("hide-return");
    } else if (canReturn) {
        returnCursor.classList.remove("hide-return");
        // set cursor as poitner
        document.body.style.cursor = "pointer";

        //console.log("can return");
        //closestButton.classList.add("button-hover");
        mouseCenter.classList.add("mouse-center-large");
    } else {
        mouseCenter.classList.remove("mouse-center-large");
    }

    if (!canReturn) {
        returnCursor.classList.add("hide-return");
    }

    

}

const updateMouseOver = () => {
    const elementUnderMouse = document.elementFromPoint(lastKnownX, lastKnownY);
    handleMouseOver(elementUnderMouse);
}

window.onload = () => {
    const column = columns[0];
    column.scrollTop = 10;
}


const mouseCenter = document.getElementById("mouseCenter");
const mouseCenterOffset = mouseCenter.clientHeight/2;
const mouseCircle = document.getElementById("mouseCircle");
const mouseCircleOffset = mouseCircle.clientHeight/2;

/*
window.addEventListener("mousemove", (event) => {
    mouseCenter.style.transform = `translate(${event.clientX - mouseCenterOffset}px, ${event.clientY - mouseCenterOffset}px)`;
    mouseCircle.style.transform = `translate(${event.clientX - mouseCircleOffset}px, ${event.clientY - mouseCircleOffset}px)`;
});


let isThrottled = false;
const throttleDelay = 16; // ~60 FPS

window.addEventListener("mousemove", (event) => {
    if (isThrottled) return;
    isThrottled = true;

    requestAnimationFrame(() => {
        mouseCenter.style.transform = `translate(${event.clientX - mouseCenterOffset}px, ${event.clientY - mouseCenterOffset}px)`;
        mouseCircle.style.transform = `translate(${event.clientX - mouseCircleOffset}px, ${event.clientY - mouseCircleOffset}px)`;

        setTimeout(() => {
            isThrottled = false;
        }, throttleDelay);
    });
});
*/

let lastKnownX = 0;
let lastKnownY = 0;

const calculateRotationAngle = (element, event) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.x + rect.width/2;
    const centerY = rect.y + rect.height/2;
    return Math.atan2(event.clientY - centerY, event.clientX - centerX) + Math.PI;
}

window.addEventListener("mousemove", (event) => {
    lastKnownX = event.clientX;
    lastKnownY = event.clientY;

    let rotationAngle = 0;

    const closestItem = event.target.closest(".item");
    const closestButton = event.target.closest(".button");

    if (closestItem) {
        /*
        const rect = closestItem.getBoundingClientRect();
        const centerX = rect.x + rect.width/2;
        const centerY = rect.y + rect.height/2;
        rotationAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX) + Math.PI;
        console.log("item", rotationAngle);*/
        rotationAngle = calculateRotationAngle(closestItem, event);
    } else if (closestButton) {
        rotationAngle = calculateRotationAngle(closestButton, event);
    }


    // want to rotate the arrow to be towards the center of the div it is on. 
    // get the .item class that is closest to the mouse.
    // get the center of that div.
    // get the angle between the mouse and the center of the div.
    // rotate the arrow by that angle.

    mouseCenter.style.transform = `translate(${event.clientX - mouseCenter.clientHeight/2}px, ${event.clientY - mouseCenter.clientHeight/2}px) rotate(${rotationAngle}rad)`;
    //mouseCircle.style.transform = `translate(${event.clientX - mouseCircleOffset}px, ${event.clientY - mouseCircleOffset}px)`;
    mouseCircle.style.transform = `translate(${event.clientX - mouseCircleOffset}px, ${event.clientY - mouseCircleOffset}px)`;

});

window.addEventListener("mouseover", (event) => {
    handleMouseOver(event.target);
});

const main = document.querySelector("main");

document.addEventListener("click", (event) => {
    const item = event.target.closest(".item");
    if(!item) return;

    const newUrl = "/" + item.querySelector(".title").textContent.toLowerCase().replace(" ", "");
    window.history.pushState({}, '', newUrl);
    console.log(item.querySelector(".title").textContent.toLowerCase().replace(/\s+/g, ""));
    console.log("click", item);

    scrollEnabled = false;

    main.classList.add("main-single");

    columns.forEach((column) => column.classList.add("no-scroll"));
    const column = item.closest(".column");
    column.classList.add("column-clicked");

    item.classList.add("item-clicked");
    scrollEnabled = false;

    item.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // ----------------------

    //item.classList.add("item-hover");

});


/*

const aboutButton = document.getElementById("aboutButton");
const aboutText = document.getElementById("aboutText");

aboutButton.addEventListener("click", () => {
    aboutText.classList.toggle("hide-height");
    aboutButton.classList.toggle("button-selected");
});


*/


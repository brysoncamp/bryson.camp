const projects = [
    {
        title: "ProjectName 1",
        description: "Short description of the project 1.",
        tags: ["Tag11", "Tag12", "Tag13"]
    }
]

const items = []

projects.forEach(project => {
    const tagsHTML = project.tags.map(tag => `<div class="tag">${tag}</div>`).join('');
    const itemHTML = `<div class="item">
        <div class="image-container"></div>
        <div class="title">${project.title}</div>
        <div class="description">${project.description}</div>
        <div class="tags-container">${tagsHTML}</div>
    </div>`;
    items.push(itemHTML);
});

/*  '<div class="item">
                <div class="image-container"></div>
                <div class="title">ProjectName</div>
                <div class="description">Short description of the project.</div>
                <div class="tags-container">
                    <div class="tag">TagName1</div>
                    <div class="tag">TagName2</div>
                    <div class="tag">TagName3</div>
                </div>
            </div>' */



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
        //console.log("add");
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
    synchroniseScroll(event);
    updateColumnItems(column);
}

columns.forEach((column) => {
    column.addEventListener("scroll", (event) => handleColumnScroll(event, column));
    addNewTopItem(column);   
    addNewTopItem(column);
    addNewTopItem(column);
    addNewTopItem(column);
    addNewTopItem(column);                   
});

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

window.addEventListener("mousemove", (event) => {
    mouseCenter.style.transform = `translate(${event.clientX - mouseCenter.clientHeight/2}px, ${event.clientY - mouseCenter.clientHeight/2}px)`;
    mouseCircle.style.transform = `translate(${event.clientX - mouseCircleOffset}px, ${event.clientY - mouseCircleOffset}px)`;
});

window.addEventListener("mouseover", (event) => {
    console.log(event.target.classList);
    if (event.target.closest(".item")) { //if (event.target.classList.contains("item")) {
        console.log("true");
        mouseCenter.classList.add("mouse-center-large");
    } else { 
        mouseCenter.classList.remove("mouse-center-large");
    }
    console.log(event.target);
});
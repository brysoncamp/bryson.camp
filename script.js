const items = [
    '<div class="item a"></div>',
    '<div class="item b"></div>',
    '<div class="item c"></div>',
    '<div class="item d"></div>',
    '<div class="item e"></div>',
]

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
        console.log("add");
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
});

window.onload = () => {
    const column = columns[0];
    column.scrollTop = 10;
}
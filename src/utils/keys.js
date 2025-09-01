import { updateScroll } from './internal.js';
import { loadDown, loadPage, loadUp, loadValidation } from './lazyLoading.js';

const upGet = function (x, y) {
    const obj = this;

    x = parseInt(x);
    y = parseInt(y);
    for (let j = y - 1; j >= 0; j--) {
        if (obj.records[j][x].element.style.display != 'none' && obj.rows[j].element.style.display != 'none') {
            if (obj.records[j][x].element.getAttribute('data-merged')) {
                if (obj.records[j][x].element == obj.records[y][x].element) {
                    continue;
                }
            }
            y = j;
            break;
        }
    }

    return y;
};

const upVisible = function (group, direction) {
    const obj = this;

    let x, y;

    if (group == 0) {
        x = parseInt(obj.selectedCell[0]);
        y = parseInt(obj.selectedCell[1]);
    } else {
        x = parseInt(obj.selectedCell[2]);
        y = parseInt(obj.selectedCell[3]);
    }

    if (direction == 0) {
        for (let j = 0; j < y; j++) {
            if (obj.records[j][x].element.style.display != 'none' && obj.rows[j].element.style.display != 'none') {
                y = j;
                break;
            }
        }
    } else {
        y = upGet.call(obj, x, y);
    }

    if (group == 0) {
        obj.selectedCell[0] = x;
        obj.selectedCell[1] = y;
    } else {
        obj.selectedCell[2] = x;
        obj.selectedCell[3] = y;
    }
};

export const up = function (shiftKey, ctrlKey) {
    const obj = this;

    if (shiftKey) {
        if (obj.selectedCell[3] > 0) {
            upVisible.call(obj, 1, ctrlKey ? 0 : 1);
        }
    } else {
        if (obj.selectedCell[1] > 0) {
            upVisible.call(obj, 0, ctrlKey ? 0 : 1);
        }
        obj.selectedCell[2] = obj.selectedCell[0];
        obj.selectedCell[3] = obj.selectedCell[1];
    }

    // Update selection
    obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);

    // Change page
    if (obj.options.lazyLoading == true) {
        if (obj.selectedCell[1] == 0 || obj.selectedCell[3] == 0) {
            loadPage.call(obj, 0);
            obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
        } else {
            if (loadValidation.call(obj)) {
                obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
            } else {
                const item = parseInt(obj.tbody.firstChild.getAttribute('data-y'));
                if (obj.selectedCell[1] - item < 30) {
                    loadUp.call(obj);
                    obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
                }
            }
        }
    } else if (obj.options.pagination > 0) {
        const pageNumber = obj.whichPage(obj.selectedCell[3]);
        if (pageNumber != obj.pageNumber) {
            obj.page(pageNumber);
        }
    }

    updateScroll.call(obj, 1);
};

export const rightGet = function (x, y) {
    const obj = this;

    x = parseInt(x);
    y = parseInt(y);

    for (let i = x + 1; i < obj.headers.length; i++) {
        if (obj.records[y][i].element.style.display != 'none') {
            if (obj.records[y][i].element.getAttribute('data-merged')) {
                if (obj.records[y][i].element == obj.records[y][x].element) {
                    continue;
                }
            }
            x = i;
            break;
        }
    }

    return x;
};

const rightVisible = function (group, direction) {
    const obj = this;

    let x, y;

    if (group == 0) {
        x = parseInt(obj.selectedCell[0]);
        y = parseInt(obj.selectedCell[1]);
    } else {
        x = parseInt(obj.selectedCell[2]);
        y = parseInt(obj.selectedCell[3]);
    }

    if (direction == 0) {
        for (let i = obj.headers.length - 1; i > x; i--) {
            if (obj.records[y][i].element.style.display != 'none') {
                x = i;
                break;
            }
        }
    } else {
        x = rightGet.call(obj, x, y);
    }

    if (group == 0) {
        obj.selectedCell[0] = x;
        obj.selectedCell[1] = y;
    } else {
        obj.selectedCell[2] = x;
        obj.selectedCell[3] = y;
    }
};

export const right = function (shiftKey, ctrlKey) {
    const obj = this;

    if (shiftKey) {
        if (obj.selectedCell[2] < obj.headers.length - 1) {
            rightVisible.call(obj, 1, ctrlKey ? 0 : 1);
        }
    } else {
        if (obj.selectedCell[0] < obj.headers.length - 1) {
            rightVisible.call(obj, 0, ctrlKey ? 0 : 1);
        }
        obj.selectedCell[2] = obj.selectedCell[0];
        obj.selectedCell[3] = obj.selectedCell[1];
    }

    obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
    updateScroll.call(obj, 2);
};

export const downGet = function (x, y) {
    const obj = this;

    x = parseInt(x);
    y = parseInt(y);
    for (let j = y + 1; j < obj.rows.length; j++) {
        if (obj.records[j][x].element.style.display != 'none' && obj.rows[j].element.style.display != 'none') {
            if (obj.records[j][x].element.getAttribute('data-merged')) {
                if (obj.records[j][x].element == obj.records[y][x].element) {
                    continue;
                }
            }
            y = j;
            break;
        }
    }

    return y;
};

const downVisible = function (group, direction) {
    const obj = this;

    let x, y;

    if (group == 0) {
        x = parseInt(obj.selectedCell[0]);
        y = parseInt(obj.selectedCell[1]);
    } else {
        x = parseInt(obj.selectedCell[2]);
        y = parseInt(obj.selectedCell[3]);
    }

    if (direction == 0) {
        for (let j = obj.rows.length - 1; j > y; j--) {
            if (obj.records[j][x].element.style.display != 'none' && obj.rows[j].element.style.display != 'none') {
                y = j;
                break;
            }
        }
    } else {
        y = downGet.call(obj, x, y);
    }

    if (group == 0) {
        obj.selectedCell[0] = x;
        obj.selectedCell[1] = y;
    } else {
        obj.selectedCell[2] = x;
        obj.selectedCell[3] = y;
    }
};

export const down = function (shiftKey, ctrlKey) {
    const obj = this;

    if (shiftKey) {
        if (obj.selectedCell[3] < obj.records.length - 1) {
            downVisible.call(obj, 1, ctrlKey ? 0 : 1);
        }
    } else {
        if (obj.selectedCell[1] < obj.records.length - 1) {
            downVisible.call(obj, 0, ctrlKey ? 0 : 1);
        }
        obj.selectedCell[2] = obj.selectedCell[0];
        obj.selectedCell[3] = obj.selectedCell[1];
    }

    obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);

    // Change page
    if (obj.options.lazyLoading == true) {
        if (obj.selectedCell[1] == obj.records.length - 1 || obj.selectedCell[3] == obj.records.length - 1) {
            loadPage.call(obj, -1);
            obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
        } else {
            if (loadValidation.call(obj)) {
                obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
            } else {
                const item = parseInt(obj.tbody.lastChild.getAttribute('data-y'));
                if (item - obj.selectedCell[3] < 30) {
                    loadDown.call(obj);
                    obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
                }
            }
        }
    } else if (obj.options.pagination > 0) {
        const pageNumber = obj.whichPage(obj.selectedCell[3]);
        if (pageNumber != obj.pageNumber) {
            obj.page(pageNumber);
        }
    }

    updateScroll.call(obj, 3);
};

const leftGet = function (x, y) {
    const obj = this;

    x = parseInt(x);
    y = parseInt(y);
    for (let i = x - 1; i >= 0; i--) {
        if (obj.records[y][i].element.style.display != 'none') {
            if (obj.records[y][i].element.getAttribute('data-merged')) {
                if (obj.records[y][i].element == obj.records[y][x].element) {
                    continue;
                }
            }
            x = i;
            break;
        }
    }

    return x;
};

const leftVisible = function (group, direction) {
    const obj = this;

    let x, y;

    if (group == 0) {
        x = parseInt(obj.selectedCell[0]);
        y = parseInt(obj.selectedCell[1]);
    } else {
        x = parseInt(obj.selectedCell[2]);
        y = parseInt(obj.selectedCell[3]);
    }

    if (direction == 0) {
        for (let i = 0; i < x; i++) {
            if (obj.records[y][i].element.style.display != 'none') {
                x = i;
                break;
            }
        }
    } else {
        x = leftGet.call(obj, x, y);
    }

    if (group == 0) {
        obj.selectedCell[0] = x;
        obj.selectedCell[1] = y;
    } else {
        obj.selectedCell[2] = x;
        obj.selectedCell[3] = y;
    }
};

export const left = function (shiftKey, ctrlKey) {
    const obj = this;

    if (shiftKey) {
        if (obj.selectedCell[2] > 0) {
            leftVisible.call(obj, 1, ctrlKey ? 0 : 1);
        }
    } else {
        if (obj.selectedCell[0] > 0) {
            leftVisible.call(obj, 0, ctrlKey ? 0 : 1);
        }
        obj.selectedCell[2] = obj.selectedCell[0];
        obj.selectedCell[3] = obj.selectedCell[1];
    }

    obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
    updateScroll.call(obj, 0);
};

export const first = function (shiftKey, ctrlKey) {
    const obj = this;

    if (shiftKey) {
        if (ctrlKey) {
            obj.selectedCell[3] = 0;
        } else {
            leftVisible.call(obj, 1, 0);
        }
    } else {
        if (ctrlKey) {
            obj.selectedCell[1] = 0;
        } else {
            leftVisible.call(obj, 0, 0);
        }
        obj.selectedCell[2] = obj.selectedCell[0];
        obj.selectedCell[3] = obj.selectedCell[1];
    }

    // Change page
    if (obj.options.lazyLoading == true && (obj.selectedCell[1] == 0 || obj.selectedCell[3] == 0)) {
        loadPage.call(obj, 0);
    } else if (obj.options.pagination > 0) {
        const pageNumber = obj.whichPage(obj.selectedCell[3]);
        if (pageNumber != obj.pageNumber) {
            obj.page(pageNumber);
        }
    }

    obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
    updateScroll.call(obj, 1);
};

export const last = function (shiftKey, ctrlKey) {
    const obj = this;

    if (shiftKey) {
        if (ctrlKey) {
            obj.selectedCell[3] = obj.records.length - 1;
        } else {
            rightVisible.call(obj, 1, 0);
        }
    } else {
        if (ctrlKey) {
            obj.selectedCell[1] = obj.records.length - 1;
        } else {
            rightVisible.call(obj, 0, 0);
        }
        obj.selectedCell[2] = obj.selectedCell[0];
        obj.selectedCell[3] = obj.selectedCell[1];
    }

    // Change page
    if (obj.options.lazyLoading == true && (obj.selectedCell[1] == obj.records.length - 1 || obj.selectedCell[3] == obj.records.length - 1)) {
        loadPage.call(obj, -1);
    } else if (obj.options.pagination > 0) {
        const pageNumber = obj.whichPage(obj.selectedCell[3]);
        if (pageNumber != obj.pageNumber) {
            obj.page(pageNumber);
        }
    }

    obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
    updateScroll.call(obj, 3);
};

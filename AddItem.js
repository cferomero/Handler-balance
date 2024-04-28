const inputInsert = document.getElementById('Input__insert--resources');
const textDescriptionInsert = document.getElementById('input--description--resource');
const listElements = document.querySelector('.list__elements');

export function createElementList(iconStatus, contentPriceItem) {
    const itemList = document.createElement('li');
    const divItemResource = document.createElement('div');
    const divContentDescription = document.createElement('div');
    const contentResourceDescription = document.createElement('small');
    iconStatus = document.createElement('span');
    contentPriceItem = document.createElement('p');

    itemList.className = 'itemList';
    divItemResource.className = 'div__item--resource';
    iconStatus.className = 'material-symbols-outlined btn--status';
    iconStatus.textContent = 'radio_button_checked';
    divContentDescription.className = 'div__content--description';
    contentResourceDescription.className = 'content--resource--description';
    contentPriceItem.className = 'content--price';

    // validation input
    if(inputInsert.value.trim() !== '' && textDescriptionInsert.value.trim() !== '') {
        contentPriceItem.textContent = inputInsert.value;
        inputInsert.value = '';
        contentResourceDescription.textContent = textDescriptionInsert.value;
        textDescriptionInsert.value = '';
        // group Nodes
        divContentDescription.append(contentResourceDescription);
        divItemResource.append(iconStatus, divContentDescription, contentPriceItem);
        itemList.append(divItemResource);
        listElements.append(itemList);
    }
}
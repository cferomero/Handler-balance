// Insert values into the form
const inputInsertValue = document.getElementById('Input__insert--resources');
const inputInsertDescription = document.getElementById('input--description--resource');
const divFormInsert = document.querySelector('.form--insert--resources');
const messageError = document.querySelector('.error--message');
let numbersRegex = /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/;

// Create Item list
const listElements = document.querySelector('.list__elements');
let contentPriceItem;
let iconStatus;

// Update Balance and Pocket
const sectionTotalPrice = document.querySelector('.section__total--price');
const titleTotalBalance = document.getElementById('title--total--balance');
const totalBalance = document.createElement('h3');
const totalSavings = document.querySelector('.totalPricePocket');
let sumTotal = 0;
let sumSavings = 0;
totalBalance.className = 'totalPrice';
totalBalance.textContent = parseFloat(sumTotal);
titleTotalBalance.insertAdjacentElement('afterend', totalBalance);

// convert currencies
let options;
let numberFormat;
let valueConverted;


// Handle Events
const setupEvents = () => {
    divFormInsert.addEventListener('click', handleClickEvent);
}
const handleClickEvent = (event) => {
    if(event.target.nodeName === 'BUTTON' && event.target.classList.contains('btn--income')){
        addElement();
        updateStatus('income');
        updateBalance('income');
    } else if(event.target.nodeName === 'BUTTON' && event.target.classList.contains('btn--expenses')){
        addElement();
        updateStatus('expenses');
        updateBalance('expenses');
    } else if(event.target.nodeName === 'BUTTON' && event.target.classList.contains('btn--transfer')){
        addElement();
        updateStatus('transfer');
        updateBalance('transfer');
    } else if(event.target.nodeName === 'BUTTON' && event.target.classList.contains('btn--transferAccount')){
        addElement();
        updateStatus('transferToAccount');
        updateBalance('transferToAccount');
    } else if(event.target.nodeName === 'BUTTON' && event.target.classList.contains('btn--payPocket')){
        addElement();
        updateStatus('payToPocket');
        updateBalance('payToPocket');
    }
}
setupEvents();


function addElement() {
    const itemList = document.createElement('li');
    const divItemListContent = document.createElement('div');
    const divContentDescription = document.createElement('div');
    const contentDescriptionItem = document.createElement('small');
    itemList.className = 'itemList';
    divItemListContent.className = 'div__item--resource';
    iconStatus = document.createElement('span');
    iconStatus.className = 'material-symbols-outlined btn--status';
    iconStatus.textContent = 'radio_button_checked';
    divContentDescription.className = 'div__content--description';
    contentDescriptionItem.className = 'content--resource--description';
    contentPriceItem = document.createElement('p');
    contentPriceItem.className = 'content--price';

    if(inputInsertValue.value.trim() !== '' && inputInsertDescription.value.trim() !== '') {
        if(inputInsertValue.value <= 0) {
            messageError.classList.add('active');
        } else {
            // contentPriceItem.textContent = converterCurrency();
            contentPriceItem.textContent = inputInsertValue.value;
            inputInsertValue.value = '';
            contentDescriptionItem.textContent = inputInsertDescription.value;
            inputInsertDescription.value = '';
            divContentDescription.append(contentDescriptionItem);
            divItemListContent.append(iconStatus, divContentDescription, contentPriceItem);
            itemList.append(divItemListContent);
            listElements.prepend(itemList);
            messageError.classList.remove('active');
        }
    }
}

const converterCurrency = () => {
    options = {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2
    }
    numberFormat = new  Intl.NumberFormat('es-CO', options);
    valueConverted = numberFormat.format(inputInsertValue.value);
    return valueConverted;
}

const updateBalance = (action) => {
    const currentPrice = parseFloat(contentPriceItem.textContent);
    switch(action) {
        case 'income':
            sumTotal = Number(totalBalance.textContent) + currentPrice;
            break;
        case 'expenses':
            sumTotal = Number(totalBalance.textContent) - currentPrice;
            break;
        case 'transfer':
            if(currentPrice <= Number(totalBalance.textContent)) {
                sumTotal = Number(totalBalance.textContent) - currentPrice;
                sumSavings += currentPrice;
            } else {
                alert('You do not have enough resources to save.');
            }
            break;
        case 'transferToAccount':
            if(currentPrice <= totalSavings.textContent) {
                sumTotal = Number(totalBalance.textContent) + currentPrice;
                sumSavings -= currentPrice;
            } else {
                alert('You do not have enough resources to transfer to the Account.');
            }
            break;
        case 'payToPocket':
            sumSavings = Number(totalSavings.textContent) + currentPrice;
            break;
    }

    if(action === 'income' || action === 'expenses' || action === 'transfer' || action === 'transferToAccount' || action === 'payToPocket') {
        totalBalance.textContent = sumTotal;
        totalSavings.textContent = sumSavings;
    }
    return sumTotal, sumSavings;
}

function updateStatus(currentStatus) {
    switch(currentStatus) {
        case 'income':
            iconStatus.classList.add('income');
            contentPriceItem.classList.add('income');
            break;
        case 'expenses':
            iconStatus.classList.add('expenses');
            contentPriceItem.classList.add('expenses');
            break;
        case 'transfer':
            iconStatus.classList.add('transfer');
            contentPriceItem.classList.add('transfer');
            break;
        case 'transferToAccount':
            iconStatus.classList.add('transferAccount');
            contentPriceItem.classList.add('transferAccount');
            break;
        case 'payToPocket':
            iconStatus.classList.add('payPocket');
            contentPriceItem.classList.add('payPocket');
            break;
    }
}
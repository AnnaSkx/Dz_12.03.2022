const formElem = document.forms[0];
const wordsList = [];
const cardsContainer = document.querySelector('#word_cards');
const searchElem = document.querySelector('#search');

function render(list) {
	cardsContainer.innerText = '';
	for (let cards = 0; cards < list.length; cards++) {
		const crossElem = document.createElement('div');
		const cardElem = document.createElement('div');
		const pElem = document.createElement('p');
		crossElem.classList.add('cross');
		pElem.classList.add('active');
		const pTranslationElem = document.createElement('p');
		pElem.innerText = list[cards].word;
		pTranslationElem.innerText = list[cards].translation;
		cardElem.style.backgroundColor = `${list[cards].color}`;
		cardElem.appendChild(pElem);
		cardElem.appendChild(pTranslationElem);
		cardElem.appendChild(crossElem);
		cardsContainer.appendChild(cardElem);

		cardElem.addEventListener('dblclick', event => {
			if (pElem.className === 'active') {
				pElem.classList.remove('active');
				pTranslationElem.classList.add('active');
			} else {
				pTranslationElem.classList.remove('active');
				pElem.classList.add('active');
			}
		});

		crossElem.addEventListener('click', event => {
			cardsContainer.removeChild(cardElem);
			list.splice(cards, 1);
			render(list);
		});
	}
}

formElem.addEventListener('submit', event => {
	event.preventDefault();
	const word = event.target.word.value;
	const translation = event.target.translation.value;
	const color = event.target.color.value;
		if (word !== '' && translation !== '' && color !== '') {
			wordsList.push({ word, translation, color });
		} else {
			alert('заполните все поля');
		}
	event.target.word.value = '';
	event.target.translation.value = '';
	event.target.color.value = '';
	render(wordsList);
})

searchElem.addEventListener('input', event => {
	const value = event.target.value;
	const result = wordsList.filter(elem => elem.word.startsWith(value) || elem.translation.startsWith(value));
	render(result);
});

render(wordsList);
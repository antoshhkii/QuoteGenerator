import getQuote from "./quote.js";

const app = async () => {
  const button = document.querySelector('.generate-btn');
  const resultEl = document.querySelector('#result');
  const authorEl = document.querySelector('.author-name');
  const quoteTitle = document.querySelector('.quote-title');
  const quoteOfTheDay = document.querySelector('#quote-label');
  const quoteEl = document.querySelector('#result');
  const authorNameEl = document.querySelector('.author-name');
  const maxCharacters = 200;

  let isButtonDisabled = false;

  const generateRandomQuote = async () => {
    if (isButtonDisabled) return;
    isButtonDisabled = true;

    const { quote, author } = await getQuote();
    if (quote) {
      const truncatedQuote = truncateQuote(quote);
      resultEl.textContent = truncatedQuote;
      authorEl.textContent = author;
    }

    setTimeout(() => {
      isButtonDisabled = false;
    }, 1000);
  };

  const getQuoteOfTheDay = async () => {
    const { quote, author } = await getQuote();
    if (quote) {
      const truncatedQuote = truncateQuote(quote);
      quoteEl.textContent = truncatedQuote;
      authorNameEl.textContent = author;
    }
  };

  const truncateQuote = (quote) => {
    if (quote && quote.length > maxCharacters) {
      return quote.slice(0, maxCharacters) + '...';
    }
    return quote;
  };

  button.addEventListener('click', async (e) => {
    e.preventDefault();
    generateRandomQuote();
    quoteOfTheDay.style.display = 'none';
    button.parentNode.classList.add('static-buttons');
  });

  await getQuoteOfTheDay();
};

const themeTranslations = {
  life: 'Жизнь',
  love: 'Любовь',
  inspiration: 'Вдохновение',
  motivation: 'Мотивация',
};

const themeSelect = document.getElementById('themeSelect');

Object.keys(themeTranslations).forEach((theme) => {
  const option = document.createElement('option');
  option.value = theme;
  option.textContent = themeTranslations[theme];
  themeSelect.appendChild(option);
});

export default app;


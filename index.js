const UserContainer = document.querySelectorAll('container');

const comments = [
  {
    name: '@Sergei_4',
    comment: 'Благодарю вас за видео',
    liked: { state: true, counter: 7 },
    date: new Date().toLocaleString()
  },
  {
    name: '@realgameplay1383',
    comment: 'Хорошо подобранные темы и их разбор. Спасибо',
    liked: { state: false, counter: 0 },
    date: new Date().toLocaleString()
  },
  {
    name: '@KonstK.Y.T',
    comment: 'В последнее время торговал мало, Я не знаю в какое время торгуются фьючерсы, но я эксперт, который вам расскажет про фьючерсы...',
    liked: { state: false, counter: 0 },
    date: new Date().toLocaleString()
  },
  {
    name: '@АнтонинаЗахаренкова-т3х',
    comment: 'Вы можете поделиться стратегией торговли фьючерсами',
    liked: { state: true, counter: 1 },
    date: new Date().toLocaleString()
  }
];

function renderComments() {
  const container = document.getElementById('container');
  container.innerHTML = ''; // Очищаем контейнер перед повторным рендером
  // Формируем HTML-разметку
  container.innerHTML = comments.map((coment, index) => `
    <div class="comments">
            <h3 class="name">${coment.name}</h3>
            <p class="comment">${coment.comment}</p>
            <div class="count">
              
                
                <button class="likebutton" data-index="${index}" >
                    <svg  class="like ${coment.liked.state ? 'liked' : ''}"
                    fill="${coment.liked.state ? '#ff0000' : '#545254'}"
                      height="200px" width="200px" version="1.1" 
                    id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    viewBox="0 0 51.997 51.997" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g> <g id="SVGRepo_iconCarrier"> <path d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905 c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478 c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014 C52.216,18.553,51.97,16.611,51.911,16.242z"></path>
                     </g></svg></button>
                    <p> <span class="counter" id="clicksCount">${coment.liked.counter}</span></p>


                <p class="data">${coment.date}</p>
               
            </div>
      </div> 
  `).join(""); // склеивам массив в одну строку с помощью join  

  const likeButtons = document.querySelectorAll('.likebutton');
  likeButtons.forEach((button) => {
    button.addEventListener('click', handleLikeClick);
  });
}

function handleLikeClick(event) {
  const index = event.currentTarget.dataset.index; // Получаем индекс комментария
  const coment = comments[index];
  // Изменяем состояние лайка и счетчик
  coment.liked.state = !coment.liked.state;
  coment.liked.counter += coment.liked.state ? 1 : -1;

  renderComments(); // Перерисовываем комментарии
}

const nameInput = document.getElementById('name');
const commentInput = document.getElementById('comment-box-text');
const addCommentButton = document.getElementById('comment-box-button');

addCommentButton.addEventListener('click', (event) => {
  event.preventDefault(); // Предотвращаем отправку формы
  const name = nameInput.value.trim();
  const commentText = commentInput.value.trim();

  if (name === '' || commentText === '') {
    alert('Пожалуйста, заполните оба поля!');
    return;
  }

  // Добавляем новый комментарий в массив
  comments.push({
    name,
    comment: commentText,
    liked: { state: false, counter: 0 },
    date: new Date().toLocaleString(),
  });

  // Очищаем поля ввода
  nameInput.value = '';
  commentInput.value = '';

  // Перерисовываем комментарии
  renderComments();
});

renderComments() ;// Вызов функции рендеринга







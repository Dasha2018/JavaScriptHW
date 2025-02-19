import { comments, toggleLike } from './data.js'
import { enableCommentReplyFeature } from './handlers.js'
import { renderLogin } from './renderLogin.js'
import { setupAddCommentHandler } from './handlers.js'
import { name, token } from './api.js'

export function renderComments() {
    const container = document.querySelector('.container')
    if (!container) {
        console.error('Container element not found')
        return
    }

    const commentsHtml = comments
        .map(
            (coment, index) => `
          <div class="comments-box">
            <div class="comment-header"><h3 class="name">${coment.name}</h3>
            <p class="data">${coment.date}</p></div>
            <p class="comment">${coment.comment}</p>
            <div class="count">
            <p> <span class="counter" id="clicksCount">${coment.liked.counter}</span></p>
                <button class="likebutton" data-index="${index}" >
                    <svg  class="like ${coment.liked.state ? 'liked' : ''}"
                    fill="${coment.liked.state ? ' #bcec30' : '#545254'}"
                      height="200px" width="200px" version="1.1" 
                    id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    viewBox="0 0 51.997 51.997" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g> <g id="SVGRepo_iconCarrier"> <path d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905 c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478 c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014 C52.216,18.553,51.97,16.611,51.911,16.242z"></path>
                     </g></svg></button> 
               
            </div>
            </div>
  `,
        )
        .join('')

    const addCommentsHtml = `
        <div class="comment-box">
                <form class="comment-box-content">
                    <input
                        class="name-content"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Введите ваше имя"
                        readonly
                        value="${name}"
                    /><br /><br />
                    <textarea
                        class="comment-box-text"
                        id="comment-box-text"
                        name="comment"
                        rows="4"
                        placeholder="Введите ваш коментарий"
                    ></textarea
                    ><br /><br />
                    <div class="row-button">
                        <button
                            class="comment-box-button"
                            id="comment-box-button"
                            type="submit"
                        >
                            Отправить
                        </button>
                    </div>
                </form>
            </div>

            <div class="comment-loading">Добавляем ваш комментарий...</div>`

    const linkToLoginText = `
            <p class = "link-login-text">Чтобы отправить комментарий, 
            <span class="link-login">войдите</span></p>`

    const baseHtml = `
            <div class="comments">${commentsHtml}</div>
            ${token ? addCommentsHtml : linkToLoginText}
    `

    container.innerHTML = baseHtml

    if (token) {
        enableCommentReplyFeature()
        setupAddCommentHandler(renderComments)
    } else {
        document.querySelector('.link-login').addEventListener('click', () => {
            renderLogin()
        })
    }

    document.querySelectorAll('.likebutton').forEach((button) => {
        button.addEventListener('click', (event) => {
            const index = event.currentTarget.dataset.index
            event.stopPropagation() // Предотвращаем всплытие события
            if (typeof index === 'undefined') return

            toggleLike(index)
            renderComments()
        })
    })
}

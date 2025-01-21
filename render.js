import { comments, toggleLike } from './data.js'
import { enableCommentReplyFeature } from './handlers.js'

export function renderComments() {
    const container = document.getElementById('container')
    if (!container) {
        console.error('Container element not found')
        return
    }

    container.innerHTML = comments
        .map(
            (coment, index) => `
    <div class="comments">
            <h3 class="name">${coment.name}</h3>
            <p class="comment">${coment.comment}</p>
            <div class="count">
                <button class="likebutton" data-index="${index}" >
                    <svg  class="like ${coment.liked.state ? 'liked' : ''}"
                    fill="${coment.liked.state ? '#76f591' : '#545254'}"
                      height="200px" width="200px" version="1.1" 
                    id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    viewBox="0 0 51.997 51.997" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g> <g id="SVGRepo_iconCarrier"> <path d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905 c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478 c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014 C52.216,18.553,51.97,16.611,51.911,16.242z"></path>
                     </g></svg></button>
                    <p> <span class="counter" id="clicksCount">${coment.liked.counter}</span></p>

                <p class="data">${coment.date}</p>
               
            </div>
    </div>
  `,
        )
        .join('')

    document.querySelectorAll('.likebutton').forEach((button) => {
        button.addEventListener('click', (event) => {
            const index = event.currentTarget.dataset.index
            event.stopPropagation() // Предотвращаем всплытие события
            if (typeof index === 'undefined') return

            toggleLike(index)
            renderComments()
        })
    })
    enableCommentReplyFeature()
}


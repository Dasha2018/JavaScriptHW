import { setToken, setName, registration } from './api.js'
import { fetchAndRenderComments } from './main.js'
import { renderLogin } from './renderLogin.js'

export const renderRegistration = () => {
    const container = document.querySelector('.container')

    const loginHtml = `
      <section class="add-form">
        <h1 class="form-title">Форма регистрации</h1>
        <input type="text" class="add-form-name" placeholder="Введите имя" id="name" required></input>
        <input type="text" class="add-form-name" placeholder="Введите логин" id="login" required></input>
        <input type="password" class="add-form-name" placeholder="Введите пароль" id="password" required></input>
        <fieldset class="add-form-registry">
          <button class="add-form-button button-main"  type="submit">Зарегистрироваться</button>
          <ul class="add-form-button-link entry">Войти</ul>
        </fieldset>
      </section>
    `

    container.innerHTML = loginHtml
    document.querySelector('.entry').addEventListener('click', () => {
        renderLogin()
    })

    const nameEl = document.querySelector('#name')
    const loginEl = document.querySelector('#login')
    const passwordEl = document.querySelector('#password')
    const submitButtonEl = document.querySelector('.button-main')

    submitButtonEl.addEventListener('click', () => {
        registration(nameEl.value, loginEl.value, passwordEl.value)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setToken(data.user.token)
                setName(data.user.name)
                fetchAndRenderComments()
            })
    })
}

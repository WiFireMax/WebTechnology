/**
 * Получить карточку персонажа
 *
 * @param character
 * @returns {string}
 */
function getCharacterCard(character) {
    return `
        <div class="card mb-3 col-sm-12 col-md-6 col-lg-4">
            <div class="row g-0">
                <div class="col-4">
                    <img src="${character.thumbnail.path}.${character.thumbnail.extension}"
                         style="max-width: 100%;"
                         alt="${character.name}"
                    >
                </div>
                <div class="col-8">
                    <div class="card-body">
                        <h5 class="card-title">${character.name}</h5>
                        <button type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal-${character.id}"
                                class="btn btn-secondary btn-sm"
                        >Подробнее</button>
                    </div>
                </div>
            </div>
        </div>
        `;
}

/**
 * Получить модальное окно персонажа
 *
 * @param character
 * @returns {string}
 */
function getCharacterModal(character) {
    return `
        <div id="exampleModal-${character.id}"
             tabindex="-1"
             aria-labelledby="exampleModalLabel-${character.id}"
             class="modal fade"
             style="display: none;" 
             aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${character.name}</h5>
                        <button type="button"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                class="btn-close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <img src="${character.thumbnail.path}.${character.thumbnail.extension}"
                             style="max-width: 100%;"
                             alt="${character.name}"
                        >
                        <div>
                            <p class="text-muted">${new Date(character.modified).toLocaleDateString()}</p>
                            <h5>Описание:</h5>
                            <p>${character.description || "Описание отсутствует."}</p>
                        </div>

                        <div class="modal-footer">
                            <button type="button"
                                    data-bs-dismiss="modal"
                                    class="btn btn-secondary btn-sm"
                            >Закрыть</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
}

/**
 * Получить информацию о персонажах с API
 */
/**
 * Получить информацию о персонажах с API
 */
async function fetchCharacters() {
    const API_URL = 'https://jsfree-les-3-api.onrender.com/characters';
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Ошибка загрузки данных');

        const data = await response.json();
        console.log('Ответ API:', data);
        return data; // Возвращаем массив персонажей напрямую
    } catch (error) {
        console.error('Произошла ошибка при запросе данных:', error);
        return []; // Возвращаем пустой массив при ошибке
    }
}


/**
 * Получить массив карточек персонажей
 *
 * @param characters
 * @returns {Array}
 */
function getCharacterCards(characters) {
    if (!Array.isArray(characters)) {
        console.error('Ошибка: characters должен быть массивом.');
        return [];
    }
    return characters.map(character => getCharacterCard(character));
}

/**
 * Получить массив модальных окон персонажей
 *
 * @param characters
 * @returns {Array}
 */
function getCharacterModals(characters) {
    if (!Array.isArray(characters)) {
        console.error('Ошибка: characters должен быть массивом.');
        return [];
    }
    return characters.map(character => getCharacterModal(character));
}

/**
 * Инициализация приложения
 */
async function init() {
    const characters = await fetchCharacters();

    // Проверяем, что characters — это массив
    if (!Array.isArray(characters) || characters.length === 0) {
        console.warn('Нет данных для отображения.');
    }

    // Вставляем карточки в DOM
    const cardsContainer = document.getElementById('character-card-box');
    cardsContainer.innerHTML = getCharacterCards(characters).join('');

    // Вставляем модальные окна в DOM
    const modalsContainer = document.getElementById('character-modal-box');
    modalsContainer.innerHTML = getCharacterModals(characters).join('');
}

// Запускаем приложение при загрузке страницы
document.addEventListener("DOMContentLoaded", init);
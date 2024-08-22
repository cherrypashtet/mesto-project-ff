const PATH = 'https://jsonplaceholder.typicode.com'

const handleResponse = (response) => {
    if (response.ok) {
        return response.json()
    }
}

export const getAllTodos = () => {
    return fetch(`${PATH}/todos`)
    .then(handleResponse)
};


// в createTodo передаем дату и отправляем ее в body

export const createTodo = (data) => {
    return fetch(`${PATH}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(handleResponse)        
}

// getAllTodos().then((data) => {
//     console.log(data);
// });
// createTodo({
//     title: "Полить kaktus",
//     completed: false
// })
// .then((data) => {
//     console.log(data);
// });

let userId = null;

Promise.all([
    getAllTodos(), 
    createTodo({
        title: "Полить kaktus",
        completed: false
    })
]) 
.then(([allCard, newCard]) => {
    userId = newCard._id;
    console.log({allCard, newCard})
})

//////////////////////////////////////////////

// Делаем Get-запрос на сервер и получаем ответ (response). Конвертируем его в формат json
// получаем дату и смотрим на нее в консоли

export const getAllTodossss = () => {
    return fetch(`${PATH}/todos`)
        .then( (response) => {
            if (response.ok) {
                return response.json()
            }
        })
}

// Делаем POST-запрос, в headers указываем тип application/json, 
// в body передаем инфу, конвертируя в формат JSON

export const createCardssss = () => {
    return fetch(`${PATH}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: 'Polit flowers',
            completed: false
        })
    })
    .then( (response) => {
        if (response.ok) {
            return response.json()
        }
    })

}

getAllTodossss()
.then((data) => {
    console.log(data)
})
createCardssss()
.then((data) => {
    console.log(data)
})


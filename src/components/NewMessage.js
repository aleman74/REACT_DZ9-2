import React, {useRef, useState} from 'react';
import {Navigate} from "react-router-dom";


export default function NewMessage() {

    const[isClick, setClick] = useState(false);

    const vRef = useRef();

    const onClick = (event) => {
        // -----------------------------
        // Отключаем стандартную обработку кнопки
        // -----------------------------
        event.preventDefault();

//        console.log(vRef.current.value);

        // -----------------------------
        // Передаём данные на сервер
        // -----------------------------
        let value = {
            "id": 0,
            "content": vRef.current.value
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(value)
        };

        fetch(process.env.REACT_APP_URL, requestOptions)
            .then(response => {
//                console.log('onAdd - RESPONSE status = ' + response.status);

                setClick(true);    // Устанавливаем флаг для перехода в главный раздел
            });
    }

    // После создания нового сообщения переходим на главную страницу
    if (isClick)
        return(
            <Navigate to='/' replace />
        );


    return (
        <div className="load-component">
            <div className="title">Новая публикация</div>
            <textarea
                id="new_post"
                name="new_post"
                type="text"
                className="context"
                ref={vRef}
            >
            </textarea>
            <div className="button">
                <button onClick={onClick}>Опубликовать</button>
            </div>
        </div>
    );
}
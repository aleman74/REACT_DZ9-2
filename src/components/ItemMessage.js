import React, {useState, useEffect, useRef} from 'react';
import {Navigate, useParams} from "react-router-dom";


export default function ItemMessage() {

    const [item, setItem] = useState(null);
    const [isEdit, setEdit] = useState(false);
    const [isRedirect, setRedirect] = useState(false);

    // Определяем переданное ID
    const v = useParams();
//    console.log(v);          // Выбрасывает ошибку, если раскомментировать
    console.log('id', v.id);

    const vRef = useRef();

    // Считываем данные
    const loadData = () => {

        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
//            body: JSON.stringify({ title: 'React POST Request Example' })
        };

        fetch(process.env.REACT_APP_URL + '/' + v.id, requestOptions)
            .then(response => {
//                console.log('Load data - RESPONSE', response);
                console.log('loadData - RESPONSE status = ' + response.status);
                return response.json();
            })
            .then(
                (data) => {
                    console.log('loadData - OK', data);
                    setItem(data);
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    console.log('loadData - ERROR', error);
                }
            );
    }

    // Удаляем данные
    const deleteData = async () => {

        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
//            body: JSON.stringify({ title: 'React POST Request Example' })
        };

        const response = await fetch(process.env.REACT_APP_URL + '/' + v.id, requestOptions);
        console.log('deleteData - RESPONSE status = ' + response.status);
    }

    // Обновляем данные
    const updateData = () => {

        console.log('text', vRef.current.value);

        const value = {
            "id": Number(v.id),
            "content": vRef.current.value
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(value)
        };

        fetch(process.env.REACT_APP_URL, requestOptions)
            .then(response => {
                console.log('updateData - RESPONSE status = ' + response.status);
            });
    }

    useEffect(
        () => {
            loadData();
        }, []
    );

    // Переходим в режим редактирования
    const onEdit = (event) => {
        event.preventDefault();      // Отключаем стандартную обработку кнопки
        setEdit(true);
    }

    // Отменяем редактирование
    const onCancel = (event) => {
        setEdit(false);
    }

    // Удаляем элемент
    const onDelete = (event) => {
        event.preventDefault();      // Отключаем стандартную обработку кнопки
        deleteData();
        setRedirect(true);
    }

    const onUpdate = (event) => {
        event.preventDefault();      // Отключаем стандартную обработку кнопки
        updateData();
        setRedirect(true);
    }

    // Данные ещё не считаны
    if (item == null)
        return null;

    // Перенаправляем на главную страницу
    if (isRedirect)
        return(
            <Navigate to='/' replace />
        );


    // Режим редактирования
    if (isEdit)
        return (
            <div className="load-component">
                <div className="title">Редактировать публикацию
                    <span id="close" className="material-icons" onClick={onCancel}>clear</span>
                </div>
                <textarea id="new_post" name="new_post" type="text" className="context" ref={vRef}>{item.content}</textarea>
                <div className="button">
                    <button onClick={onUpdate}>Сохранить</button>
                </div>
            </div>
        );

    // Режим отображения
    return (
        <>
            <div className="load-component">
                <div className="row">
                    <img src={require('./foto.jpg')}/>
                    <div>
                        <div className="name">Иван Иванович</div>
                        <div>{item.created + ' мин'}</div>
                    </div>
                </div>
                <div className="context">{item.content}</div>
                <div className="button">
                    <button onClick={onEdit}>Редактировать</button>
                    <button id="delete" onClick={onDelete}>Удалить</button>
                </div>
            </div>
        </>
    );
}
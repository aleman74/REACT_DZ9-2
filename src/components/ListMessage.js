import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
// import logo from './foto.jpg';


export default function ListMessage() {

    const [data, setData] = useState([]);


    const loadData2 = async () => {

        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
//            body: JSON.stringify({ title: 'React POST Request Example' })
        };

        const res1 = await fetch(process.env.REACT_APP_URL, requestOptions);

        console.log('loadData2', {res1});
        console.log('loadData2 - RESPONSE status = ' + res1.status);

        const data2 = await res1.json();

        console.log('data2', {data2});

        setData(data2);
    }

    const loadData = () => {

        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
//            body: JSON.stringify({ title: 'React POST Request Example' })
        };

        fetch(process.env.REACT_APP_URL, requestOptions)
            .then(response => {
//                console.log('Load data - RESPONSE', response);
//                console.log('Load data - RESPONSE status = ' + response.status);
                return response.json();
            })
            .then(
                (data) => {
//                    console.log('Load data - OK', data);
                    setData(data);
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    console.log('Load data - ERROR', error);
                }
            );
    }

    useEffect(
        () => {
            loadData();
        }, []
    );

    return (
        <>
            <div className="button load-component">
                <Link to="/posts/new">
                    <button>Создать пост</button>
                </Link>
            </div>

            {
                data.map(item =>

                    <Link key={item.id} to={'/posts/' + item.id}>
                        <div className="load-component">
                            <div className="row">
                                <img src={require('./foto.jpg')}/>
                                <div>
                                    <div className="name">Иван Иванович</div>
                                    <div>{item.created + ' мин'}</div>
                                </div>
                            </div>
                            <div className="context">{item.content}</div>
                        </div>
                    </Link>
                )
            }
        </>
    );
}
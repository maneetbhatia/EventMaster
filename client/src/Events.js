import { useState, useEffect } from "react";
import moment from 'moment';

const Events = () => {
    const [datas, setDatas] = useState(null);

    useEffect(() => {
        fetch("/events")
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data[0].events);
            setDatas(data.data[0].events)
        }).catch((err) => {
            console.log("error", err);
        }) 
    }, [])

    return (
        <>
            {datas !== null ? <div className="App">
                {datas !== null && datas.map((data, index) => {
                    return(
                        <div key={index}>
                            <p>type: {data?.type}</p>
                            <img src={data?.performers[0]?.image} alt="event"/>
                            <p>{data.title}</p>
                            <p>Popularity: {(data.popularity/1)*100} %</p>
                            <p>date and time: {moment(data.datetime_local).format('MMMM Do YYYY, h:mm:ss a')}</p>
                            <p>{data?.url}</p>
                            <p>" "</p>
                        </div>
                    )
                })}
            </div>: <p> Loading....</p>}
        </>
    )
}

export default Events;


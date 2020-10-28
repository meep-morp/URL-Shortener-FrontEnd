import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Spin } from 'antd';

const Stats = props => {
    const [link, setLink] = useState(null);
    const params = useParams();

    const getLinkStats = (alias) => {
        axios.get(`https://url-shortt.herokuapp.com/metrics/${alias}`)
            .then(response => {
                console.log(response);
                setLink(response.data)
            }).catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getLinkStats(params.alias);
    }, [params.alias])

    if (!link) {
        return <div size="large" className="spin">
            <Spin />
        </div>
    }

    return (
        <div className="stats">
            <h2>Stats for
                <a href={`https://url-shortt.herokuapp.com/${link.alias}`}
                    rel="noreferrer"
                    target="_blank">
                    {" " + link.alias}
                </a>
            </h2>
            <p>Url: <a href={link.url}>{link.url.length < 45 ? link.url : link.url.substring(0, 20) + "..."}</a></p>
            <div className="cards">
                <div className="clicks">
                    <h3>Clicks</h3>
                    <p>{link.clicks}</p>
                </div>
                <div className="clicks">
                    <h3>Clicks</h3>
                    <p>{link.clicks}</p>
                </div>
                <div className="clicks">
                    <h3>Clicks</h3>
                    <p>{link.clicks}</p>
                </div>
                <div className="clicks">
                    <h3>Clicks</h3>
                    <p>{link.clicks}</p>
                </div>
            </div>
            <div className="graph">

            </div>
        </div>
    )
}

export default Stats;
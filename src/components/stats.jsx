import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { Button, Spin } from 'antd';
import Plot from 'react-plotly.js';
import { RollbackOutlined } from '@ant-design/icons';

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
            <Link to="/" className="btnBack"><RollbackOutlined /></Link >
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
                    <h3>Latest Visitor</h3>
                    <p>{link.ipaddresses.length !== 0 ? link.ipaddresses[link.ipaddresses.length - 1] : "No one has visited yet"}</p>
                </div>
                <div className="clicks">
                    <h3>Last Used</h3>
                    <p>{link.dates !== 0 ? link.dates[link.dates.length - 1] : "No one has visited yet"}</p>
                </div>
            </div>
            <div className="graph">
                <Plot
                    data={[
                        {
                            y: link.clicks,
                            x: link.dates,
                            type: 'line',
                            mode: 'lines+markers',
                            marker: { color: '#fe3e4b' },
                            name: link.ipaddresses[0],
                            automargin: true,
                            orientation: 'v',
                        },
                        {

                        }
                    ]}
                    style={{
                        height: 'auto',
                        width: window.innerWidth < 450 ? '80%' : '100%',
                    }}
                    layout={{
                        xaxis: { title: { text: 'Date' } },
                        yaxis: { tite: { text: 'Population' } },
                        title: 'Visits Over Time',
                        showlegend: false,
                        autosize: true,
                    }}
                />
            </div>
        </div>
    )
}

export default Stats;
import { Alert, Button, Input, Spin } from 'antd';
import React, { useState } from 'react';
import { InfoCircleOutlined, LinkOutlined, SendOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Header from './header';
import SuccessModal from './successModal';
import Search from 'antd/lib/input/Search';
import { useHistory } from 'react-router-dom';

const Form = props => {
    const [url, setUrl] = useState({});
    const [search, setSearch] = useState("")
    const [information, setInformation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [modal, setModal] = useState(false);

    const onChangeHandler = e => {
        setUrl({ ...url, [e.target.name]: e.target.value });
    }

    const onSubmitHandler = (e) => {
        setLoading(true);

        if (!url.alias) {
            url.alias = uuidv4().substring(0, 7);
            console.log(url.alias);
        }

        console.log(url);

        axios.post(`https://url-shortt.herokuapp.com`, url)
            .then((response) => {
                setError(false);
                setLoading(false);
                setInformation(response.data);
                setUrl({ ...url, alias: null });
                setModal(true);

                console.log(response);
            }).catch(err => {
                setError(true);
                setLoading(false);
                console.log(err);
                setUrl({ ...url, alias: null });
            });
    }

    const history = useHistory();

    const onSearchHandler = (e) => {
        history.push(`/${search}`);
    }

    const onSearchChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <SuccessModal
                link={information && `https://url-shortt.herokuapp.com/${information.alias}`} modal={modal}
                setModal={setModal}
                alias={information && information.alias}
            />
            <h1>url shortt</h1>
            <div className="form-container">
                <h2>Enter Link and Alias</h2>
                <Input
                    className="input"
                    prefix={<LinkOutlined />}
                    placeholder="Insert URL..."
                    name="url"
                    size="medium"
                    onChange={onChangeHandler}
                    allowClear={true} />
                <Input
                    className="input"
                    prefix={<SendOutlined />}
                    placeholder="Create Alias... (Optional)"
                    size="medium"
                    name="alias"
                    onChange={onChangeHandler}
                    allowClear={true} />
                {loading
                    ? <Button type="primary" className="btn" loading>Loading</Button>
                    : <Button onClick={onSubmitHandler} className="btn" type="primary">Go</Button>
                }
                <h3 style={{ marginTop: 40 }}>View Link Information</h3>
                <Search onChange={onSearchChangeHandler} onSearch={onSearchHandler} enterbutton="Go" placeholder="Enter Alias..." prefix={<InfoCircleOutlined />} />
                {error
                    ? <Alert
                        message="Something went wrong..."
                        description="Make sure your URL is valid"
                        type="error" closable={true}
                        className="alert"
                        showIcon={true}
                    />
                    : null
                }
            </div>
        </form>
    )
}

export default Form;

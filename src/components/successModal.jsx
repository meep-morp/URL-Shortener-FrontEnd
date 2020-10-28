import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { PaperClipOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';

const SuccessModal = ({ modal, setModal, link, alias }) => {
    const handleCancel = e => {
        setModal(false);
    }

    return (
        <div className="modal">
            <Modal
                className="modal-success"
                visible={modal}
                title="Link Created"
                // onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
            </Button>,
                    <Link className="btn" key="submit" to={`/${alias}`} >
                        Link Stats
            </Link>,
                ]}
            >
                <div className="link-select">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={link}
                    >
                        {link}
                    </a>
                    <Button
                        className="btn"
                        type="primary"
                        shape="circle"
                        icon={<PaperClipOutlined />}
                        onClick={() => navigator.clipboard.writeText(link)}
                    />
                </div>
            </Modal>
        </div>
    );
}

export default SuccessModal;
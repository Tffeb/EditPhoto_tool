import React, { useState, useEffect } from 'react'
import { Upload, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import './index.css'

export default function App() {
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewTitle, setPreviewTitle] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [fileList, setFileList] = useState([])
    // 图片上传
    // const uploadChange = e => {
    //     if (Array.isArray(e)) {
    //         return e.map(item => { item.status = 'done'; return item });
    //     }
    //     return e.fileList.map(item => { item.status = 'done'; return item })
    // }
    const collectFun = () => {
        //收集图片dom
        let images = document.querySelectorAll('.imgbar .ant-upload-list-item-image');
        console.log(images,'images');
        [].forEach.call(images, el => {
            if (!el.attributes.draggable) {
                el.setAttribute('draggable', true);
                el.addEventListener('dragstart', e => {
                    // e.dataTransfer.setData('imgData', JSON.stringify({ url: e.target.currentSrc }));
                    console.log(e.target.currentSrc, 'ss')
                });
            }
        })
    }
    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    // 关闭预览图片
    const handleCancel = () => setPreviewVisible(false);
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewVisible(true)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
        setPreviewImage(file.url || file.preview)
    };

    const handleChange = ({ fileList }) => {
        const list = fileList.map(item => { item.status = 'done'; return item });
        collectFun();
        setFileList(list);
    };
    return (
        <div className="imgbar">
            <div className="upload_title">图片上传</div>
            <Upload
                accept="image/gif,image/png,image/jpg"
                customRequest={() => { }}
                listType="picture"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                <div>
                    <PlusOutlined />
                    <div className="ant-upload-text">上传</div>
                </div>
            </Upload>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    )
}

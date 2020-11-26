import React, { Component } from 'react'
import { Upload, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import './index.css'

export default class App extends Component {
    state = {
        previewVisible: false,
        previewTitle: '',
        previewImage: '',
        fileList: []
    };
    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };
    //收集图片dom
    getImgHandle = () => {
        const { fileList } = this.state;
        if (fileList.length) {
            let images = null
            const time = setInterval(() => {
                // 上传的图片是异步操作，导致images获取不到，故使用异步获取images
                images = document.querySelectorAll('.imgbar .ant-upload-list-item-image');
                if (images.length) {
                    clearInterval(time);
                    [].forEach.call(images, (el, index) => {
                        if (!el.attributes.draggable) {
                            el.setAttribute('draggable', true);
                            el.addEventListener('dragstart', e => {
                                e.dataTransfer.setData('imgData', JSON.stringify({ url: e.target.currentSrc }));
                                //加载图片获取图片真实宽度和高度
                                const reader = new FileReader();
                                reader.onload = edata => {
                                    const data = edata.target.result;
                                    let image = new Image();
                                    image.src = data;
                                    image.onload = () => {
                                        // 获取图片宽高属性
                                        localStorage.setItem('attrObj', JSON.stringify({ width: image.width, height: image.height }))
                                    };
                                };
                                reader.readAsDataURL(fileList[index].originFileObj);
                            });
                        }
                    })
                }
            }, 100);
        }
    };
    // 图片上传
    handleChange = ({ fileList }) => {
        const list = fileList.map(item => { item.status = 'done'; return item })
        this.setState({ fileList: list }, () => {
            this.getImgHandle();
        });
    };
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }
        this.setState({
            previewImage: file.url || file.preview,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
            previewVisible: true
        })
    };
    render() {
        const { previewVisible, previewTitle, previewImage, fileList } = this.state;
        return (
            <div className="imgbar">
                <div className="upload_title">图片上传</div>
                <Upload
                    accept="image/gif,image/png,image/jpg"
                    customRequest={() => { }}
                    listType="picture"
                    fileList={fileList}
                    onChange={this.handleChange}
                    onPreview={this.handlePreview}
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
                    onCancel={() => this.setState({ previewVisible: false })}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}

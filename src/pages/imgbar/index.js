import React, { Component } from 'react'
import { Upload, Modal, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import './index.css'

export default class App extends Component {
    state = {
        previewVisible: false,
        previewTitle: '',
        previewImage: '',
    }
    form = Form.useForm();
    // 图片上传
    uploadChange = e => {
        if (Array.isArray(e)) {
            return e.map(item => { item.status = 'done'; return item });
        }
        return e.fileList.map(item => { item.status = 'done'; return item });
    }
    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    componentDidUpdate() {
        // const upload = this.props.form.getFieldValue('upload');
        // console.log(upload)

        // if (upload) {
        //     this.getImgHandle()
        // }
    }
    componentDidMount() {
        console.log(this.props, 'props')
    }
    //收集图片dom
    getImgHandle = () => {
        let images = document.querySelectorAll('.imgbar .ant-upload-list-item-image');
        console.log(images, 'images');
        if (images.length > 0) {
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
    }
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
        console.log(this.form)
        const { previewVisible, previewTitle, previewImage } = this.state;
        return (
            <div className="imgbar">
                <div className="upload_title">图片上传</div>
                <Form form={this.form}>
                    <Form.Item
                        name="upload"
                        valuePropName="fileList"
                        getValueFromEvent={this.uploadChange}
                    >
                        <Upload
                            accept="image/gif,image/png,image/jpg"
                            customRequest={() => { }}
                            listType="picture"
                            onPreview={this.handlePreview}
                        >
                            <div>
                                <PlusOutlined />
                                <div className="ant-upload-text">上传</div>
                            </div>
                        </Upload>
                    </Form.Item>
                </Form>
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

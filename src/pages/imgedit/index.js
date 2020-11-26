import React, { useState } from 'react'
import './index.css'

export default function App() {
    const dragover = e => {
        e.preventDefault();
    };
    const dragstart = e => {
        e.preventDefault();
    };
    // 拖放图片到可编辑区
    const drop = e => {
        const text = e.dataTransfer.getData("imgData");
        const x = parseInt(e.clientX) - 202;
        const y = parseInt(e.clientY) - 146;
        try {
            let data = JSON.parse(text);
            data["x"] = x;
            data["y"] = y;
            addShape(data)
        } catch (err) {
            console.log(err)
        }
    };
    //maxWidth:img元素的宽度，像素（图片框 最大宽度）
    const autoSize = (data, maxWidth, maxHeight) => {
        const { width, height } = JSON.parse(localStorage.getItem('attrObj'))
        const img = document.createElement('img');
        img.style.position = 'absolute';
        img.style.left = `${data.x}px`;
        img.style.top = `${data.y}px`;
        img.src = data.url;
        // 当图片比图片框小时不做任何改变 
        if (width < maxWidth && height < maxHeight) {
            img.width = width;
            img.height = height;
        } else {    //原图片宽高比例 大于 图片框宽高比例,则以框的宽为标准缩放，反之以框的高为标准缩放
            if (maxWidth / maxHeight <= width / height) {    //原图片宽高比例 大于 图片框宽高比例
                img.width = maxWidth;   //以框的宽度为标准
                img.height = maxWidth * (height / width);
            } else {   //原图片宽高比例 小于 图片框宽高比例
                img.width = maxHeight * (width / height);
                img.height = maxHeight;   //以框的高度为标准
            }
        }
        return img
    }

    const addShape = data => {
        const imgedit = document.querySelector('.imgedit');
        const img = autoSize(data, 300, 300);
        imgedit.appendChild(img);
    }
    return (
        <div className="imgedit" onDragOver={dragover} onDragStart={dragstart} onDrop={drop}>

        </div>
    )
}
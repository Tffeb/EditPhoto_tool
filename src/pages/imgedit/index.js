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
        // console.log('aaa')
        const text = e.dataTransfer.getData("imgData");
        // console.log(text,'ss')
        const x = parseInt(e.offsetX) + 0.5;
        const y = parseInt(e.offsetY) + 0.5;
        // try {
        //     let data = JSON.parse(text);
        //     data["x"] = x;
        //     data["y"] = y;
        //     console.log(data, 'ss')
        //     addShape(data)
        // } catch (err) {
        //     console.log(err)
        // }
    };
    const addShape = data => {
        const imgedit = document.querySelector('.imgedit');
        const img = document.createElement('img');
        img.style.position = 'absolute';
        img.style.left = data.x;
        img.style.top = data.y;
        img.src = data.url;
        imgedit.appendChild(img);
    }
    return (
        <div className="imgedit"></div>
        // <div className="imgedit" onDragOver={dragover} onDragStart={dragstart} onDrop={drop}>

        // </div>
    )
}
import React, {  useState } from 'react'
import './index.css'

export default function App(props) {
    const [isClickLoad, setIsClickload] = useState(false)
    const [IsShowbtn, setIsShowbtn] = useState(false)   // 是否展示保存取消按钮

    // useEffect(() => {
    //     setIsShowbtn(true)
    // })
    // 图标操作项
    const operateIcon = [
        {
            icon: 'icon-undo',
            name: '撤销',
            cmd: 'undo',
            class: 'disable'
        },
        {
            icon: 'icon-redo',
            name: '恢复',
            cmd: 'redo',
            class: 'disable'
        },
        {
            icon: 'icon-copy',
            name: '复制',
            cmd: 'copy',
            class: 'disable'
        },
        {
            icon: 'icon-shanchu',
            name: '删除',
            cmd: 'delete',
            class: 'disable'
        },
        {
            icon: 'icon-kuangxuan',
            name: '框选',
            cmd: 'selectFrame',
            class: 'disable'
        }
    ]
    // 点击改变状态
    const changeState = (e, callback) => {
        e.stopPropagation()
        callback()
    }
    document.addEventListener('click', () => {
        if (isClickLoad) {
            setIsClickload(false)
        }
    })
    return (
        <div className="header">
            <ul>
                {
                    operateIcon.map((item, index) => <li key={index} title={item.name} className={`iconfont ${item.icon} ${item.class}`}></li>)
                }
                <li onClick={e => changeState(e, () => setIsClickload(!isClickLoad))}>
                    <span className="iconfont icon-upload-demo" title="下载"></span>
                    <ul className={isClickLoad ? '' : 'element_hidden'}>
                        <li className="iconfont icon-JSON"><span>JSON</span></li>
                        <li className="iconfont icon-PNG"> <span>PNG</span></li>
                        <li className="iconfont icon-jpg"> <span>JPG</span></li>
                    </ul>
                </li>
                {
                    IsShowbtn ? <>
                        <li><span>取消</span></li>
                        <li><span style={{ color: '#1890ff' }}>保存</span></li>
                    </> : null
                }
            </ul>
        </div >
    )
}
import React from 'react';
import './Toolbar.css';
import SidebarToggleButton from "../SideBar/SidebarToggleButton";
import logo from '../assets/sensorup.png'

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar__navigation">
            <div className="logo">
                <img alt={"Logo"} src={logo} width="40" height="40" />
            </div>
            <div>
                <SidebarToggleButton click={props.sidebarClickHandler}/>
            </div>
            <div className="toolbar__logo">3D IoT Simulator</div>
        </nav>
    </header>

);

export default toolbar;

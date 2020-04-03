import React from 'react';
import './SideBar.css';


const SideBar = props => {
    let sidebarClasses = 'sidebar';
    if(props.show){
        sidebarClasses = 'sidebar open';
    }
    return(
        <nav className={sidebarClasses}>
            <ul>
                <li ><a href="/">
                    Simulator</a></li>
                {/*<li ><a href="/">*/}
                {/*    Graph Overview</a></li>*/}
                {/*<li ><a href="/">*/}
                {/*    Data Export</a></li>*/}
            </ul>
        </nav>
    );

};

export default SideBar;

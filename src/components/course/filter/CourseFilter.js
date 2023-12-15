import {NavLink} from "react-router-dom";
import {useState} from "react";

function CourseFilter(){

    return(
        <div className="listFilterArea">
            <div className="listBtnArea">
                <NavLink to='/courses/proceeding'><p>진행중</p></NavLink> &nbsp;
                <NavLink to='/courses/expected'><p>개강예정</p></NavLink>
            </div>
            <input className='courseSearch'/>
        </div>
    )
}

export default CourseFilter;
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callMyCourseListAPI} from "../../../apis/MyCourseAPICalls";
import PagingBar from "../../common/PagingBar";
import MyCourseListItem from "../../items/MyCourseListItem";


function InProgressList() {

    const {courses} = useSelector(state => state.myCourseReducer); // api
    const [currentPage, setCurrentPage] = useState(1); // api
    const dispatch = useDispatch();

    useEffect(() => {
        /* 진행 중인 강의(과정)에 대한 정보 요청 */
        dispatch(callMyCourseListAPI({currentPage}));
    }, [currentPage]);

    return (
        <>
            <MyCourseListItem title="진행중인 강의" listType="InProgressList"
                              courses={courses} setCurrentPage={setCurrentPage}/>

        </>
    );
}

export default InProgressList;

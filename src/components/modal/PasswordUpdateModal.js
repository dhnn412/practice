import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {callLoginAPI, InfoUpdateAPI} from "../../apis/LoginAPICalls";
import {loginFailure, passwordWarn} from "../../modules/LoginModule";

function PasswordUpdateModal({profile, setPasswordUpdateModal}) {

    const loginReducer = useSelector(state => state.loginReducer);

    const [info, setInfo] = useState({
            memberPwd: "",
            postNo: profile.postNo,
            address: profile.address,
            detailAddress: profile.detailAddress,
            memberEmail: profile.memberEmail,
            memberPhone: profile.memberPhone,
            memberBirth: profile.memberBirth,
            memberGender: profile.memberGender
        }
    );
    const [checkInfo, setCheckInfo] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();




    useEffect(() => {
        if (loginReducer?.putSuccess === true){
            alert("비밀번호 변경이 완료 되었습니다.");
            window.location.replace("/profile");
        }
    }, [loginReducer]);

    useEffect(() => {

            if (loginReducer?.loginSuccess ===true) {
                alert("인증이 완료되었습니다. 변경하실 비밀번호를 입력해주세요")
            }

    }, [loginReducer]);


    const onChangeHandler = e => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const onCheckHandler = e =>{
        setCheckInfo({
            ...checkInfo,
            [e.target.name]:e.target.value
        })
    }


    // const onClickCheckHandler = () => {
    //     if (profile.memberId === info.memberId) {
    //         setCheck(true);
    //     } else {
    //         toast.warning("아이디가 일치하지 않습니다");
    //     }
    // }

    const onClickCheckHandler = () => {
        if (!checkInfo.memberId || !checkInfo.memberPwd) {
            toast.warning('아이디또는 비밀번호를 입력헤주세요');
        }else {

            dispatch(callLoginAPI({loginRequest : checkInfo}));
        }
    }



    const onClickInfoUpdateHandler = () => {
        if (!info.memberPwd) {
            toast.warning("변경하실 비밀번호를 입력해주세요");
        } else if (profile.memberPwd === info.memberPwd) {
            toast.warning("현재 사용중이신 비밀번호 입니다. 다른 비밀번호로 변경해주세요");
        }else if (info.memberPwd && profile.memberPwd !== info.memberPwd){
            console.log(profile.memberPwd);
            console.log(info.memberPwd);
            dispatch(InfoUpdateAPI({InfoUpdateRequest: {...info, memberId: profile.memberId}}));
        }

    }

    const handleOnKeyPressPassword = e => {
        if (e.key === 'Enter'){
            onClickInfoUpdateHandler();
        }
    }

    const handleOnKeyPressId = e => {
        if (e.key === 'Enter') {
            onClickCheckHandler();
        }
    };


    const buttonClick = () => {
        if (window.confirm("비밀번호 변경을 취소하시겠습니까?")){
            setPasswordUpdateModal(false);
            dispatch(loginFailure());

        }else {

        }

    }


    return (
        <>
            {loginReducer?.loginSuccess ? (
                <table className="password-update-table1">
                    <tbody>

                    <tr>
                        <td style={{paddingTop : 10}}>
                            <input
                                type="password"
                                style={{borderColor: 'rgba(117, 100, 166, 0.18)', height: '40px'}}
                                value={info.password}
                                name="memberPwd"
                                placeholder="새로운 비밀번호를 입력하세요"
                                onChange={onChangeHandler}
                                onKeyPress={handleOnKeyPressPassword}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>

                            <button className="modal-button"
                                    onClick={onClickInfoUpdateHandler}
                                    style={{
                                        width: '125px',
                                        margin: '10px 10px 10px 0px',
                                        height: '45px',
                                        borderRadius: 8,
                                        color: "white",
                                        borderColor: "white",
                                        fontWeight: "bolder",
                                        backgroundColor: "#583ea2",
                                        cursor: "pointer"
                                    }}

                            >
                                확인
                            </button>


                            <button className="modal-button"
                                    onClick={buttonClick}
                                    style={{
                                        width: '125px',
                                        margin: '10px 0px 10px 0px',
                                        height: '45px',
                                        borderRadius: 8,
                                        color: "#583ea2",
                                        borderColor: "white",
                                        fontWeight: "bolder",
                                        backgroundColor: "#f3f3f3",
                                        cursor: "pointer"
                                    }}
                            >
                                취소
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            ) : (
                <>
                    <table className="password-update-table2">
                        <tbody>
                        <tr>
                            <td style={{paddingTop : 10}}>
                                <input
                                    type="text"
                                    style={{borderColor: 'rgba(117, 100, 166, 0.18)', height: '40px'}}
                                    value={checkInfo.memberId}
                                    name="memberId"
                                    placeholder="아이디를 입력해주세요"
                                    onChange={onCheckHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{paddingTop : 10}}>
                                <input
                                    type="password"
                                    style={{borderColor: 'rgba(117, 100, 166, 0.18)', height: '40px'}}
                                    value={checkInfo.memberPwd}
                                    name="memberPwd"
                                    placeholder="현 비밀번호를 입력하세요"
                                    onChange={onCheckHandler}
                                    onKeyPress={handleOnKeyPressId}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>

                                <button className="modal-button"
                                        onClick={onClickCheckHandler}
                                        style={{
                                            width: '125px',
                                            margin: '10px 10px 10px 0px',
                                            height: '45px',
                                            borderRadius: 8,
                                            color: "white",
                                            borderColor: "white",
                                            fontWeight: "bolder",
                                            backgroundColor: "#583ea2",
                                            cursor: "pointer"

                                        }}

                                >
                                    확인
                                </button>


                                <button className="modal-button"
                                        onClick={() => setPasswordUpdateModal(false)}
                                        style={{
                                            width: '125px',
                                            margin: '10px 0px 10px 0px',
                                            height: '45px',
                                            borderRadius: 8,
                                            color: "#583ea2",
                                            borderColor: "white",
                                            fontWeight: "bolder",
                                            backgroundColor: "#f3f3f3",
                                            cursor: "pointer"
                                        }}
                                >
                                    취소
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </>
            )}
        </>
    );

}

export default PasswordUpdateModal;
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callMemberCreationAPI} from "../../apis/MemberAPICalls";
import CreationInfoList from "../../components/lists/CreationInfoList";

function Creation(){

    const dispatch = useDispatch()
    const { creationInfos } = useSelector(state => state.memberReducer)
    const [form, setForm] = useState(() => sendInitialMemberForm())
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus();
        setForm(sendInitialMemberForm());
    }, [creationInfos])

    function sendInitialMemberForm() {
        return {
            memberName: '',
            memberRole: 'NONE',
            cnt: 0
        }
    }

    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(callMemberCreationAPI({creationRequest : form}))
    }

    return(
        <>
            <div>
                <h1>입력란</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        이름
                        <input
                            type='text'
                            name='memberName'
                            value={form.memberName}
                            placeholder='이름을 입력해 주세요.'
                            onChange={onChangeHandler}
                            ref={inputRef}
                        />
                    </label>

                    <label>
                        부서
                        <select
                            name='memberRole'
                            value={form.memberRole}
                            onChange={onChangeHandler}
                        >
                            <option value='NONE'>NONE</option>
                            <option value='ADMIN'>관리자</option>
                            <option value='STAFF'>행정</option>
                            <option value='TEACHER'>강사</option>
                        </select>
                    </label>

                    <label>
                        생성 수
                        <input
                            type='number'
                            name='cnt'
                            value={form.cnt}
                            placeholder='숫자를 입력하세요.'
                            onChange={onChangeHandler}
                        />
                    </label>

                    <button type="submit">등록</button>
                </form>
            </div>

            <div>
                <h1>발급란</h1>
                {
                    creationInfos &&
                    <CreationInfoList infos={ creationInfos }/>
                }
            </div>
        </>
    )

}

export default Creation
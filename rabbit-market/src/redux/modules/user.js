import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from '../../shared/api';

//actions
const UPLOADING = 'UPLOADING';
const CHECK_ID = 'CHECK_ID';
const LOG_OUT = 'LOG_OUT';
const SET_USER = 'SET_USER';
// const GET_USER = 'GET_USER';

//action creators
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const checkid = createAction(CHECK_ID, () => ({}));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

//initialState
const initialState = {
  user: null,
  is_login: false,
  is_check_id: false,
};

// 회원가입
const registerDB = (id, pw, nickname) => {
  return function ({ history }) {
    apis.signup(id, pw, nickname).then((res) => {
      if (!res.data.ok) {
        alert(res.data.result);
        return;
      }
    });
  };
};

// 로그인
const setLoginDB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    apis.login(id, pwd).then((res) => {
      console.log(res);
      if (res.data.ok === false) {
        alert('없는 회원정보 입니다! 회원가입을 해주세요!');
        return;
      }
      localStorage.setItem('login-token', res.data.token);
      dispatch(setUser({ userId: id }));
      history.replace('/');
    });
  };
};

// 아이디 체크
const checkIdDB = (id) => {
  return function (dispatch) {
    apis
      .checkId(id)
      .then((res) => {
        window.alert('사용 가능한 아이디입니다.');
        dispatch(checkid());
      })
      .catch((err) => {
        window.alert('이미 존재하는 아이디입니다.');
      });
  };
};

// 로그아웃
const logoutDB = () => {
  return function (dispatch, getState, { history }) {
    localStorage.removeItem('login-token');
    dispatch(logOut());
    window.location.replace('/');
  };
};

// 회원 정보 확인
function checkLoginDB() {
  return function (dispatch, useState, { history }) {
    dispatch(uploading(true));

    const token = localStorage.getItem('login-token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .checkLogin(config)
      .then(function (res) {
        dispatch(setUser({ ...res.data.user }));
      })
      .catch((error) => {
        console.log(error);
        dispatch(uploading(false));
      });
  };
}

//reducer
export default handleActions(
  {
    [CHECK_ID]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.is_check_id = true;
      }),

    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
        console.log(draft.user.userId);
        draft.uploading = false;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),

    // 업로딩하는 중간에 또 업로드 이미지하는 것을 막아주기 위해서..!
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
  },
  initialState
);

//action creator export
const actionCreators = {
  registerDB,
  setLoginDB,
  logoutDB,
  checkIdDB,
  checkLoginDB,
};

export { actionCreators };

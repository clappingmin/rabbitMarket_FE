import { BrowserRouter, Route, Router } from "react-router-dom";
// import { ConnectedRouter } from "connected-react-router";
// import { history } from "../redux/configureStore";

import Main from "../pages/Main";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";

import Button from "../elements/Button";
import Grid from "../elements/Grid";

function App() {
  return (
    <>
      <Grid>
        <Route path="/" exact component={Main}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        {/* 게시물 작성 */}
        <Route path="/write" exact component={PostWrite}></Route>
        {/* 게시물 수정 */}
        <Route path="/write/:id" exact component={PostWrite}></Route>
        {/* 상세 페이지 */}
        <Route path="/post/:id" exact component={PostDetail}></Route>
      </Grid>
      <Button
        is_float
        text="+"
        _onClick={() => {
          // history.push("/write");
        }}
      ></Button>
    </>
  );
}

export default App;
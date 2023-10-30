import React from "react";
import { useNavigate } from "react-router";

const Main = (): JSX.Element => {
    const navigate = useNavigate();
    const back = (): void => {
        navigate(-1);
    }
    return <>
        <h1 onClick={back}>Hello, world!</h1>
    </>;
}

export default Main;

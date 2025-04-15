import { ReactNode } from "react";
import Scrollbars from "react-custom-scrollbars-2";

const ScrollContainer = (props: { children: ReactNode, width?: string, height?: string }) => (
    <Scrollbars style={{ width: props.width || "100vw", height: props.height || "90vh" }}>
        {props.children}
    </Scrollbars>
)

export default ScrollContainer
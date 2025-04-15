import { ReactNode } from "react";
import Scrollbars from "react-custom-scrollbars-2";

const ScrollContainer = ({ children }: { children: ReactNode}) => (
    <Scrollbars style={{ width: "100vw", height: "90vh" }}>
        {children}
    </Scrollbars>
)

export default ScrollContainer
import React, {ReactNode} from "react"
//NGL this is a bit confusing but I guess its required for reusable custom components?
interface WrapperProps {
    children?: ReactNode;
}
const Wrapper = ({children}: WrapperProps) => {
    return(
        <div
      className="bg-violet-950 min-h-screen"
      >
        <center>
        {children}
        </center>
      </div>
    )
}
export default Wrapper; 
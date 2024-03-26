import React, {ReactNode} from "react"

//NGL this is a bit confusing but I guess its required for reusable custom components?
interface WrapperProps {
    children?: ReactNode;
}
const Wrapper = ({children}: WrapperProps) => {
    return(
        <div
      className="wrapper"
      >
        <center>
        {children}
        </center>
      </div>
    )
}
export default Wrapper; 
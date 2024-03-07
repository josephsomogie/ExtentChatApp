import React, {ReactNode} from "react";
//This component is not being used ATM
interface ButtonProps{
    children:ReactNode;
}
const Button = ({children}:ButtonProps, props: any) =>{
    return(
        <button
        className="w-100 px-4 rounded-lg shadow-sm bg-white"
        {...props}
        
        >
            {children }
        </button>
    )
}
export default Button;
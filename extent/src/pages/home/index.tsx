
import HomePage from "../../components/HomeComponent";
import { useSession } from "next-auth/react";
import LogIn from "../login/login";
export default function homePage() {
    const {data: session} = useSession();
    if(session){
    return <HomePage/>;
    }
    
    return <LogIn/>;
        
    
} 
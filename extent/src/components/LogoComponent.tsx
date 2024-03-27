import React from  'react';
import Image from "next/image"
import {useState, useEffect} from 'react';
export const Logo = () => {
    return(
<Image src="/images/Logo.png" alt="Extent Logo" width="200" height="200"/>
    )
    }

export const LightLogo = () => {
    return(
        <Image src="/images/LogoLight2.png" alt="Extent Lightmode Logo" width="200" height="200"/>
    )
    }

 export const DarkLogo = () => {
    return(
        <Image src="/images/LogoDark2.png" alt="Extent Lightmode Logo" width="200" height="200"/>
    )
    }
    export const AutoLogo = () => {
        const [imageUri, setImageUri] = useState('/images/LogoLight2.png'); // default to light mode logo

        useEffect(() => {
          // Since useEffect runs on the client, you can safely access `document` here
          const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
          setImageUri(currentTheme === 'dark' ? "/images/LogoDark2.png" : "/images/LogoLight2.png");
        }, []);
        return(
            <Image src={imageUri} alt="Extent Lightmode Logo" width="200" height="200"/>
        )
    }
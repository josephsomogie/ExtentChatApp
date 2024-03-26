import React from  'react';
import Image from "next/image"

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
        let imageUri = ''
        document.body.classList.contains('dark') ? imageUri ="/images/LogoDark2.png" : imageUri ="/images/LogoLight2.png"
        return(
            <Image src={imageUri} alt="Extent Lightmode Logo" width="200" height="200"/>
        )
    }
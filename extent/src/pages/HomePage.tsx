import React, { useState } from "react"
import TextInput from "~/components/TextInput"
import Image from "next/image"
import { useRouter } from "next/router"
import Wrapper from "~/components/PurpleWrapper"

export default function HomePage() {

    return(
        <Wrapper>
            <section className="px-4 lg:px-20 flex flex-col">
        <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-4xl leading-loose text-white-800  mt-20">My Chats</h1>
        <div className="text-white-800 mt-20">
           
            <ul className="list-disc mr-24 text-left">
                <li>First bullet point</li>
                <li>Second bullet point</li>
                <li>Third bullet point</li>
            </ul>
        </div>
        <div className="bg-blue-400 min-h-screen"></div>
    </section>
    
        </Wrapper>
    )
}
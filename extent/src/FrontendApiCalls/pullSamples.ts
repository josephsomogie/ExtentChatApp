import React, { useState } from "react"
//This function makes a http get request to an api file on our backend to retrieve all instances of the sample model.
//see the api file at '/api/DBInteractions/getSamples'
export default async function getSamples() {
    const response = await fetch('/api/DBInteractions/getSamples',
    )
        
}

import React, { useState } from "react"
export default async function getSamples() {
    const response = await fetch('/api/DBInteractions/getSamples');
        const data = await response.json();
        return data;
}

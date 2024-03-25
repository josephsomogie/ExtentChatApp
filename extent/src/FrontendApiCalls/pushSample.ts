import React, { useState } from "react"
//This function makes a http post request to an api file on our backend to create an instance of the sample model.
//see the api file at '/api/DBInteractions/createSamples'
export default  async function createSample(sampleData:String, sampleUserID:String){
  
    try {
      const response = await fetch('/api/DBInteractions/createSample', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data:sampleData,
            userID:sampleUserID
        })
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to create sample: ${errorMessage}`);
      }
  
      const newSample = await response.json();
      console.log('New sample created:', newSample);
      // Do something with the newSample if needed
    } catch (error) {
      console.error('Error creating sample:', error);
      // Handle error appropriately
    }
  };
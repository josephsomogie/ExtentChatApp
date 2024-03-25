import React, { useState } from "react"
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
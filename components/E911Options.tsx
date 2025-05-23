import type React from "react"
import { useState } from "react"

interface E911OptionsProps {
  onApiResponse: (response: string) => void
}

const E911Options: React.FC<E911OptionsProps> = ({ onApiResponse }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleValidateAndStore = async () => {
    setIsLoading(true)
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onApiResponse(JSON.stringify({ success: true, message: "Address validated and stored successfully" }, null, 2))
    } catch (error) {
      onApiResponse(JSON.stringify({ error: "Failed to validate address" }, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetInput = () => {
    // Reset input form logic here
    onApiResponse(JSON.stringify({ message: "Input parameters reset" }, null, 2))
  }

  const handleRetrieveAddress = async () => {
    setIsLoading(true)
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onApiResponse(JSON.stringify({ success: true, message: "Address retrieved successfully" }, null, 2))
    } catch (error) {
      onApiResponse(JSON.stringify({ error: "Failed to retrieve address" }, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetValidated = () => {
    // Reset validated address form logic here
    onApiResponse(JSON.stringify({ message: "Validated address reset" }, null, 2))
  }

  return (
    <div className="card h-100">
      <div className="card-header">
        <h5 className="mb-0">e911 Address Options</h5>
      </div>
      <div className="card-body d-flex flex-column justify-content-center">
        <div className="e911-options-grid">
          <div className="e911-option-quadrant">
            <button className="btn btn-primary w-100 h-100" onClick={handleValidateAndStore} disabled={isLoading}>
              {isLoading ? "Processing..." : "Validate and Store Address"}
            </button>
          </div>
          <div className="e911-option-quadrant">
            <button className="btn btn-primary w-100 h-100" onClick={handleResetInput} disabled={isLoading}>
              Reset Input Parameters
            </button>
          </div>
          <div className="e911-option-quadrant">
            <button className="btn btn-primary w-100 h-100" onClick={handleRetrieveAddress} disabled={isLoading}>
              {isLoading ? "Retrieving..." : "Retrieve a Stored Address"}
            </button>
          </div>
          <div className="e911-option-quadrant">
            <button className="btn btn-primary w-100 h-100" onClick={handleResetValidated} disabled={isLoading}>
              Reset Validated Address
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default E911Options


import type React from "react"
import { useState } from "react"
import AddressValidation from "./AddressValidation"
import ValidatedAddress from "./ValidatedAddress"
import E911Options from "./E911Options"
import ApiResponse from "./ApiResponse"

const RightContainer: React.FC = () => {
  const [apiResponse, setApiResponse] = useState("")

  const handleApiResponse = (response: string) => {
    setApiResponse(response)
  }

  return (
    <div className="right-container">
      <div className="address-grid">
        <AddressValidation />
        <ValidatedAddress />
        <E911Options onApiResponse={handleApiResponse} />
        <ApiResponse response={apiResponse} />
      </div>
    </div>
  )
}

export default RightContainer


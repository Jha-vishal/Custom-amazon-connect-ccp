"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import NewsBar from "../components/NewsBar"
import CCPContainer from "../components/CCPContainer"
import AddressValidation from "../components/AddressValidation"
import ValidatedAddress from "../components/ValidatedAddress"
import E911Options from "../components/E911Options"
import ApiResponse from "../components/ApiResponse"
import AdditionalCards from "../components/AdditionalCards"

export default function Home() {
  const [isE911Visible, setIsE911Visible] = useState(false)
  const [apiResponse, setApiResponse] = useState("")

  useEffect(() => {
    const storedVisibility = localStorage.getItem("e911Visible")
    setIsE911Visible(storedVisibility === "true")
  }, [])

  const toggleE911 = () => {
    const newVisibility = !isE911Visible
    setIsE911Visible(newVisibility)
    localStorage.setItem("e911Visible", newVisibility.toString())
  }

  const handleApiResponse = (response: string) => {
    setApiResponse(response)
  }

  return (
    <main className="app-container">
      <Navbar />
      <div className="main-content">
        <CCPContainer />
        <div className="right-side">
          <NewsBar onToggle={toggleE911} isVisible={isE911Visible} />
          <div className="right-container">
            {!isE911Visible ? (
              <div className="quadrant-container">
                <div className="quadrant quadrant-address-validation">
                  <AddressValidation />
                </div>
                <div className="quadrant quadrant-validated-address">
                  <ValidatedAddress />
                </div>
                <div className="quadrant quadrant-e911-options">
                  <E911Options onApiResponse={handleApiResponse} />
                </div>
                <div className="quadrant quadrant-api-response">
                  <ApiResponse response={apiResponse} />
                </div>
              </div>
            ) : (
              <AdditionalCards />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}


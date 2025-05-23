import type React from "react"
import { useState, useEffect } from "react"

const AddressValidation: React.FC = () => {
  const [formData, setFormData] = useState({
    agentUserName: "",
    agentPhone: "",
    houseNumber: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "USA",
  })

  useEffect(() => {
    // Mock agent username for now
    setFormData((prev) => ({ ...prev, agentUserName: "mock-agent@example.com" }))
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="card h-100">
      <div className="card-header">
        <h5 className="mb-0">Address Validation</h5>
      </div>
      <div className="card-body overflow-auto">
        <form>
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="form-group row mb-2">
              <label htmlFor={key} className="col-sm-6 col-form-label">
                {key === "agentUserName"
                  ? "Agent User Name"
                  : key === "agentPhone"
                    ? "Agent Phone Number"
                    : key.charAt(0).toUpperCase() +
                      key
                        .slice(1)
                        .replace(/([A-Z])/g, " $1")
                        .trim()}
              </label>
              <div className="col-sm-6 col-input">
                <input
                  type={key === "agentPhone" ? "tel" : "text"}
                  className="form-control"
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  readOnly={key === "agentUserName" || key === "country"}
                  placeholder={key === "agentPhone" ? "+18001234567" : "-"}
                />
              </div>
            </div>
          ))}
        </form>
      </div>
    </div>
  )
}

export default AddressValidation


import type React from "react"

const ValidatedAddress: React.FC = () => {
  const fields = [
    { key: "road", label: "Road or Street (RD)" },
    { key: "streetSuffix", label: "Street Suffix (STS)" },
    { key: "leadingDirection", label: "Leading Street Direction (PRD)" },
    { key: "houseNumber", label: "House Number (HNO)" },
    { key: "houseNumberSuffix", label: "House Number Suffix (HNS)" },
    { key: "city", label: "City (A3)" },
    { key: "state", label: "State (A1)" },
    { key: "postalCode", label: "Postal Code (PC)" },
    { key: "trailingSuffix", label: "Trailing street suffix (POD)" },
    { key: "locationInfo", label: "Additional Location Info (LOC)" },
    { key: "residenceName", label: "Name of Residence (NAM)" },
    { key: "country", label: "Country" },
  ]

  return (
    <div className="card h-100">
      <div className="card-header">
        <h5 className="mb-0">System Validated Address</h5>
      </div>
      <div className="card-body overflow-auto">
        <form>
          {fields.map((field) => (
            <div key={field.key} className="form-group row mb-2">
              <label htmlFor={field.key} className="col-sm-6 col-form-label">
                {field.label}
              </label>
              <div className="col-sm-6 col-input">
                <input
                  type="text"
                  className="form-control"
                  id={field.key}
                  name={field.key}
                  readOnly
                  value={field.key === "country" ? "USA" : ""}
                />
              </div>
            </div>
          ))}
        </form>
      </div>
    </div>
  )
}

export default ValidatedAddress


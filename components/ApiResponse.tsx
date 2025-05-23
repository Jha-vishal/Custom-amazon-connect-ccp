import type React from "react"

interface ApiResponseProps {
  response: string
}

const ApiResponse: React.FC<ApiResponseProps> = ({ response }) => {
  return (
    <div className="card h-100">
      <div className="card-header">
        <h5 className="mb-0">API Response</h5>
      </div>
      <div className="card-body">
        <textarea className="form-control h-100" value={response} readOnly style={{ resize: "none" }} />
      </div>
    </div>
  )
}

export default ApiResponse


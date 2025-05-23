import type React from "react"
import { useState, useEffect } from "react"

const OutOfOfficeMessage: React.FC = () => {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [agentUsername, setAgentUsername] = useState("")

  useEffect(() => {
    // Mock agent username for now
    setAgentUsername("mock-agent@example.com")
  }, [])

  const insertMsg = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/insertOutOfOfficeMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, agentUsername }),
      })
      const data = await response.json()
      if (data.success) {
        setMessage("")
        alert("Out-of-office message stored successfully")
      } else {
        throw new Error(data.error || "Failed to store out-of-office message")
      }
    } catch (error) {
      console.error("Error inserting out-of-office message:", error)
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="card-header text-center">
        <h5>
          <b>Out of Office Message</b>
        </h5>
      </div>
      <div className="card-body">
        <form id="ooo" className="needs-validation" noValidate>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="agent_username">Agent User Name</label>
              <input type="text" className="form-control" id="agent_username" value={agentUsername} readOnly />
            </div>
            <div className="col-md-6">
              <label htmlFor="agent_msg">Agent Message</label>
              <input
                type="text"
                className="form-control"
                id="agent_msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
          <button className="btn btn-outline-primary mt-3" type="button" onClick={insertMsg} disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </>
  )
}

export default OutOfOfficeMessage


import type React from "react"
import RecordingControls from "./RecordingControls"
import OutOfOfficeMessage from "./OutOfOfficeMessage"
import CallTranscription from "./CallTranscription"

const AdditionalCards: React.FC = () => {
  return (
    <div className="additional-cards">
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="card h-100">
            <RecordingControls />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <OutOfOfficeMessage />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <CallTranscription />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdditionalCards


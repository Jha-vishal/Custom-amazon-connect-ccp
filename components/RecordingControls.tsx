"use client"

import type React from "react"
import { useState, useEffect } from "react"

// Use the same mock connect from CCPContainer
const connect =
  typeof window !== "undefined" && (window as any).connect
    ? (window as any).connect
    : {
        agent: (callback: (agent: any) => void) => {
          callback({
            getConfiguration: () => ({
              username: "mock-agent@example.com",
            }),
            getContacts: () => [
              {
                startRecording: ({ success }: { success: () => void }) => success(),
                stopRecording: ({ success }: { success: () => void }) => success(),
                pauseRecording: ({ success }: { success: () => void }) => success(),
                resumeRecording: ({ success }: { success: () => void }) => success(),
              },
            ],
          })
        },
        contact: (callback: (contact: any) => void) => {
          callback({
            onConnecting: (cb: () => void) => cb(),
            onConnected: (cb: () => void) => cb(),
            onEnded: (cb: () => void) => cb(),
            contactId: "mock-contact-id",
          })
        },
      }

const RecordingControls: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [contactId, setContactId] = useState("")
  const [agentUsername, setAgentUsername] = useState("")

  useEffect(() => {
    connect.contact((contact) => {
      contact.onConnecting(() => {
        setContactId(contact.contactId)
      })

      contact.onConnected(() => {
        setIsRecording(false)
        setIsPaused(false)
      })

      contact.onEnded(() => {
        setIsRecording(false)
        setIsPaused(false)
        setContactId("")
      })
    })

    connect.agent((agent) => {
      setAgentUsername(agent.getConfiguration().username)
    })
  }, [])

  const startRec = () => {
    connect.agent((agent) => {
      const contact = agent.getContacts()[0]
      if (contact) {
        contact.startRecording({
          success: () => {
            setIsRecording(true)
            setIsPaused(false)
          },
          failure: (err: Error) => console.error("Failed to start recording:", err),
        })
      }
    })
  }

  const stopRec = () => {
    connect.agent((agent) => {
      const contact = agent.getContacts()[0]
      if (contact) {
        contact.stopRecording({
          success: () => {
            setIsRecording(false)
            setIsPaused(false)
          },
          failure: (err: Error) => console.error("Failed to stop recording:", err),
        })
      }
    })
  }

  const pauseRec = () => {
    connect.agent((agent) => {
      const contact = agent.getContacts()[0]
      if (contact) {
        contact.pauseRecording({
          success: () => setIsPaused(true),
          failure: (err: Error) => console.error("Failed to pause recording:", err),
        })
      }
    })
  }

  const resumeRec = () => {
    connect.agent((agent) => {
      const contact = agent.getContacts()[0]
      if (contact) {
        contact.resumeRecording({
          success: () => setIsPaused(false),
          failure: (err: Error) => console.error("Failed to resume recording:", err),
        })
      }
    })
  }

  return (
    <>
      <div className="card-header">
        <h5>Amazon Connect Call Recording Controls</h5>
      </div>
      <div className="card-body">
        <form id="recording_form" className="mb-3">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="ccpId">Contact ID</label>
              <input type="text" className="form-control" id="ccpId" value={contactId} readOnly />
            </div>
            <div className="col-md-6">
              <label htmlFor="agent_username1">Agent User Name</label>
              <input type="text" className="form-control" id="agent_username1" value={agentUsername} readOnly />
            </div>
          </div>
        </form>
        <div className="recording-buttons">
          <button type="button" className="btn btn-success" onClick={startRec} disabled={isRecording && !isPaused}>
            {isRecording && !isPaused ? "Recording" : "Start"}
          </button>
          <button type="button" className="btn btn-danger" onClick={stopRec} disabled={!isRecording}>
            Stop
          </button>
          <button type="button" className="btn btn-secondary" onClick={pauseRec} disabled={!isRecording || isPaused}>
            {isPaused ? "Paused" : "Pause"}
          </button>
          <button type="button" className="btn btn-info" onClick={resumeRec} disabled={!isPaused}>
            Resume
          </button>
        </div>
      </div>
    </>
  )
}

export default RecordingControls


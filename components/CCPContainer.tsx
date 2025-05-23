"use client";

import type React from "react";
import { useEffect, useState } from "react";

// Mock connect object for development
const mockConnect = {
  core: {
    initCCP: (container: HTMLElement, config: any) => {
      console.log("Mock CCP initialized with config:", config);
    },
    getEventBus: () => ({
      trigger: (eventType: string) => {
        console.log(`Event triggered: ${eventType}`);
      },
    }),
  },
  agent: (callback: (agent: any) => void) => {
    callback({
      getConfiguration: () => ({
        username: "mock-agent@example.com",
        instanceId: "mock-instance-id",
      }),
      getStatus: () => ({
        statusId: "mock-status-id",
      }),
      getState: () => ({
        type: "ROUTABLE",
      }),
      getAgentStates: () => [
        { type: "OFFLINE", name: "Offline" },
        { type: "AVAILABLE", name: "Available" },
      ],
      setState: (state: any, callbacks: any) => {
        console.log("Agent state changed:", state);
        callbacks.success();
      },
      onRefresh: (cb: () => void) => cb(),
    });
  },
  contact: (callback: (contact: any) => void) => {
    callback({
      onConnecting: (cb: () => void) => cb(),
      onConnected: (cb: () => void) => cb(),
      onEnded: (cb: () => void) => cb(),
      onDestroy: (cb: () => void) => cb(),
      getAttributes: () => ({
        serviceRequestNumber: { value: "12345" },
        subStatus: { value: "In Progress" },
        loginType: { value: "Admin" },
      }),
      contactId: "mock-contact-id",
    });
  },
  AgentStatusType: {
    OFFLINE: "OFFLINE",
  },
  AgentStateType: {
    OFFLINE: "OFFLINE",
  },
  EventType: {
    TERMINATE: "TERMINATE",
  },
  agentApp: {
    initApp: (appName: string, containerId: string, ccpUrl: string) => {
      console.log(
        `Mock agentApp.initApp called with: ${appName}, ${containerId}, ${ccpUrl}`
      );
    },
  },
};

// Use the real connect object if it exists, otherwise use mock
const connect =
  typeof window !== "undefined" && (window as any).connect
    ? (window as any).connect
    : mockConnect;

const CCPContainer: React.FC = () => {
  const [showMockup, setShowMockup] = useState(true);

  useEffect(() => {
    const initializeCCP = () => {
      const ccpContainer = document.getElementById("ccpContainer");
      if (ccpContainer && process.env.NEXT_PUBLIC_AC_INSTANCE_ALIAS) {
        const ccpURL = `https://${process.env.NEXT_PUBLIC_AC_INSTANCE_ALIAS}.my.connect.aws/ccp-v2/`;

        try {
          connect.core.initCCP(ccpContainer, {
            ccpUrl: ccpURL,
            loginPopup: true,
            loginPopupAutoClose: true,
            loginOptions: {
              autoClose: true,
              height: 600,
              width: 400,
              top: 0,
              left: 0,
            },
            region: "us-east-1",
            softphone: {
              allowFramedSoftphone: true,
              disableRingtone: false,
            },
            pageOptions: {
              enableAudioDeviceSettings: true,
              enablePhoneTypeSettings: true,
            },
          });
        } catch (error) {
          console.error("Error initializing CCP:", error);
        }

        connect.agent((agent: any) => {
          const userName: string = agent.getConfiguration().username;
          const agentUsernames = ["agent_username", "agent_username1", "agentUserName"];
          agentUsernames.forEach((id) => {
            const element = document.getElementById(id) as HTMLInputElement;
            if (element) {
              element.value = userName;
            }
          });
        });

        window.addEventListener("beforeunload", function (event) {
          updateState();
          fetch("https://mycompanydev.my.connect.aws/connect/logout", {
            credentials: "include",
            mode: "no-cors",
          })
            .then(() => {
              const eventBus = connect.core.getEventBus();
              eventBus.trigger(connect.EventType.TERMINATE);
            });
          fetch("https://mycompanydev.my.connect.aws/logout", {
            credentials: "include",
            mode: "no-cors",
          })
            .then(() => {
              const eventBus = connect.core.getEventBus();
              eventBus.trigger(connect.EventType.TERMINATE);
            });
          event.returnValue = `Are you sure you want to leave?`;
        });
        connect.agentApp.initApp("ccp", "container-div", ccpURL);

        connect.contact((contact: any) => {
          contact.onConnecting(() => {
            const currentContactId = contact.contactId;
            const contactAttributes = contact.getAttributes();
            const ccpIdElement = document.getElementById("ccpId") as HTMLInputElement;
            if (ccpIdElement) {
              ccpIdElement.value = currentContactId;
            }

            if (contactAttributes.serviceRequestNumber) {
              const ccpDetailsElement = document.getElementById("ccp-details");
              if (ccpDetailsElement) {
                ccpDetailsElement.style.display = "block";
                ccpDetailsElement.innerHTML = `Service Req No: ${contactAttributes.serviceRequestNumber.value}`;
              }
            }
            if (contactAttributes.subStatus) {
              const ccpDetails1Element = document.getElementById("ccp-details1");
              if (ccpDetails1Element) {
                ccpDetails1Element.style.display = "block";
                ccpDetails1Element.innerHTML = `SR sub Status: ${contactAttributes.subStatus.value}`;
              }
            }
            if (contactAttributes.loginType) {
              const ccpDetails2Element = document.getElementById("ccp-details2");
              if (ccpDetails2Element) {
                ccpDetails2Element.style.display = "block";
                ccpDetails2Element.innerHTML = `SR opted Type: ${contactAttributes.loginType.value}`;
              }
            }
          });

          contact.onDestroy(() => {
            const btnStartElement = document.getElementById("btnStart");
            if (btnStartElement) {
              btnStartElement.innerHTML = "Start";
            }
            const btnStopElement = document.getElementById("btnStop");
            if (btnStopElement) {
              btnStopElement.innerHTML = "Stop";
            }
            const btnResumeElement = document.getElementById("btnResume");
            if (btnResumeElement) {
              btnResumeElement.innerHTML = "Resume";
            }
            const btnPauseElement = document.getElementById("btnPause");
            if (btnPauseElement) {
              btnPauseElement.innerHTML = "Pause";
            }
            const ccpDetails1Element = document.getElementById("ccp-details1");
            if (ccpDetails1Element) {
              ccpDetails1Element.style.display = "none";
            }
            const ccpDetails2Element = document.getElementById("ccp-details2");
            if (ccpDetails2Element) {
              ccpDetails2Element.style.display = "none";
            }
            const ccpDetailsElement = document.getElementById("ccp-details");
            if (ccpDetailsElement) {
              ccpDetailsElement.style.display = "none";
            }
            const ccpDetailElement = document.getElementById("ccp-detail");
            if (ccpDetailElement) {
              ccpDetailElement.style.display = "none";
            }
            const ccpIdElement = document.getElementById("ccpId");
            if (ccpIdElement) {
              ccpIdElement.style.display = "none";
            }
          });
        });

        let mAgent: any;

        connect.agent((agent: any) => {
          mAgent = agent;
        });

        connect.contact(function (contact: any) {
          contact.onConnecting((contact: any) => {
            console.log("Inside onConnecting");
            const currentContactId = contact?.contactId;
            if (currentContactId) {
              const ccpIdElement = document.getElementById("ccpId") as HTMLInputElement;
              if (ccpIdElement) {
                ccpIdElement.value = currentContactId;
              }
            } else {
              console.error("Contact or contactId is undefined");
            }
            if (typeof contact?.getAttributes === "function") {
              const contactAttributes = contact.getAttributes();
              console.log("connect attributes is ", JSON.stringify(contactAttributes));

              if ("serviceRequestNumber" in contactAttributes) {
                console.log(
                  "service request number is ",
                  contactAttributes["serviceRequestNumber"]["value"]
                );
                const srNo = contactAttributes["serviceRequestNumber"]["value"];
                const ccpDetailsElement = document.getElementById("ccp-details");
                if (ccpDetailsElement) {
                  ccpDetailsElement.style.display = "block";
                  ccpDetailsElement.innerHTML = "Service Req No: " + srNo;
                }
              }
              if ("subStatus" in contactAttributes) {
                console.log("subStatus is ", contactAttributes["subStatus"]["value"]);
                const subStatus = contactAttributes["subStatus"]["value"];
                const ccpDetails1Element = document.getElementById("ccp-details1");
                if (ccpDetails1Element) {
                  ccpDetails1Element.style.display = "block";
                  ccpDetails1Element.innerHTML = "SR sub Status: " + subStatus;
                }
              }
              if ("loginType" in contactAttributes) {
                console.log("SR Type is ", contactAttributes["loginType"]["value"]);
                const loginType = contactAttributes["loginType"]["value"];
                const ccpDetails2Element = document.getElementById("ccp-details2");
                if (ccpDetails2Element) {
                  ccpDetails2Element.style.display = "block";
                  ccpDetails2Element.innerHTML = "SR opted Type: " + loginType;
                }
              }

              console.log(currentContactId);
            }
          });

          contact.onDestroy(() => {
            const btnStart = document.getElementById("btnStart");
            const btnStop = document.getElementById("btnStop");
            const btnResume = document.getElementById("btnResume");
            const btnPause = document.getElementById("btnPause");
            const ccpDetails1 = document.getElementById("ccp-details1");
            const ccpDetails2 = document.getElementById("ccp-details2");
            const ccpDetails = document.getElementById("ccp-details");
            const ccpDetail = document.getElementById("ccp-detail");
            const ccpId = document.getElementById("ccpId");

            if (btnStart) btnStart.innerHTML = "Start";
            if (btnStop) btnStop.innerHTML = "Stop";
            if (btnResume) btnResume.innerHTML = "Resume";
            if (btnPause) btnPause.innerHTML = "Pause";
            if (ccpDetails1) ccpDetails1.style.display = "none";
            if (ccpDetails2) ccpDetails2.style.display = "none";
            if (ccpDetails) ccpDetails.style.display = "none";
            if (ccpDetail) ccpDetail.style.display = "none";
            if (ccpId) ccpId.style.display = "none";
          });

          contact.onConnected((contact: any) => {
            startTranscription(contact);
          });

          contact.onEnded((contact: any) => {
            stopTranscription();
          });
        });

        connect.agent((agent: any) => {
          agent.onRefresh(agentRefresh);
        });

        connect.agentApp?.initApp("ccp", "container-div", ccpURL);
      } else {
        console.error("CCP container not found or instance alias not set");
      }
    };

    let transcriptionStream: WebSocket | null = null;

    function updateState() {
      console.log("State updated");
    }

    function startTranscription(contact: any) {
      const transcriptionContainer = document.getElementById("transcriptionContainer") as HTMLElement;
      if (transcriptionContainer) {
        transcriptionContainer.innerHTML = ""; // Clear previous transcriptions
      }

      transcriptionStream = new WebSocket("wss://transcription-websocket-url"); // Replace with actual WebSocket URL

      transcriptionStream.onmessage = function (event) {
        const message = JSON.parse(event.data);
        const transcript = message.Transcript;
        const transcriptElement = document.createElement("p");
        transcriptElement.textContent = transcript;
        if (transcriptionContainer) {
          transcriptionContainer.appendChild(transcriptElement);
        }
      };

      transcriptionStream.onopen = function () {
        console.log("Transcription stream opened");
      };

      transcriptionStream.onclose = function () {
        console.log("Transcription stream closed");
      };

      transcriptionStream.onerror = function (error) {
        console.error("Transcription stream error:", error);
      };
    }

    function stopTranscription() {
      if (transcriptionStream) {
        transcriptionStream.close();
        transcriptionStream = null;
      }
    }

    initializeCCP();

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const agentRefresh = (agent: any) => {
    const userName = agent?.getConfiguration().username;
    const agentUsernames = ["agent_username", "agent_username1", "agentUserName"];
    agentUsernames.forEach((id) => {
      const element = document.getElementById(id) as HTMLInputElement;
      if (element) {
        element.value = userName;
      }
    });
  };

  return (
    <div className="ccp-container" style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={showMockup}
            onChange={() => setShowMockup((v) => !v)}
            style={{ marginRight: 4 }}
          />
          Show CCP Mockup (This is for demo purposes only)
        </label>
      </div>
      {showMockup ? (
        <img
          src="./mockup/ccp-mockup.png"
          alt="CCP Mockup"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: 8,
          }}
        />
      ) : (
        <div id="ccpContainer" style={{ width: "100%", height: "100%" }} />
      )}
    </div>
  );
};

export default CCPContainer;


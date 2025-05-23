import React, { useEffect } from 'react';

const Navbar = () => {
    let mAgent: any;
    let userName = ""; // Globally defined userName
    let instanceId = "373e6abb-640e-47b2-908a-87da4cab3acb"; // Placeholder, replace with actual value
    let agentStatusId = "STRING_VALUE"; // Placeholder, replace with actual value
    let description = "STRING_VALUE"; // Placeholder, replace with actual value
    let state = "ENABLED"; // Placeholder, replace with actual value
    let displayOrder = 1; // Placeholder, replace with actual value
    let resetOrderNumber = false; // Placeholder, replace with actual value

    useEffect(() => {
        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("unload", handleUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("unload", handleUnload);
        };
    }, []);

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        const confirmationMessage = "Are you sure you want to logout?";
        event.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
        return confirmationMessage; // Gecko, WebKit, Chrome <34
    };

    const handleUnload = () => {
        if (confirm("Are you sure you want to logout?")) {
            const logoutDetails = {
                InstanceId: instanceId || "373e6abb-640e-47b2-908a-87da4cab3acb",
                AgentStatusId: agentStatusId,
                Name: userName, // Use globally defined userName
                Description: description,
                State: state,
                DisplayOrder: displayOrder,
                ResetOrderNumber: resetOrderNumber
            };

            fetch("https://qcw5zjy0pi.execute-api.us-west-2.amazonaws.com/dev/mycompany-dev-setagentLogOut", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(logoutDetails)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert("Logged out successfully!");
                // Redirect to login page or perform other actions
            })
            .catch(error => {
                console.error("Error logging out:", error);
                alert("Failed to logout. Please try again.");
            });
        }
    };

    const handleLogoutButtonClick = () => {
        if (confirm("Are you sure you want to logout?")) {
            const agent = new connect.Agent();
            if (agent.getState().type === connect.AgentStateType.OFFLINE) {
                logoutComplete();
            } else {
                setAgentOffline()
                    .then(logoutComplete)
                    .catch(console.error);
            }
        }
    };

    const setAgentOffline = () => {
        return new Promise<void>((resolve, reject) => {
            const agent = new connect.Agent();
            const offlineState = agent.getAgentStates().find(
                (state: any) => state.type === connect.AgentStateType.OFFLINE,
            );
            if (offlineState) {
                agent.setState(offlineState, {
                    success: () => resolve(),
                    failure: (error: any) => reject(error),
                }, { enqueueNextState: true });
            } else {
                reject(new Error("Offline state not found"));
            }
        });
    };

    const logoutComplete = () => {
        const logoutEndpoint = "https://mycompanydev.my.connect.aws/logout";
        fetch(logoutEndpoint, { credentials: 'include', mode: 'no-cors'})
            .then(() => {
                // Notify all CCPs to terminate
                connect.core.terminate();
                // Disconnect CCP
                const ccpContainer = document.getElementById("ccpContainer");
                if (ccpContainer) {
                    ccpContainer.innerHTML = "";
                }
                // Show confirmation message
                if (confirm("CCP has been disconnected. Now You can close the browser tab or window.")) {
                    window.close();
                }
            });
    };

    return (
        <nav className="navbar navbar-light">
            <div className="container-fluid">
                <span className="navbar-brand h1"><b>mycompany E911 CCP (Contact Center Panel)</b></span>
                <button className="btn btn-danger btn-lg" onClick={handleLogoutButtonClick}><b>Logout</b></button>
            </div>
        </nav>
    );
};

export default Navbar;


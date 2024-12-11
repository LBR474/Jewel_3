import { useEffect } from "react";
import App_8 from "./App_8";
import "./App.css";

const App = () => {
  useEffect(() => {
    const leftDiv = document.querySelector(".leftDiv") as HTMLElement | null;
    const announcement = document.querySelector(
      ".announcement"
    ) as HTMLElement | null;

    if (!leftDiv || !announcement) return;

    function showAnnouncementOnce() {
      console.log("Function called");
      announcement!.style.display = "block";

      // Hide the announcement after a short delay (optional)
      setTimeout(() => {
        announcement!.style.display = "none";
      }, 1000);

      // Remove the event listener so it only shows once per page load
      leftDiv!.removeEventListener("pointerenter", showAnnouncementOnce);
    }

    // Add the event listener
    leftDiv.addEventListener("pointerenter", showAnnouncementOnce);

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      leftDiv.removeEventListener("pointerenter", showAnnouncementOnce);
    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <img src={"./images/JE_header_image_2.png"} alt="Header" />
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="leftDiv">
          <div className="announcement">Click to scroll ring</div>
          <App_8 />
        </div>

        <div className="rightDiv">
          <img src={"./images/right_div_image_info.png"} alt="Right Div" />
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <img src={"/images/Footer_top_1.png"} alt="Footer Top" />
        <img src={"/images/Sub_footer_image_1.png"} alt="Sub Footer" />
      </footer>
    </div>
  );
};

export default App;

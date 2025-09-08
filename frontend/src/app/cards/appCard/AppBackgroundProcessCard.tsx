import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppBackdropCard from "./AppBackdropCard";
import AppBackgroundCanvasCard from "./AppBackgroundCanvasCard";

/**
 * A React component that is processing logic behind the scene.
 * The main purpose of this component is to run once. Even if the sub components are
 * called due to selectors or change of use states, only the sub components will be rerendered,
 * and not the main part or any other part of the application.
 */
const AppBackgroundProcessCard = () => {
  return (
    <>
      <AppBackdropCard />
      <AppBackgroundCanvasCard />
      <ToastContainer
        position="bottom-right"
        autoClose={8000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={false}
        theme={"light"}
      />
    </>
  );
};

export default AppBackgroundProcessCard;

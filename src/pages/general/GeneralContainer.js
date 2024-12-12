import GeneralEvent from "./event/GeneralEvent";
import GeneralBoard from "./board/GeneralBoard";
import '../MainPage.css';
const GeneralContainer = () => {
    return(
        <div className="general-container">
            <GeneralBoard/>
            <GeneralEvent/>
        </div>
    );
}
export default GeneralContainer;
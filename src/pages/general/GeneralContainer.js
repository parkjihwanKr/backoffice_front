import GeneralEvent from "./event/GeneralEvent";
import GeneralBoard from "./board/GeneralBoard";
import '../shared/MainPage.css';
const GeneralContainer = ({data}) => {
    const {boards, events} = data;
    return(
        <div className="general-container">
            <GeneralBoard
                boards = {boards}/>
            <GeneralEvent
                events = {events}/>
        </div>
    );
}
export default GeneralContainer;
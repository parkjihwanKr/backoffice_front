/*PersonalScheduleFooter.js*/
import { imagePrefix } from '../../../../utils/Constant';
import './PersonalScheduleFooter.css';
const PersonalScheduleFooter = () => {
    return(
        <div className="personal-schedule-footer">
            <img src={`${imagePrefix}/shared/create_vacation_schedule.png`}/>
        </div>
    )
}
export default PersonalScheduleFooter;
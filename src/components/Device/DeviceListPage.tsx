import { Link } from "react-router-dom";
import { RouterPathEnum } from "../../enums/RouterPathEnum";

const DeviceListPage = ({ history }: any) => {
    return (
        <div>
            <div>DeviceListPage</div>
            <Link to={RouterPathEnum.HOME}>HOME</Link>
        </div>
    );
};

export default DeviceListPage;

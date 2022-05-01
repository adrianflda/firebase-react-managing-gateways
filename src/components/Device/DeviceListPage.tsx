import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const DeviceListPage = ({ history }: any) => {
    return (
        <div>
            <div>DeviceListPage</div>
            <Link to={ROUTES.HOME.staticRoute}>HOME</Link>
        </div>
    );
};

export default DeviceListPage;

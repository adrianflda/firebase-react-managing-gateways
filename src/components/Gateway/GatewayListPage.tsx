import { Link } from "react-router-dom";
import { RouterPathEnum } from "../../enums/RouterPathEnum";

const GatewayListPage = ({ history }: any) => {
    return (
        <div>
            <div>GatewayListPage</div>
            <Link to={RouterPathEnum.HOME}>HOME</Link>
        </div >
    );
};

export default GatewayListPage;
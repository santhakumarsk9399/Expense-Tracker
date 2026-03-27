import "../../../components/Css/Dashboard/statcard.css";

const StatCard = ({ title, value, change, icon: Icon }) => {
    return (
        <div className="stat-card">
            <div className="card-top">
                <div className="icon-box">
                    <Icon />
                </div>
                <span>{title}</span>
            </div>

            <div className="card-bottom">
                <h2>{value}</h2>
                {change && <span className="badge">{change}</span>}
            </div>
        </div>
    );
};

export default StatCard;
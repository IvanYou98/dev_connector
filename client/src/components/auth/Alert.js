import React from 'react';
import {connect} from "react-redux";

const Alert = ({alerts}) => alerts != null && alerts.length > 0 && (
    <section className='container'>
        {alerts.map(alert =>
            (<div key={alert.id} className={`alert alert-${alert.alertType}`}>
                {alert.msg}
            </div>)
        )}
    </section>
)


const mapStateToProps = state => ({
    alerts: state.alert
})


export default connect(mapStateToProps, null)(Alert);
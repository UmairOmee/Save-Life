import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import DashboardSidebar from './dashboardSidebar'

class MyAccount extends React.Component{
    render(){
        const {user} = this.props;
        return(
            <DashboardSidebar>
            
            <div style={{display: "flex", justifyContent: "center"}}>
                <h1 className="display-4 text-center">Welcome to Dashboard</h1>
            </div>
            </DashboardSidebar>
        )
}
}

const mapStateToProps = (state) => ({
    user: state.user
    
})

export default connect(mapStateToProps)(MyAccount);
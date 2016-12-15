import React from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import checkStatus from '../util.js';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class Gateways extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 0,
            pageSize: 10
        };

        this.handlePageChange = (event, index, value) => this.setState({ page: value });
        this.handlePageSizeChange = (event, index, value) => this.setState({ pageSize: value });
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props)
    }

    componentWillReceiveProps() {
        // Empty current data
        this.state.data = [];

        // Fetch new data
        fetch("/api/gateways/cached")
            .then(checkStatus)
            .then(res => res.json())
            .then(res => this.setState({ data: res }))
            .catch(err => this.setState({ err: err }))
    }

    render () {
        return (
            <div>
                <AppBar title="Gateways" />
                <div className="content">
                    <Card>
                        <CardTitle title="Gateway Inventory" subtitle="Test" />
                        <CardText>
                            {(this.state.data.length > 0) ?
                                <Table selectable={false}>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHeaderColumn>Name</TableHeaderColumn>
                                            <TableHeaderColumn>IMSI</TableHeaderColumn>
                                            <TableHeaderColumn>Type</TableHeaderColumn>
                                            <TableHeaderColumn>Last seen</TableHeaderColumn>
                                            <TableHeaderColumn># sensors</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {this.state.data.map(gw =>
                                            <TableRow>
                                                <TableRowColumn>{gw.name}</TableRowColumn>
                                                <TableRowColumn>{gw.externalId}</TableRowColumn>
                                                <TableRowColumn>{gw.dataCollectorTypeName}</TableRowColumn>
                                                <TableRowColumn>{gw.lastSeen || <em>Never</em>}</TableRowColumn>
                                                <TableRowColumn>{gw.nbrOfSensorCollections}</TableRowColumn>
                                            </TableRow>)}
                                    </TableBody>
                                </Table>
                                :
                                <div>
                                    <div className="loading">
                                        <i className="fa fa-4x fa-spin fa-cog" />
                                    </div>
                                    <ListItem disabled={true} primaryText="Loading gateways" />
                                </div>
                            }
                            {(typeof this.state.err !== "undefined") ? JSON.stringify(this.state.err) : false}
                        </CardText>
                        <CardActions>
                            <DropDownMenu value={this.state.page} label="Page" onChange={this.handlePageChange}>
                                <MenuItem value={0} primaryText="0" />
                                <MenuItem value={1} primaryText="0" />
                                <MenuItem value={2} primaryText="0" />
                            </DropDownMenu>
                            <DropDownMenu value={this.state.pageSize} label="Page Size" onChange={this.handlePageSizeChange}>
                                <MenuItem value={10} primaryText="10" />
                                <MenuItem value={50} primaryText="50" />
                                <MenuItem value={100} primaryText="100" />
                                <MenuItem value={500} primaryText="500" />
                                <MenuItem value={1000} primaryText="1000" />
                            </DropDownMenu>
                        </CardActions>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Gateways;
import React from 'react';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import fuzzes from '../Fuzzyfile';
import Fuse from 'fuse.js';

const fuseOptions = {
    keys: ['key']
}

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: "",
            results: [],
            fuse: new Fuse(fuzzes.fuzzes, fuseOptions)
        }

        fetch('/Fuzzyfile')
           .then(res => {
                if(res.statusCode == 200) res.json()
                else throw new Error("Missing Fuzzyfile!")
            }).then(res => {
                if(res.fuzzes.length)
                    this.setState({
                        fuse: new Fuse(fuzzes.fuzzes.concat(res.fuzzes), fuseOptions)
                    })
            })

        this.handleOpen = this.handleOpen.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
    }

    handleOpen() {
        this.textField.focus();
        this.setState({results: this.state.fuse.list});
    }

    componentDidMount() {
        this.handleOpen()
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.drawerOpen) this.handleOpen();
    }

    handleChange(event) {
        const results = this.state.fuse.search(event.target.value);
        this.setState({results})
        //focus of first result
    }

    handleKeyUp(event) {
        //if arrow keys or tab navigate list
        //if enter follow focused result
    }

    render() {
        this.props.drawerOpen
        return (
            <div>
                <TextField
                    hintText="Sök på Datasektionen..."
                    ref={field => this.textField = field}
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyUp}
                    fullWidth={true} />
                <List children={
                    this.state.results.map(({href, color, name}) =>
                        <ListItem primaryText={name}
                                  leftAvatar={<Avatar backgroundColor={color} />}
                                  onClick={() => location.href = href} />)
                } />
            </div>
        )
    }
}

export default Search;

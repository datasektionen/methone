import React from 'react';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import fuzzes from '../fuzzyfile';
import Fuse from 'fuse.js';

const fuseOptions = {
    keys: ['str']
}

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            active: 0,
            fuse: new Fuse(fuzzes.fuzzes, fuseOptions)
        }

        fetch('/fuzzyfile', {
            credentials: 'same-origin'
        }).then(res => {
                if(res.ok) return res.json();
                else throw res;
            }).then(json => {
                if(json.fuzzes.length) this.setState({
                    fuse: new Fuse(fuzzes.fuzzes.concat(json.fuzzes), fuseOptions)
                })
                this.handleOpen();
            }).catch(res => {
                console.warn("Methone can't find a fuzzyfile for this system! Response was:", res);
            });

        this.handleOpen = this.handleOpen.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    focusActive(newActive) {
        this.state.results.forEach(({ref}, index) => {
            if(index === newActive)
                ref.setState({hovered: true});
            else
                ref.setState({hovered: false});
        })
    }

    handleOpen() {
        this.textField.focus();
        this.setState({results: this.props.isMobile ? [] : this.state.fuse.list, active: 0});
        this.focusActive(0);
    }

    componentDidMount() {
        this.handleOpen();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.drawerOpen) this.handleOpen();
    }

    handleChange(event) {
        const results = this.state.fuse.search(event.target.value);
        this.setState({results, active: 0});
        setTimeout(() => this.focusActive(0), 50);
    }

    handleKeyDown(event) {
        if(event.keyCode === 9 || event.keyCode === 40) {//tab or down 
            const newActive = (this.state.active + 1) % this.state.results.length;
            this.setState({active: newActive});
            this.focusActive(newActive);
            event.preventDefault();
            event.stopPropagation();
        }
        else if(event.keyCode === 38) { // up
            const newActive = (this.state.results.length + this.state.active - 1) % this.state.results.length;
            this.setState({active: newActive});
            this.focusActive(newActive);
            event.preventDefault();
            event.stopPropagation();
        }
        else if(event.keyCode === 13) { // enter
            location.href = this.state.results[this.state.active].href;
        }
    }

    render() {
        return (
            <div>
                <TextField
                    hintText="Sök på Datasektionen..."
                    ref={field => this.textField = field}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    fullWidth={true}
                    inputStyle={{paddingLeft: "16px"}}
                    hintStyle={{paddingLeft: "16px"}}
                />
                <Subheader>
                    {this.state.results.length} result{this.state.results.length != 1 ? "s" : false }
                </Subheader>
                <List children={
                    this.state.results.map((result, index) =>
                        <ListItem key={result.name}
                                  leftAvatar={result.color ? <Avatar backgroundColor={result.color} /> : undefined}
                                  onMouseEnter={() => this.setState({active: index})}
                                  onKeyboardFocus={() => this.setState({active: index})}
                                  ref={ref => result.ref = ref}
                                  onTouchTap={() => location.href = result.href} 
                                  primaryText={result.name} />)
                } />
            </div>
        )
    }
}

export default Search;

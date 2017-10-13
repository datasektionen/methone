import React from 'react';

import List, { ListItem, ListItemAvatar, ListItemText, ListSubheader } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

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
        }

        this.fuse = new Fuse(this.props.fuzzes, fuseOptions);

        this.resetState = this.resetState.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    resetState() {
        this.setState({results: this.props.isMobile ? [] : this.fuse.list, active: 0});
    }

    componentDidMount() {
        this.resetState();
    }

    handleChange(event) {
        const results = this.fuse.search(event.target.value);
        this.setState({results, active: 0});
    }

    handleKeyDown(event) {
        const { active, results } = this.state
        if(event.keyCode === 9 || event.keyCode === 40) { //tab or down
            const newActive = (active + 1) % results.length;
            this.setState({active: newActive});
            event.preventDefault();
            event.stopPropagation();
        }
        else if(event.keyCode === 38) { // up
            const newActive = (results.length + active - 1) % results.length;
            this.setState({active: newActive});
            event.preventDefault();
            event.stopPropagation();
        }
        else if(event.keyCode === 13) { // enter
            window.location.href = results[active].href;
        }
    }

    render() {
        const { results } = this.state
        return (
            <div>
                <input
                    placeholder="Sök på Datasektionen..."
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    ref={input => input && input.focus()}
                    style={{width: '100%', padding: '15px'}} />
                {results.length ? (
                <List subheader={
                    <ListSubheader>
                        {results.length} result{results.length !== 1 ? "s" : false }
                    </ListSubheader>} >

                    {results.map((result, index) =>
                        <ListItem button
                                  key={result.str}
                                  tabIndex={index}
                                  onMouseEnter={() => this.setState({active: index})}
                                  onKeyboardFocus={() => this.setState({active: index})}
                                  style={this.state.active === index ? {backgroundColor: 'rgba(0, 0, 0, 0.12)'} : {}}
                                  onClick={() => window.location.href = result.href} >
                            <ListItemAvatar>
                            {result.image ?
                                <div style={{
                                    background: 'url(' + result.image + ')',
                                    borderRadius: '20px',
                                    backgroundSize: 'cover',
                                    height: '40px',
                                    width: '40px'}} >
                                </div>
                                : result.color ?
                                    <Avatar style={{backgroundColor:result.color}} />
                                    : undefined
                            }
                            </ListItemAvatar>
                            <ListItemText primary={result.name} />
                        </ListItem>)
                    }
                </List>
                ) : false }
            </div>
        )
    }
}

export default Search;

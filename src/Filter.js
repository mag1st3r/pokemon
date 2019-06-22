import React from "react";

class Filter extends React.Component {


    render() {
        return (
            <input type="text"
                   placeholder='Pikachu...'
                   onChange={ (e)=> {this.props.filter(e.target.value)}}
            />
        )
    }

}

export default Filter;
import React, {Component, Fragment} from 'react';

class Pagination extends React.Component {

    render() {
        const { totalRecords, pageLimit } = this.props;
        const paginationLength = new Array(Math.ceil(totalRecords / pageLimit)).fill(0);
        const paginationList = paginationLength.map( (item, index) =>
            <li key={index}>
                <button
                    onClick={ () => {this.props.onPageChanged(index + 1)}}
                >
                    {index + 1}
                </button>
            </li>
        );
        return (
            <Fragment>
                <nav>
                    <ul style={ {display: 'flex', listStyleType: "none"}}>
                        {paginationList}
                    </ul>
                </nav>
            </Fragment>
        )
    }
}

export default Pagination;
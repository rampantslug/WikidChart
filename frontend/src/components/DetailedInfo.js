import React from 'react';

const DetailedInfo  = ({ rowData }) => {
    return (
        <div className='.detailed-info'>
            <p>{rowData.mark}</p>
            <p>{rowData.athlete}</p>
            <p>{rowData.date}</p>
            <p>{rowData.venue}</p>
        </div>
    )
}

export default DetailedInfo

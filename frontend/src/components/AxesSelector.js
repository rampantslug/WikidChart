import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import Button from './Button';
import { useState, useEffect } from 'react';

const AxesSelector = ({tableHeaders, onAxesSelected }) => {
    const [headers, setHeaders] = useState([])


    const setXaxis = (e) => {

        // TODO: set  Local state of x

        // TODO: Confirm that the axes are not the same and there are 2 selected

        // Return axes indexes in setHeaders

    };

    const setYaxis = (e) => {

        // TODO: set  Local state of x

        // TODO: Confirm that the axes are not the same and there are 2 selected

        // Return axes indexes in setHeaders

    };


    return (
        <div>
            <h3>Axes selection goes here!</h3>
            <div>
                <DropdownButton id="x-axis-dropdown" title="x - axis" onSelect={(e) => setXaxis(e.target.value)} children={['tableHeaders', 'somebullshit','blah']} />
                <DropdownButton id="y-axis-dropdown" title="y - axis" onSelect={(e) => setYaxis(e.target.value)} children={tableHeaders} />
            </div>

        </div>
    )
}

export default AxesSelector

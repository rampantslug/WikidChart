import React from 'react';
import Button from './Button';
import { useState } from 'react';

const PageSelector = ({ onGetTable }) => {

    const [wikiUrl, setWikiUrl] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (!wikiUrl) {
            alert('Please add a wikipedia URL');
        }

        onGetTable({ wikiUrl });
    };

    const onSampleTable = () => {

        const sampleUrl = 'https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression';


        // put it in textbox 
        setWikiUrl(sampleUrl);
        onGetTable({sampleUrl});
    };

    return (
        <div>
            <div className='form-control'>
                <input
                    type='text'
                    placeholder='Wikipedia article URL'
                    value={wikiUrl}
                    onChange={(e) => setWikiUrl(e.target.value)}
                />
                <Button color='green' text='Get table' onClick={onSubmit} />
            </div>
            <Button text='Sample table' onClick={onSampleTable} />
        </div>
    )
}

export default PageSelector

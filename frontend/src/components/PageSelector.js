import React from 'react';
import Button from './Button';
import { useState } from 'react';

const PageSelector = ({onGetTable}) => {

    const [wikiUrl, setWikiUrl] = useState('');

    const onSubmit = (e) => { 
        e.preventDefault();
        if(!wikiUrl)
        {
            alert('Please add a wikipedia URL');
        }

        onGetTable({wikiUrl});
    };

    const onRandomTable = async () => { 

        // Get some random URL
             const url = "https://en.wikipedia.org/w/api.php?" +
        new URLSearchParams({
            origin: "*",
            action: "query",
            generator: "random",
            format: "json",
        });
    
    try {

        console.log('url', url);
        const req = await fetch(url);
        const data = await req.json();
        var json = JSON.parse(data);
        console.log('json', json);

        var title = json.parse.title;
        console.log('Title', title);

        // put it in textbox 
        setWikiUrl(title);
        onGetTable({wikiUrl});

    } catch (e) {
        console.error(e);
    } 

        
    };

    return (
        <div>
           {/*  <form className='add-form' onSubmit={onSubmit}> */}
                <div className='form-control'>
                    <input
                        type='text'
                        placeholder='Wikipedia article URL'
                        value={wikiUrl}
                        onChange={(e) => setWikiUrl(e.target.value)}
                    />
                    <Button color='green' text='Get table' onClick={onSubmit}/>                    
                </div>
                {/* <input type='submit' value='Get table' className='btn btn-block' /> */}

                  
                
            {/* </form> */}

           {/*  <Button text='Random table' onClick={onRandomTable} /> */}
        </div>
    )
}

export default PageSelector


# Coding Exercise for Muso

The task:  
•	Write a program to display charts from data found in Wikipedia tables
•	The program should accept a URL and then display the chart of that data
•	The front end should be in a browser in React JS
•	The backend should be in Node JS 
•	The input is any Wikipedia URL, e.g.,
•	https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression
•	The back end should access the page at the URL, 
•	scan the page for a table with numbers
•	find one or more numeric columns
•	return the data back to the front end for display
•	The front end should turn the data into a chart and show it to the user
Additional notes:
•	Keep your solutions simple. No need to spend more than a couple of hours on it
•	Make any assumptions you feel necessary to deliver value and document them
•	We are interested in your holistic approach to development, not just the code
•	Please add one wow feature of your choice to impress your users



## Installation and running
(requires Node to be installed)

Within the `fronted` folder:
### `npm install` 

Within the `backend` folder:
### `npm install` 

This will install all required modules.

Then also in the `backend` folder:
### `npm run dev` 

to launch both frontend and backend in development mode.


Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Click `Sample table` or enter a Wikipedia URL and click `Get table`


**Notes about application**

The URL gets sent to the backend but unfortunately it isnt able to correctly parse the retrieved page. Instead it will serve up some sample data to the frontend.
Ideally the should be unit tests but that is another thing I would have had to learn in this time frame.
The input URL is only checked to ensure it is text, this would normally have better validation and feedback to the user.
Once the sample data is returned to the frontend the user then gets to pick which columns to use for the x and y axes of the chart. I had trouble pulling this data out of the table and assigning it to the drop downs.
The chart would then get displayed, due to the drop downs not working correctly we are just showing the chart and the detailed info at the same time.
The detailed info would update when the user clicks on a column in the chart to show all the data in that row of the table (all of that data is not visible on the chart).
Styling could do with some work.
Additional comments and decisions covered in the code.


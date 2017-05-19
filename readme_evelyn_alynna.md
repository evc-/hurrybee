//read me 

Hurrybee is an app created by Alynna Alcira and Evelyn Cranston in BCIT's D3 program in 2017. This project is the final assignment for COMP 2130, MDIA 2109, and MDIA 2106. 

Hurrybee is designed to help keep users on track during their morning routines, and ensure they accomplish everything they want to each morning. 

Landing Page

We used Bootstrap's framework to build the landing page. 
A JQuery library called Unslider was used to display the instructions. 

Form Page 

The form allows users to set up a custom morning routine. If it is their first visit to the site, a list of recommended activities and suggested times will populate the list. If they have a custom list stored in the localstorage, that list will dispaly. 

A user can drag and drop to re-order the activities based on the order they want to complete them in. This generates an ordered array of activity objects with names, times, and picture properties. A JS library called Sortable was used for this list. 

Users can also adjust the times allotted for each activitity, or delete them off the list. 

There is a field for user's to enter in their own custom activities. It asks for a name, which will be used later as a label, and a time. 

The app generates an estimated time that the user will take to accomplish their morning routine, and displays the estimated finsh time based on the current time. 
 
A user can choose to toggle audio warnings at 10 seconds and 0 seconds remaining. Their preference will be stored. 

Once a user clicks the go button, their custom, ordered list of activities will be saved to local storage. 

Game Page 

Once the game loads, a user is meant to begin their morning tasks. When they have completed the task, they should click "completed". If they decided to skip the activity, they should click "skip". Clicking either skip or complete adds the activity name to a respective array for later use. It also runs functions to stop the timer, save the time for the footer information, load the next scene and advance the game. 

The game scenes generate and load based on the order of the array of objects saved from the form page. 

A label and corresponding icon show up in the top left. The right side of the page holds the skip and continue buttons, as well as a timer. The timer will count down from the specified time. When it reaches 10 seconds remaining, an audio alert will play (if the user has enabled audio), and another will play when the time is up. If the user has not clicked skip or continue by this time, the timer will turn black and begin adding time. 

The footer contains notes on the user's progress, either based on the activity, or their overall morning. This should hopefully allow the user to make smart choices about their time allotment in the morning. 

The label uses the activity object's name property, the animated scene uses the pic to find an index in an array of SVGs, and the time property sets the countdown timer. 

Subtle animations also enhance the appearance of the game. 

Challenges Page 

Once a user has either skipped or completed all of their activities, they are brought to a challenges page. The header will tell them how much ahead or behind schedule their are, in order to give the user a clear idea of how many challenges they have time for. 

To unlock a challenge, the user clicks an icon. That brings up an overlay box that contains optional activities that can improve the user's health and well-being. A user can either complete, or skip the challenge. If completed, the icon is unlocked, and the challenge name is added to an array for later use. 

When a user has completed as many challenges as they want, they can continue to the results page. 

Results Page 

The most prominent header shows how the user's entire morning routine took. Time spent on the challenges page does not add to this total. 

The page also shows a list of completed and skipped activities. The completed activities also indicate how much ahead or behind schedule they were completed as compared to the time estimate provided in the form. This will hopefully allow the user to take note of their most and least efficient activities, so they can improve the next days. 

There is also a a progress bar to show how many challenges were collected that day, and a way to clear the user's stored data. 
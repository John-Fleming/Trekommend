# Trekommend

## Description

Have you ever been looking for a recommendation on TripAdvisor for an upcoming trip, only to discover that one of the top rated actvities for the city is the local mall? Trekommend aims to provide users with a better trip plannaing experience by allowing them to follow other users and curate trip recommendations from people they can trust. 

After logging in with their Google account, Trekommend users are able to create collections of trips they have taken or are planning to take and save recommended activities, restaurants, landmarks, or events for those trips. When creating a recommendation, users can provide a full review and rating for the recommendation or simply provide a name and brief description for a planned trip. Beyond personal tracking, users can also discover and follow other users, view their trips and recommendations, and save their favorites to trips they are planning. 

This application was built as my final back end capstone project for Nashville Software School. Primary technologies used were C# and .Net Core for the back end connected to a SQL database using Dapper ORM and a front end user interface built with React.

## Screenshots
### Home Page
![home page](trekommend.ui\screenshots\home_page.png)
### User Profile Page
After logging in and navigating to their profile page, users will see statistics about the trips they have created, follow counts, and a feed of their most recent recommendations added to the app. Users can navigate to specific recommendations, view all trips by click the trip count, view the users they are following and who is following them, and can access several user actions from the hamburger icon, such as logging out and discovering new users to follow.

![profile page](trekommend.ui\screenshots\trek_profile_page.png)

When clicking on the followers counts on the profile page, a modal will display a list of users.

![users modal](trekommend.ui\screenshots\followers_modal.png)

### Discover Page
From the nav bar, users can view a discover page where they can see recent trips and recommendations posted by users they follow. Functionality of this page will be expanded in the future to include more filtering options and keyword search.

![discover page](trekommend.ui\screenshots\discover_feed.png)

### User trips and recommendations
From the navbar or from the user profile, users can view a page dedicated to the trips they have created. Clicking on an individual trip will navigate the user to a dedicated recommendations page associate with that trip, and in turn on to a single recommendation page view. These same pages can be accessed for other users and buttons will be conditionally rendered on screen that allow a user to add trips or recommendations depending on whether the page is associated with the authenticated user. 

#### Trips Page
![trips page](trekommend.ui\screenshots\trips_page.png)
#### Add Trip Form
![add trip form](trekommend.ui\screenshots\add_trip_form.png)
#### Recommendations Page
![recs page](trekommend.ui\screenshots\recommendations_page.png)
#### Add a Recommendations Form
![add rec form](trekommend.ui\screenshots\add_rec_form.png)
#### Single Recommendations Page
![single rec page](trekommend.ui\screenshots\single_rec_page.png)
#### Other User Profile Page
Actions available to the user will change when viewing another user's profile

![other user profile page](trekommend.ui\screenshots\other_user_profile.png)

#### Save Another User's Recommendation
When viewing another user's recommendation, a save button will be available that triggers a form for the user to add it to one of their planned trips.

![save rec form](trekommend.ui\screenshots\save_user_rec_form.png)


## Live App
Deployed link coming soon!

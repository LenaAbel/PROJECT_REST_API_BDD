# CREATING A REST-API USING NODEJS AND POSTGRESQL🔨

## WHAT IS THIS PROJECT ?
&nbsp;&nbsp;In this project, the goal is to extend the PROJECT_REST_API GitHub project.

### TASK TO DO:
- 🚀 Create a PostgreSQL database from the *prize.json* file
- ✨ 15 features about the laureates, prizes, categories, years...

### DATABASE: prize.json
&nbsp;&nbsp;The database to use in this project is a JSON file that contains information on Nobel Prizes and Nobel Laureates. The file name is **prize.json**. This JSON file contains a "prizes" array with 664 objects. Each object contains the year, the
prize category, and the winners stored inside a "laureates" array.
  
### REST API FEATURES
*The API must provide the following functionality:*
- **F1**: List all winners (id, first name, last name).
- **F2**: Given an identifier, display the winner's information with this identifier (first name, last name, prizes won).
  - Ex: ID = 6
  - Marie Curie
  - 1911 chemistry in recognition of her services to the…
  - 1903 physics in recognition of the extraordinary services…
- **F3**: How many have won more than one Nobel Prize?
  - (first name, last name, number of prizes won)
  - Eg: Marie Curie, 2
- **F4**: List all Nobel Prize categories
  - Chemistry, economics, etc.
- **F5**: Determine which category produced the highest number of Nobel laureates.
- **F6**: For each year, indicate how many winners had won a Nobel Prize.
  - Ex: 2021, 13
- **F7**: Display all years in which no Nobel Prize was awarded been awarded.
- **F8**: Show all nobel prize years sorted by number of laureates ascending/descending.
  - ?sort=asc_laureates ⇒ ascending ⇒ start with years with the smallest number of winners
  - ?sort=desc_laureates ⇒ descending ⇒ start with years with the most winners
    - Exclude years when no Nobel Prize was awarded
- **F9**: Delete a winner with a given identifier.
- **F10**: Update the motivation of a winner with a given identifier in a given year and a given category.

**What will change in here is that the services will read now data from a PostgreSQL database instead of a JSON file. The data sent to Controllers by the Services will generally not change.**
 


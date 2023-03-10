
# Blogging application - ECE Webtech project

*presentation, introduction, ...*

## Production 

- Vercel URL: https://...
- Supabase project URL: https://app.supabase.com/project/...

## Usage

*how to start and use the application, run the tests, ...*

* Clone this repository, from your local machine:
  ```
  git clone ...
  cd ...
  ```
* Start the the application
  ```bash
  cd app
  # Install dependencies (use yarn or npm)
  npm install
  npm run build
  npm start
  ```
* Start Supabase
  ```bash
  cd supabase
  docker compose up ...
  ```

## Authors

- Victor DUVAL-BERTIN - *victor.duvalbertin@edu.ece.fr*
- Nicolas YORKE - *nicolas.yorke@edu.ece.fr*
- Arthur GENTON - *arthur.genton@edu.ece.fr*

## Tasks
  
**Project management:**

* Naming convention   
  *place your graduation and comments*
* Project structure   
  *place your graduation and comments*
* Git   
  * 2/2 Points
  * *We have been careful to commit cleanly on each of our pushes*  
* Code quality   
  *place your graduation and comments*
* Design, UX, and content   
  * 4/4 Points
  * *We made pages looking like pages we can find on article websites or not, modern with photos, with responsiveness. We used exclusively Tailwind CSS with the help of the Flowbite library (especially for the Footer, the Header and other components like modals). Only the page of articles is a little less responsive than the others, because we must load the photos from the Supabase storage.*

**Application development:**

* Home page   
  * 2/2 Points
  *Our Home page is inspired by modern websites with photos in the foreground, the main categories of our site, and a Google API (bonus) of the ECE Paris location (fictitiously the location of Sparticles)*
* Login and profile page   
  * 4/4 Points
  * *You can log in on the login page and log out on the profile page. The Login page includes the Auth component of Supabase allowing a simple connection/creation of account. We have also implemented the **providers of : Github, Google and Discord which are functional (Bonus)**. The profile page contains the information of the user (first name, last name, nickname) that **he can change and that is persistent in the database (Bonus)**, but also **all the articles and comments written by him (Bonus)**. We will come back to this later but it is possible to **access the profile page of any user (Bonus)**.*
* New articles creation   
  * <mark> 5/6 Points </mark>
  * *You can create an article **when you are authenticated**. A modal opens and you can enter the **title, a short description, the content of the article, as well as a photo (optional) alongside the article (Bonus)** which will be displayed on the page of all articles as well as on the page of the article in question.
  We give a score of 5/6 because we have not implemented a tag/category system*
* New comment creation
  * 4/4 Points   
  * *You can write a comment under an article even **if you are not authenticated** (as marked in the project instructions - New Comment Creation section). You will be able to enter the **title of the comment and its content**. In this case, your name will be 'Unknown', and the comment will not be editable or deletable. If you leave a comment while logged in, we will see your name and the comment can be edited or deleted later.*
* Resource access control   
  *place your graduation and comments*
* Article modification 
  * 4/4 Points  
  * *If you have created an article and **you are authenticated as its author**, you will see on the page of your article a button to **edit your article**, where you can **modify its title, its content, its description but also its photo!***
* Article removal   
  * 2/2 Points
  * *In the same way as for the modification of the article, you will be able to see a button for deleting an article that you have created, on the page of the latter.*
* Comment modification
  *place your graduation and comments*
* Comment removal   
  *place your graduation and comments*
* Account settings   
  *place your graduation and comments*
* WYSIWYG integration   
  *place your graduation and comments*
* Gravatar integration   
  *place your graduation and comments*
* Light/dark theme   
  *place your graduation and comments*
* Accent color selection   
  *place your graduation and comments*

## Bonus

* Task title   
  *place your graduation and comments*

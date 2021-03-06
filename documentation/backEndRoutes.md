# Bitbin Back-End Routes

- session
  - PUT / => verifies user login and returns token for the user
- users
    - GET /users => gets all users with access to current user's folders
    - POST /users => creates a brand new user and also creates a default "Personal" folder
- folders
    - GET /folders => gets all folders owned and shared based off userId
    - POST /folders => creates a new folder
    - PUT /folders/:id/edit => updates a folder name
    - PUT /folders/:id/move => changes a folders location by changing the parent folder
    - DELETE /folders/:id/deleted => creates a relationship between a folder and the DeletedItems table
    - DELETE /folders/:id => cascade deletes a folder, it's content and child folders unless any of the id's exist in the DeletedItems table also. If so, those items will have a new parent folder "Parent"
- files
    - POST /files sends file to S3 then a itemUrl is used to create a new entry in the Files table
    - PUT /files/:id updates the files name in the database
    - PUT /files
    - DELETE /files/:id/deleted => creates a relationship between a file and the DeletedItems table
    - DELETE /files/:id => deletes a file from S3 and also removes it from the Files table

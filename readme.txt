1. git clone the project
2. install the packages by npm i --save
3. There are multiple routes for addTask, markTask & get tasks for particulat team/channel
4. In the video, I've added multiple person in my channel.
5. The todo lists are different for different teams/channels
6. There are validations in the query
7. In the middleware, token is getting checked before coming to the api for security reasons
8. As datas are not meant to be deleted,for marking a task done, I am setting the isActive field for the task as false i.e it is not a active task
9. In future if we need to get a query like what kind of tasks people are putting, we can do it as we are not deleting the data 
10. For production release, user need to deploy with the command "npm i && pm2 start ./utils/ecosystem.config.js --env production --update-env"
11. For development, you can simply type pm2 start app.js -i max 
12. Please accept the invite link & add new task, get the todilist & mark it as done
13. I've tested for my roommate also. It worked fine.
13. Please call me if have any doubt.

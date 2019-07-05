# InstagramBot
Instagram Bot built by NodeJs and Puppeteer, to automate sending direct messages and following a user's follower 
#################################################

documentation:
  instagramBot has a function named 
      login: can be used only one time and then the cookie are saved to avoid keep login every time 
      save_cookies : to save the cookies after log in
      load_cookies : to load cookies if existed
      followFollwersOfAUser(numberToFollow, delay, user) : follow a user's follower (his username passed by paramateres), the second parameter is the delay the bot should wait before sending a new follow
        !! the bot is using random time + the delay passed by params to avoid being sespicious to instagram algorithms 
        !! the bot is picking random users from the list of follower , and not one by one 
        number of users you want to follow can be passed in first parameter
      extract_users : to parse all my follower's links into a text file in the same directory as the script, the file named links
      sendMessages(message, pathToimage, TimeBetweenMessages, msgsNumber) : this functions allows you to send messages to every one of your following that are already saved in the link.txt file
        the message you want to send in the first param
        !! you can send pictures as well by passing the path of the image in the second param,
        the delay to wait between messages in the third parm 
        the number of messages you want to send in the fourth param
You can disable browser interface in headless: true
      

const ig = require("./instagram");
const msgsNumber = 10;
const TimeBetweenMessages = 10000;
const pathToimage = './picture.png';
let message ="";

(async ()=>{

        await ig.initialize();
                  
        if( await ig.load_cookies() )
        {
          console.log('cookies loaded succesfully :D');
        }
        else
        {
          console.log("couldn't load cookies.. loging and creating new cookies : ");
          await ig.login("YourUserName", "YourPassowrd");
          await ig.save_cookies();
        }
        await ig.followFollwersOfAUser(600, 40000, "kingtemaki");
        //await ig.extract_users("blabla", MyprofileUrl);
        //await ig.loadusers();
        //await ig.sendMessages(message, pathToimage, TimeBetweenMessages, msgsNumber);



    debugger;
})()

//"//h4/button[contains(text(),'View all')]"
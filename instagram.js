const puppeteer = require('puppeteer'); ////*
const Login_URL = "https://www.instagram.com/accounts/login/";
const Home_URL = "https://www.instagram.com/";
const pathTofile = require('path').join(__dirname, 'link.txt')
const fs = require('fs');
const cookiesFilePath = require('path').join(__dirname, "cookies.json")
// var stream = fs.createWriteStream(pathTofile);

const TAG_URL = (tag) => {return 'https://www.instagram.com/explore/tags/'+tag+'/'};
const instagram = {
    browser : null,
    page : null,
    initialize: async()=>{
        const pathToExtension = require('path').join(__dirname, 'extenstion')
        console.log(pathToExtension);
                instagram.browser = await puppeteer.launch({
                        //ignoreDefaultArgs: true,                   
                         headless: false,
                            args: [
                            `--disable-extensions-except=${pathToExtension}`,
                                `--load-extension=${pathToExtension}`,
                                '--start-maximized',
                                
                            ]
                            });
                instagram.page = await instagram.browser.newPage();
                await instagram.page.setUserAgent("Mozilla/5.0 (Linux; Android 9; SM-G960F Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.157 Mobile Safari/537.36");
                
                 await instagram.page.setViewport({
                     width: 360,
                     height: 640
                     
                    
                 });
                

    },
    save_cookies: async () => {
            const cookiesObject = await instagram.page.cookies()
            var data = JSON.stringify(cookiesObject);
            await fs.writeFile(cookiesFilePath, data, {
                    spaces: 2
                },
                function (err) {
                    if (err) {
                        console.log('The file could not be written.', err)
                    }
                    console.log('Session has been successfully saved')
                })
        },
        load_cookies: async () => {
            let cb = async function (_cookies) {
                try {
                    await instagram.page.setCookie(_cookies);
                } catch (error) {
                    console.log('could not inject cookies : '+error);
                    return false;
                }
            };
            let data;
            try {
                data = await fs.readFileSync(cookiesFilePath);
            } catch (error) {
                console.log('could not read File : ' + cookiesFilePath +"=>" + error);
                return false;
            }
            let cookies = JSON.parse(data);
            for (var i = 0, len = cookies.length; i < len; i++)
                await cb(cookies[i]); 
            try {
                await instagram.page.goto(Home_URL, {
                    waitUntil: 'networkidle2'
                });
            } catch (error) {
                console.log("could not go to home url" + error);
            }
            try {
                LoginButton = await instagram.page.$x('//*[@id="react-root"]/section/main/article/div/div/div/div[2]/button');
                if (LoginButton[0])
                    return false;
                else
                    return true;
            } catch (error) {
                return false;
            }
        },
    login : async (username , password)=>{
            await instagram.page.goto(Login_URL, {
                waitUntil: 'networkidle2'
            });

            await instagram.page.waitForXPath('//*[@id="react-root"]/section/main/article/div/div/div/form/div[4]/div/div[1]/input');

            await instagram.page.type('input[name="username"]', username, {
                delay: 50
            });
            await instagram.page.type('input[name="password"]', password, {
                delay: 50
            });
            await instagram.page.waitForXPath('//*[@id="react-root"]/section/main/article/div/div/div/form/div[6]');
            saveinfo = await instagram.page.$x('//*[@id="optIntoOneTap"]/label/div[2]');
                if (saveinfo[0])
                {
                    loginButton_new = await instagram.page.$x('//*[@id="react-root"]/section/main/article/div/div/div/form/div[7]/button/div');
                    loginButton_new[0].click();
                }
                else{
                loginButton = await instagram.page.$x('//*[@id="react-root"]/section/main/article/div/div/div/form/div[6]/button');
                await loginButton[0].click();
                }
                try {
                    await instagram.page.waitForXPath('/html/body/div[3]/div/div/div[3]/button[2]');
                    Ads_cancel_button = await instagram.page.$x('/html/body/div[3]/div/div/div[3]/button[2]');
                    if (Ads_cancel_button[0])
                        await Ads_cancel_button[0].click();
                } catch (error) {
                    console.log(error);
                }
                
                
    },
    extract_users: async (message, followingURL) => {
        await instagram.page.goto(followingURL, {
            waitUntil: 'networkidle2'
        });
        await instagram.page.waitFor(1000);
        Appbutton = await instagram.page.$x('//*[@id="react-root"]/section/main/div/header/section/div[1]/div/button');
        await Appbutton[0].click();
        Applaunch = await instagram.page.$x('/html/body/div[3]/div/div[2]');
        const newPagePromise = new Promise(x => instagram.browser.once('targetcreated', target => x(target.page()))); // declare promise
        await instagram.page.waitFor(2000);
        await Applaunch[0].click();
        await instagram.page.waitFor(2000);
        const popup = await newPagePromise; // declare new tab /window, 
        await popup.waitFor(3000);
        NoButton = await popup.$x('/html/body/div[3]/div/div/div[3]/button[2]');
        await NoButton[0].click();
        await popup.waitFor(2000);
        profilButton = await popup.$x('//*[@id="react-root"]/section/nav[2]/div/div/div[2]/div/div/div[5]/a/span');
        await popup.waitFor(2000);
        await profilButton[0].click();
        await popup.waitFor(2000);
        followingButton = await popup.$x('//*[@id="react-root"]/section/main/div/header/section/ul/li[3]/a');
        await popup.waitFor(2000);
        await followingButton[0].click();
        await popup.waitFor(3000);
        const scrollable_section = 'body > div[role="presentation"] > div > div:nth-child(3)';
        await popup.waitFor(2000);
        const scrollableSection = await popup.$x('/html/body/div[3]/div/div[2]/ul/div/li[1]/div/div[1]/div[2]/div[2]');
        await popup.mouse.move(400, 136);
        await popup.waitFor(1000);
        await popup.mouse.down();
        await popup.waitFor(1000);
        await popup.keyboard.press('Space');
        await popup.waitFor(1000);

        await popup.mouse.move(400, 136);
        await popup.waitFor(1000);
        await popup.mouse.down();
        await popup.waitFor(1000);
        await popup.keyboard.press('Space');
        await popup.waitFor(1000);


        for(let i =0 ; i<20 ; i++){
            await popup.keyboard.press('Space');
            await popup.waitFor(1000);
        }
        let users = await popup.$x('/html/body/div[3]/div/div[2]/ul/div/li/div/div[1]/div[2]/div[1]/a');
        let fd;
        for(i=0;i<users.length;i++)
        {
                let user = await popup.evaluate(el => {
                    // do what you want with featureArticle in page.evaluate
                    return el.textContent;
                }, users[i]);
        
                 let link = "www.instagram.com/" + user;

            try {
                fd = fs.openSync(pathTofile, 'a');
                await fs.appendFileSync(fd, link+"\n");
            } catch (err) {
                console.log("link was not appended error : "+err);
            } finally {
                if (fd !== undefined)
                fs.closeSync(fd);

            }
        }
        return pathTofile;
    },
    loadusers: () =>{
        let array = [];
        var data =  fs.readFileSync(pathTofile); 
        array = data.toString().split("\n");
        console.log(array.length);
        end = array.length;
        for(let k=0;k<end;k++)
        {
                //gettin the user-target
                let user = array.shift();
                //sending message 
                       
                //array to file 
                console.log('user is : ' + user  );
                updatedlist = array.join('\n');
                fs.writeFileSync(pathTofile, updatedlist); 
                data = fs.readFileSync(pathTofile);
                array = data.toString().split("\n");
                console.log(array.length);

        }
        //file to array
        //loop back

    },
    
    sendMessages: async (message, pathToimage, TimeBetweenMessages, msgsNumber) => {

            try {
                await instagram.page.waitForXPath('//*[@id="react-root"]/section/nav[2]/div/div/div[2]/div/div/div[5]/a/span');
                MyProfilButton = await instagram.page.$x('//*[@id="react-root"]/section/nav[2]/div/div/div[2]/div/div/div[5]/a/span');
                await MyProfilButton[0].click();
                await instagram.page.waitFor(1000);
            } catch (error) {
                console.log("profile Button : "+error);
            }
            try {
                await instagram.page.waitForXPath('//*[@id="react-root"]/section/main/div/header/section/div[2]/div/button');
                Appbutton = await instagram.page.$x('//*[@id="react-root"]/section/main/div/header/section/div[2]/div/button');
                await Appbutton[0].click();
            } catch (error) {
                console.log("App button : " + error);
            }
            await instagram.page.waitForXPath('/html/body/div[3]/div/div[2]/a');
            Applaunch = await instagram.page.$x('/html/body/div[3]/div/div[2]/a');
            const newPagePromise = new Promise(x => instagram.browser.once('targetcreated', target => x(target.page()))); // declare promise
            try {
                await instagram.page.waitFor(2000);
                await Applaunch[0].click();
            } catch (error) {
                console.log("popup : " + error);
            }

            await instagram.page.waitFor(2000);
            const popup = await newPagePromise; // the popup opened now we controlling it 
            try {
                await popup.waitForXPath('/html/body/div[3]/div/div/div[3]/button[2]');
                NoButton = await popup.$x('/html/body/div[3]/div/div/div[3]/button[2]');
                await NoButton[0].click();
            } catch (error) {
                console.log("first notification in popup : " + error);
            }

            try {
                await popup.waitForXPath('//*[@id="react-root"]/section/nav[2]/div/div/div[2]/div/div/div[5]/a/span');
                profilButton = await popup.$x('//*[@id="react-root"]/section/nav[2]/div/div/div[2]/div/div/div[5]/a/span');
                await profilButton[0].click();
            } catch (error) {
                console.log("profilButton in popup : " + error);
            }
            let array = [];
             let data = "";
            try {
                data = fs.readFileSync(pathTofile);
            } catch (error) {
                console.log("file of users : " + pathTofile +"couldn't load >> " + error);
            }
            array = data.toString().split("\n");
            console.log("we have "+array.length+"user in this file");
            end = array.length;
            if (msgsNumber<=end)
            for (let k = 0; k < msgsNumber; k++) {
                word1 = ["hello", "Hi", "whatsapp ! ^^ ", "Hey there ! ", "Holla ! :p "];
                word2 = ["this Tshirt ", "this outfit ", "im sure this t-shirt ", "Believe me this T-Shirt "];
                word3 = ["Going to look great on you", " is going to look awsome on you", "is going to look good on you ^^ "];
                word4 = ["Get one for only 17$ ", "buy one for only 17$ ", "and its only for 17$ "];
                word5 = ["From here => ", "You get it From here => ", "you can find it in here => ", "===> "];
                word6 = ["  http://bit.ly/tshirt_skull "];

                //gettin random mix of message
                message = word1[Math.floor(Math.random() * word1.length)] + "\n" + word2[Math.floor(Math.random() * word2.length)] + word3[Math.floor(Math.random() * word3.length)] + "\n" + word4[Math.floor(Math.random() * word4.length)] + "\n" + word5[Math.floor(Math.random() * word5.length)] + word6[Math.floor(Math.random() * word6.length)];
                console.log(message + "\n" + "-----------------------------" + "\n");
                //gettin the first user from the array
                let user = array.shift();
                console.log('the user you are sending to now is : ' + user);
                //go to the user profile 
                try{
                    await popup.goto("https://"+user+"/", {
                    waitUntil: 'networkidle2'
                    });
                }
                catch (error) {
                    console.log("couldn't go to the url error : " + error);
                }
                //clicking message button
                try {
                    await popup.waitForXPath('//*[@id="react-root"]/section/main/div/header/section/div[1]/div[1]/button');
                    messageButton = await popup.$x('//*[@id="react-root"]/section/main/div/header/section/div[1]/div[1]/button'); 
                    await messageButton[0].click();
                } catch (error) {
                    console.log("messageButton in popup: " + error);
                }

                //uploading the image
                try {
                    const input = await popup.$('input[type="file"]');
                    await input.uploadFile(pathToimage);
                } catch (error) {
                    console.log("couldn't upload image : ./picture.png " + error);
                }
                //focusing textarea
                try {
                    await popup.waitForXPath('//*[@id="react-root"]/section/div[2]/div[2]/div/div/div/textarea');
                    textarea = await popup.$x('//*[@id="react-root"]/section/div[2]/div[2]/div/div/div/textarea');
                    await textarea[0].click();
                } catch (error) {
                    console.log("textarea : " + error);
                }

                //typing the message
                try {
                    await popup.type('textarea[placeholder="Message..."]', message, {
                        delay: 50
                    });
                } catch (error) {
                    console.log("couldn't type in text area: " + error);
                }

                //clicking send button
                try {
                    await popup.waitForXPath('//*[@id="react-root"]/section/div[2]/div[2]/div/div/div[2]/button');
                    sendButton = await popup.$x('//*[@id="react-root"]/section/div[2]/div[2]/div/div/div[2]/button');
                    await sendButton[0].click();
                } catch (error) {
                    console.log("sendButton :  " + error);
                }
                //waiting for the time been set between messages
                await popup.waitFor(TimeBetweenMessages);
                
                //array to file 
                updatedlist = array.join('\n');
                fs.writeFileSync(pathTofile, updatedlist);
                data = fs.readFileSync(pathTofile);
                array = data.toString().split("\n");
                console.log(array.length);

        }
        else{
            console.log('users list has finished || message number is bigger than users number in the list ');
        }

    },
    followFollwersOfAUser: async (numberToFollow, delay, user) => {
        await instagram.page.goto("https://www.instagram.com/" + user + "/", {
            waitUntil: 'networkidle2'
        });
        try {
            await instagram.page.waitForXPath('//*[@id="react-root"]/section/main/div/ul/li[2]/a/span');
            followersButton = await instagram.page.$x('//*[@id="react-root"]/section/main/div/ul/li[2]/a/span');
            followersButton[0].click();
        } 
        catch (error) {
            console.log('followers button : '+error);
        }
        await instagram.page.waitForXPath('//*[@id="react-root"]/section/main/div[2]/ul/div/li[10]/div/div[2]/button');
        await instagram.page.waitFor(2000);
        //followButtons = await instagram.page.$x('//*[@id="react-root"]/section/main/div[2]/ul/div/li/div/div[2]/button');
        //let end = followButtons.length;
        for (i = 1  ; i < numberToFollow  ; i=i+Math.floor(Math.random() * 5))
        {
            followButton = await instagram.page.$x('//*[@id="react-root"]/section/main/div[2]/ul/div/li[' + i + ']/div/div[2]/button');
            let text = await instagram.page.evaluate(el => {
                // do what you want with featureArticle in page.evaluate
                return el.textContent;
            }, followButton[0]);
            if (text == "Follow")
            {
                await followButton[0].click();
                await instagram.page.waitFor(Math.floor(Math.random() * 6)*1000);
                await instagram.page.waitFor(delay);
            }
        }
    }
        
    

}
module.exports = instagram;
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');
const express = require('express');
const app = express();

const axios = require('axios').default;




const config = {
    port: process.env.PORT || 3000,

    // The directory where the files are stored.

    directory: process.env.DIRECTORY || './public',

    // The file to serve.
    file: process.env.FILE || 'index.html',


}








// ------------------------------------------------------------



async function getGithubFollowers()
{
    // Use the axios library to make a request to the Github API.

    // the url will be https://api.github.com/users/kumikodev/followers
    // the method will be GET


    const response = await axios.get('https://api.github.com/users/kumikodev/followers');

    return response.data;
}


const port = config.port;
const dir = config.directory;
const file = config.file;
const date = new Date();
// Make sure the TIME is set to EST.
const time = date.toLocaleString('en-US', { timeZone: 'America/New_York' });
const filePath = path.join(dir, file);

app.use(express.static(dir));

const SECRET_URL = "IM NOT SHOWING YOU!!!";

app.get('/', (req, res) => {
    res.sendFile(filePath);

})

app.get(`${SECRET_URL}`, (req, res) => {
    res.send("<h1>Hello You Found Me! (DM Kumiko#0001 to claim your reward, Also Please show a sreenshot)</h1>");
});


app.get("/l", (req, res) => {
    // Render the HTML file named secret.html in the public directory.
    res.sendFile(path.join(__dirname, "public", "secret.html"));

    // After 10 seconds, redirect to the secret URL.

})

app.get("/k", (req, res) => {
    setTimeout(() => {
        res.redirect(SECRET_URL);
    }
        , 10000);
})

app.listen(port, () => {
    console.clear();
    console.log(chalk.green(`[ ${time} ] Server running on port ${port}`));
    console.log(chalk.green(`[ ${time} ] Serving ${filePath}`));
    
    getGithubFollowers().then(data => {
        console.log(chalk.green(`[ ${time} ] ${data.length} followers`));
    })
    // For Each File in Directory public should be logged
    fs.readdir(dir, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
            console.log(chalk.green(`[ ${time} ] Serving ${file}`));
        }
        );
    }
    );
});

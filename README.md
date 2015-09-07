# archive-tool-ui
Basic UI component for archive tool along with Dropbox connectivity.

###Testing
Create a Dropbox API application from the APP console (https://www.dropbox.com/developers/apps) in the Dropbox developers section. Make sure that the app has full read/write access to any file inside the user's Dropbox.
Copy the App key and App secret values to settings.json file.
```
{
    "dropbox": {
        "appkey": "your-app-key",
        "appsecret": "your-app-secret"
    }
}
```
Run the meteor application using the following command.

`meteor --settings settings.json`

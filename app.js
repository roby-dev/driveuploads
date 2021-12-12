const {google}  = require('googleapis');
const path = require('path');
const fs = require('fs');
const { file } = require('googleapis/build/src/apis/file');

const CLIENT_ID = '308934722980-6oq9kg2dnqgousv42pb6u4kiuu8o63rn.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI='https://developers.google.com/oauthplayground';

const REFRESH_TOKEN='1//04T7cdWIbgULTCgYIARAAGAQSNwF-L9IrWe3MOfXWgKY1KDu2ryZzgW9F2TjUb1EEv45KXbYrJyBVf2WKPpCPjTePIAb4QSLHhUc';

const oauth2Client  = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

//MOSTRAR IMAGENES https://drive.google.com/uc?export=view&id=

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({
    version:'v3',
    auth:oauth2Client
});

const filePath = path.join(__dirname,'perfil.jpg');

async function uploadFile(){
    try {
        
        const response = await drive.files.create({
            requestBody:{
                name:'robyprofile.jpg',
                mimeType:'image/jpg',
            },
            media:{
                mimeType:'image/jpg',
                body:fs.createReadStream(filePath)
            }
        })

        console.log(response.data);

    } catch (error)  {
        console.log(error);
    }
}

async function delteFile(idFile){
    try {
        const response = await drive.files.delete({
            fileId:idFile
        });

        console.log(response.data,response.status);
    } catch (error) {
        console.log(error);
    }
}


async function generatePublicUrl(idFile){
    try {
        const fileId=idFile;
        await drive.permissions.create({
            fileId:fileId,
            requestBody:{
                role:'reader',
                type:'anyone'
            }
        });
        const result = await drive.files.get({
           fileId:fileId,
           fields:'webViewLink,webContentLink' 
        });
        console.log(result.data);
    } catch (error) {
        console.log(error);
    }
}

//uploadFile();

generatePublicUrl('1_A52alopHAGWWKlxu59xVh7I_hncPsws');
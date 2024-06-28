import fs from 'fs-extra';
import path from 'path';
import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import { OAuth2Client } from 'google-auth-library';
import inquirer from 'inquirer';
import TinyURL from 'tinyurl';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

const loadSavedCredentialsIfExist = async () => {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
};

const saveCredentials = async (client) => {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
};

const authorize = async () => {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
};

const uploadFile = async (auth, filePath, fileName) => {
  const drive = google.drive({ version: 'v3', auth });
  const fileMetadata = {
    name: fileName,
    parents: ['1_XUN2PVkDMwDbUu-GuxmlEMv5m9voB5u'],
  };
  const media = {
    mimeType: 'image/jpeg',
    body: fs.createReadStream(filePath),
  };
  try {
    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });
    console.log('File uploaded successfully.');
    return file.data.webViewLink;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
};

const promptForFile = async () => {
  const { filePath } = await inquirer.prompt([
    {
      type: 'input',
      name: 'filePath',
      message: 'Drag and drop an image file here (or enter the file path):',
      validate: (input) => fs.existsSync(input) || 'File does not exist',
    },
  ]);
  return filePath;
};

const promptForRename = async (originalName) => {
  const { rename } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'rename',
      message: 'Do you want to rename the file?',
      default: false,
    },
  ]);

  if (rename) {
    const { newName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'newName',
        message: 'Enter the new file name:',
        default: originalName,
      },
    ]);
    return newName;
  }
  return originalName;
};

const promptForShortening = async (url) => {
  const { shorten } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shorten',
      message: 'Do you want to shorten the URL?',
      default: false,
    },
  ]);

  if (shorten) {
    try {
      const shortUrl = await TinyURL.shorten(url);
      console.log('Shortened URL:', shortUrl);
      return shortUrl;
    } catch (err) {
      console.error('Error shortening URL:', err);
      return url;
    }
  }
  return url;
};

const main = async () => {
  try {
    const auth = await authorize();
    const filePath = await promptForFile();
    const originalName = path.basename(filePath);
    const fileName = await promptForRename(originalName);
    const fileUrl = await uploadFile(auth, filePath, fileName);
    const finalUrl = await promptForShortening(fileUrl);
    console.log('File uploaded successfully. URL:', finalUrl);
  } catch (err) {
    console.error('Error:', err);
  }
};

main();
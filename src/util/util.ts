import fs from "fs";
import { URL } from "url";
import Jimp from "jimp";
import { default as axios } from 'axios';


// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      
      const photo = await axios({
        method: 'get',
        url: inputURL,
        responseType: 'arraybuffer'
      }).then(({data: imageBuffer}: any) => {
        return Jimp.read(imageBuffer);
      })

      const outpath = "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      const output = await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname + outpath, () => {
          resolve(__dirname + outpath);
        });

        // console.log('Output:')
        // console.log(output.toString());
        // resolve(__dirname + outpath);

      // return outpath;
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}

// Validate url
export async function validateUrl(s: string) {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};
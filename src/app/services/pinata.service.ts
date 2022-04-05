import { Injectable } from "@angular/core";
import axios, { Axios } from 'axios';
import secrets from '../../../environment/secrets.json';
@Injectable()
export class PinataService{
    constructor(){

    }

    async pinFileToIPFS(imgBuffer: any,){
        let formData = new FormData();
        let endPoint = secrets.pinataApiEndpoint + 'pinning/pinFileToIPFS';

        const metadata = JSON.stringify({
            name: 'myNFT',
            keyvalues: {
                dateCreated: new Date()
            }
        });
        // formData.append('pinataMetadata', metadata);
        formData.append('file', imgBuffer);

        const res = await axios
        .post(endPoint, formData, {
            maxBodyLength: Infinity, //this is needed to prevent axios from erroring out with large files
            headers: {
                'Content-Type': `multipart/form-data;`,
                pinata_api_key: secrets.pinataApiKey,
                pinata_secret_api_key: secrets.pinataApiSecret
            }
        });

        if(res){
            return {
                succes: true,
                image : 'https://gateway.pinata.cloud/ipfs/' + res.data.IpfsHash
            }
        }else {
            return {};
        }
    }
}
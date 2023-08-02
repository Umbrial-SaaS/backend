import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import AWS from 'aws-sdk';
import { env } from '@config/env';
import IStorageProvider, { IFile } from '../models/IStorageProvider';

const s3 = new AWS.S3();

class S3StorageProvider implements IStorageProvider {
  public async saveFile(file: IFile, folder?: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file.filename);

    const params: AWS.S3.PutObjectRequest = {
      Bucket: env.AWS_BUCKET_NAME,
      Key: `${folder}/${file}`,
      Body: 'your-file-content',
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log('File uploaded successfully!', data);
      }
    });

    await fs.promises.unlink(originalPath);

    return file.filename;
  }

  public async deleteFile(file: string): Promise<void> {
    throw new AppError('method not implementd.');
  }
}

export default S3StorageProvider;

import fs from 'fs';
import path from 'path';
import { format } from 'date-fns'
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IStorageProvider, { IFile } from '../models/IStorageProvider';
import aws, { S3 } from 'aws-sdk';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }
  public async saveFile(file: IFile, folder?: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file.filename);
    console.log({ originalPath })

    const ContentType = 'image';

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    file.filename = `${format(new Date(), 'yyyy-MM-ddmmss')}${file.filename}`;
    if (folder) {
      file.filename = `${folder}/${file.filename}`;
    }
    try {
      await this.client
        .putObject({
          Bucket: uploadConfig.config.aws.bucket,
          Key: file.filename,
          ACL: 'public-read',
          Body: fileContent,
          ContentType,
        })
        .promise();
    } catch (err) {
      throw new AppError('Erro ao realizar upload na Amazon');
    }

    await fs.promises.unlink(originalPath);

    return file.filename
  }

  public async deleteFile(file: string): Promise<void> {
    throw new AppError('method not implementd.');
  }
}

export default S3StorageProvider;

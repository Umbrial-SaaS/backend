export interface IFile {
  filename: string;
  mimetype: string;
}

export default interface IStorageProvider {
  saveFile(file: IFile, folder?: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}

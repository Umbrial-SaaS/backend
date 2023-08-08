export interface IFile {
  filename: string;
  fieldname: string;
  mimetype: string;
  file: any
}

export default interface IStorageProvider {
  saveFile(file: IFile, folder?: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}

import { Bucket, Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { parse } from 'path';
import { Readable } from 'stream';

interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  stream: Readable;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

@Injectable()
export class StorageService {
  private bucket: Bucket;
  private storage: Storage;

  constructor() {
    this.storage = new Storage();
    this.bucket = this.storage.bucket('minasan');
  }

  private setDestination(destination: string): string {
    let escDestination = '';
    escDestination += destination
      .replace(/^\.+/g, '')
      .replace(/^\/+|\/+$/g, '');
    if (escDestination !== '') escDestination = escDestination + '/';
    return escDestination;
  }

  private setFilename(uploadedFile: File): string {
    const fileName = parse(uploadedFile.originalname);
    return `${fileName.name}-${Date.now()}${fileName.ext}`
      .replace(/^\.+/g, '')
      .replace(/^\/+/g, '')
      .replace(/\r|\n/g, '_');
  }

  async uploadFile(
    uploadedFile: File,
    destination = '',
  ): Promise<{
    bucket: string;
    path: string;
    name: string;
    size: number;
    mimeType: string;
    signedUrl: string;
  }> {
    if (!uploadedFile) {
      throw new Error('Nenhum arquivo recebido para upload.');
    }

    const safeDest = this.setDestination(destination);
    const filename = this.setFilename(uploadedFile);
    const objectPath = `${safeDest}${filename}`;
    const fileRef = this.bucket.file(objectPath);

    const contentType = uploadedFile.mimetype || 'application/octet-stream';
    const buffer = uploadedFile.buffer;

    if (!buffer || !Buffer.isBuffer(buffer)) {
      throw new Error(
        'Arquivo sem buffer. Configure o Multer com memoryStorage.',
      );
    }

    await fileRef.save(buffer, {
      resumable: false,
      contentType,
      metadata: {
        contentType,
        cacheControl: 'public, max-age=31536000, immutable',
        contentDisposition: `inline; filename="${uploadedFile.originalname.replace(/"/g, "'")}"`,
      },
    });

    const expires = Date.now() + 15 * 60 * 1000;
    const [signedUrl] = await fileRef.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires,
    });

    const [meta] = await fileRef.getMetadata();

    return {
      bucket: this.bucket.name,
      path: objectPath,
      name: filename,
      size: Number(meta.size ?? uploadedFile.size ?? 0),
      mimeType: meta.contentType ?? contentType,
      signedUrl,
    };
  }

  async removeFile(fileName: string): Promise<void> {}
}

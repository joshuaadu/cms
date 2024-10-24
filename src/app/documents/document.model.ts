// export class Document {
//   constructor(
//     public id: string,
//     public name: string,
//     public description: string,
//     public url: string,
//     public children: Document[]
//   ) {}
// }

export type DocumentType = {
  name: string;
  description: string;
  url: string;
  id: string;
};

// export type DocumentType = typeof Document;
export type DocumentsType = DocumentType[];

export interface Document {
  id: string;
  name: string;
  description: string;
  url: string;
  children: Document[];
}

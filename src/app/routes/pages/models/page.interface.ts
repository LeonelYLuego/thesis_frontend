export interface Page {
  id: string;
  name: string;
  url: string;
  publicKey: string;
  privateKey: string;
}

export interface CreatePageInterface {
  name: string;
  url: string;
}

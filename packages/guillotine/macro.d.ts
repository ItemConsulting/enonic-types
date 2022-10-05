export function processHtml(params: ProcessHtmlParams): ProcessHtmlResult;

interface ProcessHtmlParams {
  value: string;
  type?: string;
  imageWidths?: Array<number>;
  imageSizes?: string;
}

interface ProcessHtmlResult<MacroConfig = unknown> {
  raw: string;
  processedHtml: string;
  macrosAsJson: Array<{
    ref: string;
    name: string;
    descriptor: string;
    config: MacroConfig;
  }>;
  images: Array<{
    imageId: string;
    imageRef: string;
  }>;
}

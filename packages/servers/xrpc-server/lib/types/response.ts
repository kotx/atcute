declare const kFormat: unique symbol;
declare const kData: unique symbol;

export type ResponseFormat = 'json' | 'blob';

export interface TypedResponse<TFormat extends ResponseFormat, TData> {
	[kFormat]: TFormat;
	[kData]: TData;
}

type BlobSource = ReadableStream | BufferSource | Blob;

export type JSONResponse<TData> = TypedResponse<'json', TData>;
export type BlobResponse = TypedResponse<'blob', BlobSource>;

export const json: {
	<TData>(data: NoInfer<TData>, init?: ResponseInit): Response & JSONResponse<TData>;
} = (data: any, init?: ResponseInit): any => {
	return Response.json(data, init);
};

export const blob: {
	(data: BlobSource, init?: ResponseInit): Response & BlobResponse;
} = (data: any, init?: ResponseInit): any => {
	return new Response(data, init);
};

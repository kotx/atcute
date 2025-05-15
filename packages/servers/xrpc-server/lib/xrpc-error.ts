export interface XRPCErrorOptions {
	status: number;
	error: string;
	description?: string;
}

export class XRPCError extends Error {
	/** response status */
	readonly status: number;

	/** error name */
	readonly error: string;
	/** error message */
	readonly description?: string;

	constructor({ status, error, description }: XRPCErrorOptions) {
		super(`${error} > ${description ?? '(unspecified description)'}`);

		this.status = status;

		this.error = error;
		this.description = description;
	}

	toResponse(): Response {
		return Response.json({ error: this.error, message: this.description }, { status: this.status });
	}
}

export class InvalidRequestError extends XRPCError {
	constructor({ status = 400, error = 'InvalidRequest', description }: Partial<XRPCErrorOptions>) {
		super({ status, error, description });
	}
}

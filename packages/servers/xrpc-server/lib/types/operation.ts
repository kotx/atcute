import type {
	InferOutput,
	ObjectSchema,
	XRPCLexBodyParam,
	XRPCProcedureMetadata,
	XRPCQueryMetadata,
} from '@atcute/lexicons/validations';

import type { Literal, Promisable } from './misc.js';

export type UnknownOperationContext = {
	request: Request;
	params: Record<string, Literal | Literal[]>;
	input?: Record<string, unknown>;
};

// #region Query

export type QueryContext<TQuery extends XRPCQueryMetadata> = {
	request: Request;
} & (TQuery['params'] extends ObjectSchema
	? {
			params: InferOutput<TQuery['params']>;
		}
	: {
			// params
		});

export type QueryHandler<TQuery extends XRPCQueryMetadata> = (
	context: QueryContext<TQuery>,
) => TQuery['output'] extends null
	? Promisable<void>
	: TQuery['output'] extends XRPCLexBodyParam
		? Promisable<InferOutput<TQuery['output']['schema']>>
		: Promisable<Response>;

export type QueryConfig<TQuery extends XRPCQueryMetadata = XRPCQueryMetadata> = {
	handler: QueryHandler<TQuery>;
};

// #region Procedure

export type ProcedureContext<TProcedure extends XRPCProcedureMetadata> = {
	request: Request;
} & (TProcedure['params'] extends ObjectSchema
	? {
			params: InferOutput<TProcedure['params']>;
		}
	: {
			// params
		}) &
	(TProcedure['input'] extends XRPCLexBodyParam
		? {
				input: InferOutput<TProcedure['input']['schema']>;
			}
		: {
				// input
			});

export type ProcedureHandler<TProcedure extends XRPCProcedureMetadata> = (
	context: ProcedureContext<TProcedure>,
) => TProcedure['output'] extends null
	? Promisable<void>
	: TProcedure['output'] extends XRPCLexBodyParam
		? Promisable<InferOutput<TProcedure['output']['schema']>>
		: Promisable<Response>;

export type ProcedureConfig<TProcedure extends XRPCProcedureMetadata = XRPCProcedureMetadata> = {
	handler: ProcedureHandler<TProcedure>;
};

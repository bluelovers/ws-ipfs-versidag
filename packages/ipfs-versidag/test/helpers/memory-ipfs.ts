import objHash from 'object-hash';
import { inspect } from 'util';

inspect.defaultOptions.depth = null;
inspect.defaultOptions.colors = true;

export const createMemoryIpfs = () =>
{
	const nodesMap = new Map();

	return {
		dag: {
			get: jest.fn((cid, config?) =>
			{
				const dagNode = { ...nodesMap.get(cid.toString()) };

				console.log(`ipfs:dag:get`, cid, config, dagNode)

				if (dagNode.parents)
				{
					//dagNode.parents = dagNode.parents.map((link) => createFakeCID(link['/'], link));
				}

				return Promise.resolve({ value: dagNode });
			}),
			put: jest.fn((dagNode, config?) =>
			{
				console.log(`ipfs:dag:put`, dagNode, config)

				const cid = objHash(dagNode);

				nodesMap.set( cid, dagNode);

				return Promise.resolve(createFakeCID(cid));
			}),
		},
	};
}

export function createFakeCID(cid: string, ...argv)
{
	console.log(`createFakeCID`, cid, ...argv)

	return {
		[Symbol.for('nodejs.util.inspect.custom')]()
		{
			return 'FakeCID(' + cid + ')'
		},
		toBaseEncodedString: () => cid,
		toString: () => cid,
	};
}

export function getCIDOfFakeCIDLink(cid, ...argv)
{
	console.log(`getCIDOfFakeCIDLink`, cid)

	return { '/': cid }
}

export default createMemoryIpfs;

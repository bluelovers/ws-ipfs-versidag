import createVersidag from 'versidag';

import CID from 'cids';
import { toCIDLinkObject, toCIDString } from './util/toCIDString';

const createReadNode = (ipfs) => async (cid, config?) =>
{
	console.dir(cid)

	const result = await ipfs.dag.get(toCIDString(cid), config);

	console.log(`createReadNode`, result, cid, config);

	return result.value;
};

const createWriteNode = (ipfs) => async (node, config) =>
{
	let { parents, ...dagNode } = node;

	if (parents?.length)
	{
		dagNode = {
			parents,
			...dagNode,
		};
	}

	const cid = await ipfs.dag.put(dagNode, config);

	console.log(`createWriteNode`, cid, dagNode, config);

	return toCIDLinkObject(cid);
};

export function createIpfsVersidag(headCids, config?)
{
	// Allow heads to be optinal
	if (!Array.isArray(headCids))
	{
		config = headCids;
		headCids = [];
	}

	const { ipfs, ...rest } = config;

	headCids = headCids.map(toCIDLinkObject);

	console.log(`createIpfsVersidag`, headCids, config);

	config = {
		...rest,
		readNode: createReadNode(ipfs),
		writeNode: createWriteNode(ipfs),
	};

	return createVersidag(headCids, config);
}

export default createIpfsVersidag;

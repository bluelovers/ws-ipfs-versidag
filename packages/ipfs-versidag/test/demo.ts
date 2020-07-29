// @ts-ignore
import IPFS from 'ipfs';
import createIpfsVersidag from '../';
import CID from 'cids';
import multihash from 'multihashes';

import { inspect } from 'util';
inspect.defaultOptions.depth = null;
inspect.defaultOptions.colors = true;

IPFS.create().then(async (ipfs) =>
	{
		const myVersidag = createIpfsVersidag({
			ipfs,
			tieBreaker: (node1, node2) => node1.meta - node2.meta,
		});

		console.dir(myVersidag, {
			depth: null,
			colors: true,
		})

		const myVersidagA = await myVersidag.add(new CID(`QmP8jTG1m9GSDJLCbeWhVSVgEzCPPwXRdCRuJtQ5Tz9Kc9`), 1);
		console.dir(myVersidagA, {
			depth: null,
			colors: true,
		})
		const myVersidagB = await myVersidagA.add(new CID(`QmWXShtJXt6Mw3FH7hVCQvR56xPcaEtSj4YFSGjp2QxA4v`), 2);
		console.dir(myVersidagB, {
			depth: null,
			colors: true,
		})
		const myVersidagC = await myVersidagA.add(new CID('QmUh6QSTxDKX5qoNU1GoogbhTveQQV9JMeQjfFVchAtd5Q'), 3);
		console.dir(myVersidagC, {
			depth: null,
			colors: true,
		})
		console.log(0, `-----------------`)
		const myVersidagD = await myVersidagB.merge(myVersidagC.headCids, new CID('QmY7zFVFh5pt5YjDVBrJmfWYvAmoDvKqtZtpJtkQNZk1cq'));
		console.dir(myVersidagD, {
			depth: null,
			colors: true,
		})

		console.log(1, `-----------------`)
		let cid: CID = myVersidagD.headCids[0];
		console.log(cid)

		const versions = await myVersidagD.resolve();
		// [
		//   { version: 'Hello World' },
		//   { version: 'Hi World', meta: 3 }
		//   { version: 'Hello', meta: 2 }
		//   { version: 'Hi', meta: 1 }
		// ]

//	console.dir(versions, {
//		depth: null,
//		colors: true,
//	})

		return ipfs.stop();
	})
	.catch(e => console.error(e))
	.finally(() => process.exit())
;

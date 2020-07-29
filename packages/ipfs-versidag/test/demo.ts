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

		console.log(`myVersidag`, myVersidag)

		const myVersidagA = await myVersidag.add(new CID(`QmP8jTG1m9GSDJLCbeWhVSVgEzCPPwXRdCRuJtQ5Tz9Kc9`), 1);
		console.log(`myVersidagA`, myVersidagA)
		const myVersidagB = await myVersidagA.add(new CID(`QmWXShtJXt6Mw3FH7hVCQvR56xPcaEtSj4YFSGjp2QxA4v`), 2);
		console.log(`myVersidagB`, myVersidagB)
		const myVersidagC = await myVersidagA.add(new CID('QmUh6QSTxDKX5qoNU1GoogbhTveQQV9JMeQjfFVchAtd5Q'), 3);
		console.log(`myVersidagC`, myVersidagC)
		console.log(0, `-----------------`)
		const myVersidagD = await myVersidagB.merge(myVersidagC.headCids, new CID('QmY7zFVFh5pt5YjDVBrJmfWYvAmoDvKqtZtpJtkQNZk1cq'));
		console.log(`myVersidagD`, myVersidagD)

		console.log(1, `-----------------`)
		let cid: CID = myVersidagD.headCids[0];
		console.log(`myVersidagD.headCids[0]`, cid)

		const versions = await myVersidagD.resolve();
		// [
		//   { version: 'Hello World' },
		//   { version: 'Hi World', meta: 3 }
		//   { version: 'Hello', meta: 2 }
		//   { version: 'Hi', meta: 1 }
		// ]

	console.log(`myVersidagD.resolve()`, versions)

		return ipfs.stop();
	})
	.catch(e => {
		console.error(e)
		process.exit();
	})
	//.finally(() => process.exit())
;

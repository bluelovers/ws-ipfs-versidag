
export function toCIDString(cid)
{
	return (cid['/'] ?? cid).toString()
}

export function toCIDLinkObject(cid)
{
	return {
		'/': toCIDString(cid)
	}
}

## Channel Frame

This is a simple, no nonsense frame template you can use to help people join your channel! There are no moderation or checks put in place, so it's designed to allow anyone to join (that stuff might be added later). Just follow the instructions to set it up!

## Setup

There are a few things you will need to do in order to start up this frame

### Create a Signer

Either the moderator or the owner of the channel needs to create a signer that will be used in the app. This is like an API key that you can revoke at any time, just make sure you keep it safe! For convenience you can use [castkeys.xyz](https://castkeys.xyz). Once you have your signer created, rename the `.env.sample` file to `.env.local` and fill out the variables:

```
MOD_FID= # the FID of the owner or moderator that made the signer
MOD_PUBLIC_KEY= # public key of the signer
MOD_PRIVATE_KEY= # private key of the signer
```

> [!IMPORTANT]
> Make sure to remove the `0x` prefix from your public and private keys!!

### Edit the Config

Everything you need to customize this frame is in the `config.ts` file at the root of the project! You will need image links for each step, and [Pinata](https://pinata.cloud) makes that pretty easy but uploading and copying the links.

```typescript
export const config = {
	title: "Join Pinata", // Title of the frame
	channel: "pinata", // name of the channel as you see it the Warpcast url
	startImage:
		"https://dweb.mypinata.cloud/ipfs/QmWnDf7iM4H9EJJLnW7tjaHgkHVPCWwcPSaM8TCfvBDjtP?img-format=webp",
	mustFollowImage:
		"https://dweb.mypinata.cloud/ipfs/QmZfCdDqsMfm9KWH5kPmJsD27vgWTmdhMZFzGMmSaQK9YQ?img-format=webp",
	alreadyMemberImage:
		"https://dweb.mypinata.cloud/ipfs/QmRfKQFQxPBsc9JQdSj3AMak1bvEfqr7NtrCqwMMxmjRNf?img-format=webp",
	successImage:
		"https://dweb.mypinata.cloud/ipfs/QmREw24yRCLAX7aESuPmhGyqNBqtx7cxxnGgFVYeoaD5A9?img-format=webp",
	errorImage:
		"https://dweb.mypinata.cloud/ipfs/QmVaSL2BBagzatjQ8RYJVLQ1ooVYtpt8dwJVqujBJBtLUT?img-format=webp",
};
```

## Deploy

You can either fork this repo or clone it, then push your changes to Github. Then make a Vercel account, connect your Github account, and select the repo.

Next you will want to copy the contents of the `.env.local` file and put it into the Environment Variables section of the deployment screen.

![vercel screenshot](https://dweb.mypinata.cloud/ipfs/QmZEUfXvVLTWN1PjS3ojVVD15QHrKGUwwt1ftFE5YxknsJ?img-format=webp)

## Questions?

Feel free to [shoot us an email!](mailto:steve@pinata.cloud)

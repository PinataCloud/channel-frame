/** @jsxImportSource frog/jsx */

import { Button, Frog } from "frog";
import { handle } from "frog/vercel";
import { generateAuthToken } from "@/utils/authKey";
import { config } from "@/config";

export const dynamic = "force-dynamic";

const app = new Frog({
	title: config.title,
	basePath: "/api",
});

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame("/", (c) => {
	return c.res({
		action: "/join",
		image: config.startImage,
		intents: [<Button>Request to Join</Button>],
	});
});

app.frame("/join", async (c) => {
	const isMemberReq = await fetch(
		`https://api.warpcast.com/fc/channel-members?channelId=${config.channel}&fid=${c.frameData?.fid}`,
	);
	const isMemeberRes = await isMemberReq.json();

	if (isMemeberRes.result.members.length > 0) {
		return c.res({
			image: config.alreadyMemeberImage,
			intents: [
				<Button.Link href="https://github.com/stevedylandev/channel-frame">
					Source Code
				</Button.Link>,
			],
		});
	}

	const authToken = await generateAuthToken();

	const joinReq = await fetch("https://api.warpcast.com/fc/channel-invites", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${authToken}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			channelId: config.channel,
			inviteFid: c.frameData?.fid,
			role: "member",
		}),
	});
	const joinRes = await joinReq.json();
	console.log(joinRes);

	if (
		joinRes.errors &&
		joinRes.errors[0].message ===
			"User must follow channel or inviter to be invited as member"
	) {
		return c.res({
			action: "/join",
			image: config.mustFollowImage,
			intents: [<Button>Try Again</Button>],
		});
	}

	if (joinRes.result && joinRes.result.success) {
		return c.res({
			image: config.successImage,
			intents: [
				<Button.Link href="https://github.com/stevedylandev/channel-frame">
					Source Code
				</Button.Link>,
			],
		});
	}

	return c.res({
		action: "/join",
		image: config.errorImage,
		intents: [<Button>Try Again</Button>],
	});
});

export const GET = handle(app);
export const POST = handle(app);

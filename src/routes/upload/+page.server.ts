import { ListObjectsCommand } from '@aws-sdk/client-s3';

import { s3Client } from '$lib/server/s3';
import { PUBLIC_R2_BUCKET_NAME } from '$env/static/public';

export async function load(event) {
	// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/listobjectscommand.html
	const command = new ListObjectsCommand({
		Bucket: PUBLIC_R2_BUCKET_NAME
	});

	return {
		objects: s3Client.send(command)
	};
}

<script lang="ts">
	import { Table, tableCell } from 'svelte-ux';
	import { getCellValue, getCellContent } from 'svelte-ux/utils/table';
	import { PUBLIC_R2_BUCKET_URL } from '$env/static/public';

	export let data;

	async function handleFileUpload(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
			const getPresignedUrlResponse = await fetch('/api/upload', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					fileName: file.name,
					fileType: file.type
				})
			});

			if (!getPresignedUrlResponse.ok) {
				console.error('Failed to get presigned URL');
			}

			const { presignedUrl, objectKey } = await getPresignedUrlResponse.json();

			const uploadToR2Response = await fetch(presignedUrl, {
				method: 'PUT',
				headers: {
					'Content-Type': file.type
				},
				body: file
			});

			if (!uploadToR2Response.ok) {
				console.error('Failed to upload file to R2');
			}
		}
	}
</script>

<h1 class="text-xl font-bold">Upload files to Cloudflare R2</h1>
<div class="text-black/50 text-sm">
	Upload directly to Cloudflare bucket from client by using a presigned URL
</div>
<div class="py-4 px-3 rounded-lg border border-black/10 bg-black/5">
	<input type="file" on:change={handleFileUpload} />
</div>

<h2 class="text-lg font-semibold">Files</h2>
<Table
	columns={[
		{ name: 'Key' },
		{ name: 'LastModified' },
		// { name: 'Owner.DisplayName' },
		{ name: 'Size', format: 'metric' },
		// { name: 'ETag' },
		{ name: 'StorageClass' }
	]}
	data={data.objects.Contents}
>
	<tbody slot="data" let:columns let:data>
		{#each data ?? [] as rowData, rowIndex}
			<tr>
				{#each columns as column (column.name)}
					{@const value = getCellValue(column, rowData, rowIndex)}

					{#if column.name === 'Key'}
						<td use:tableCell={{ column, rowData, rowIndex }}>
							<a href="{PUBLIC_R2_BUCKET_URL}/{value}" class="underline" target="_blank">{value}</a>
						</td>
					{:else}
						<td use:tableCell={{ column, rowData, rowIndex }}>
							{getCellContent(column, rowData, rowIndex)}
						</td>
					{/if}
				{/each}
			</tr>
		{/each}
	</tbody>
</Table>

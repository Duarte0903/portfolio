export async function getgit(owner, repo, path) {
    try {
        // Step 1: Fetch the file metadata to get the SHA
        const fileMetaResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
        if (!fileMetaResponse.ok) {
            throw new Error(`Failed to fetch file metadata: ${fileMetaResponse.statusText}`);
        }
        const fileMeta = await fileMetaResponse.json();

        // Step 2: Fetch the raw content of the file using its SHA
        const fileContentResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs/${fileMeta.sha}`);
        if (!fileContentResponse.ok) {
            throw new Error(`Failed to fetch file content: ${fileContentResponse.statusText}`);
        }
        const fileContentData = await fileContentResponse.json();

        // Step 3: Create a Blob from the base64-decoded content
        const decodedContent = atob(fileContentData.content);
        const uint8Array = new Uint8Array(decodedContent.length);
        for (let i = 0; i < decodedContent.length; i++) {
            uint8Array[i] = decodedContent.charCodeAt(i);
        }
        const blob = new Blob([uint8Array], { type: 'application/pdf' });

        // Step 4: Create a URL for the Blob and trigger a download
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = path.split('/').pop();
        document.body.appendChild(link);
        link.click();

        // Step 5: Clean up resources
        URL.revokeObjectURL(url);
        document.body.removeChild(link);

        console.log('File downloaded successfully:', path);

    } catch (error) {
        console.error('Error downloading file:', error);
    }
}

export const useS3Store = defineStore('s3', () => {
  function getSignedUrl(filename: string) {
    return $api<{ uploadUrl: string, assetUrl: string }>('/s3', {
      method: 'PUT',
      body: { filename },
    })
  }

  return {
    getSignedUrl,
  }
})

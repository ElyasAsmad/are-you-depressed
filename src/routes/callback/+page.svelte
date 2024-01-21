
<div class="max-w-screen-lg mx-auto px-4">
    <p>Redirecting...</p>
</div>

<script lang="ts">
    import { browser } from '$app/environment';
    import { page } from '$app/stores'
    const code = $page.url.searchParams.get('code')

    if (browser) {
        if (code) {
            window.localStorage.setItem('code', code)
            document.cookie = `code=${code}`
        }
        window.location.href = '/'
    }
</script>
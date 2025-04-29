<script setup lang="ts">
definePageMeta({
  middleware: ['is-verified'],
});

navigateTo({ name: 'management-bookingProviderId-settings-general' });
</script>

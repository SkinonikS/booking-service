import type { RouterMethod, HTTPMethod } from 'h3';

export type FileUploadOptions = {
  path: string;
  method: RouterMethod | HTTPMethod;
  field: string;
};


export const useFileUpload = (options: FileUploadOptions) => {
  const runtimeConfig = useRuntimeConfig();
  const { user, loggedIn } = useOidcAuth();

  const loading = ref<boolean>(false);

  const upload = async <T>(file: File): Promise<T> => {
    if (loading.value) {
      return Promise.reject('Image upload in progress...');
    }

    loading.value = true;

    const formData = new FormData();
    formData.append(options.field, file);

    const headers: HeadersInit = {
      'Accept': 'application/json',
    };

    if (loggedIn) {
      headers['Authorization'] = `Bearer ${user.value?.idToken}`;
    }

    return $fetch<T>(options.path, {
      baseURL: runtimeConfig.public.fileUpload.baseUrl,
      method: options.method,
      body: formData,
      credentials: 'omit',
      headers,
    }).finally(() => {
      loading.value = false;
    });
  };

  return { upload, loading };
};

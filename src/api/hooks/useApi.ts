import { ref, type Ref } from 'vue'

interface UseApiResult<T, TExecuteFactory extends (...args: any) => Promise<T | undefined>, TError = any> {
  result: Ref<T | null>
  isLoading: Ref<boolean>
  error: Ref<TError | null>
  execute: TExecuteFactory
}

export function useApi<TResult, TArgs extends any[]>(
  factory: (...args: TArgs) => RequestInfo,
  handleResponse: (response: Response) => Promise<TResult>
): UseApiResult<TResult, (...args: TArgs) => Promise<TResult | undefined>> {
  const isLoading = ref(false)
  const result = ref<TResult | null>(null) as Ref<TResult | null>
  const error = ref(null)
  const execute = async (...args: TArgs) => {
    const request = factory(...args)

    isLoading.value = true
    error.value = null
    try {
      const response = await fetch(request).then(handleResponse)

      result.value = response
      return response
    } catch (e: any) {
      error.value = e
      result.value = null
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    result,
    error,
    execute,
  }
}

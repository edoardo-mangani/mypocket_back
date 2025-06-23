export interface ApiResponse<T = any> {
  data: T | null
  error: boolean
  error_code: string | null
  error_message: string | null
  exception: string | null
}

export interface ApiErrorResponse {
  data: null
  error: true
  error_code: string
  error_message: string
  exception?: string
}

export interface ApiSuccessResponse<T = any> {
  data: T
  error: false
  error_code: null
  error_message: null
  exception: null
}

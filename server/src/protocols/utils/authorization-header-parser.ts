export interface AuthorizationHeaderParser {
  basic(text: string): [string, string]
  bearer(text: string): string
}

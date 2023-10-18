export const config = {
  /**
   * Use MSW in production builds too (unless useExternalApi is true).
   *
   * Default: false.
   */
  alwaysUseMsw: false,
  /**
   * Set to true to use the origin specified by externalApiOrigin
   * for API requests instead of MSW (only affects dev builds
   * unless alwaysUseMsw is true).
   *
   * Default: false.
   */
  useExternalApi: false,
  /**
   * The origin used for api requests when useExternalApi is true.
   * Don't include a trailing slash.
   *
   * Default: "http://localhost:8080"
   */
  externalApiOrigin: "http://localhost:8080",
  /**
   * Controls if the DebugTable component shows site-wide. Only affects dev
   * builds: DebugTables will be hidden in production builds. But, it is still
   * good practice to remove them entirely someday.
   *
   * Default: true.
   */
  showDebugTables: true
};

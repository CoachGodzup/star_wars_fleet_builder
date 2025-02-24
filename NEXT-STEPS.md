# Next Steps for Improvement

During the development of this project, I've noticed some nice to have improvements, that I wish to add in future releases

## Testing Enhancement
- Add a specific `render` for components, that wraps `mantine`, `redux` storage providers, caching and all the stuff I need for testing.
- Add more deep components testing coverage
- Considering implementation of E2E testing via `Cypress` or `Playwright`
- Include snapshot testing for UI components

## Performance Optimization
- Dropping local storage caching in favor of `Redis` for API calls
- Removing `Axios` and use `Fetch API`, in order to leverage Next.js internal caching system

## Build Optimization
- Analyze build time bottlenecks
- Optimize `bun` configuration
- Fixing `bun` cache for testing
- Deep diving into code splitting
- Review and remove unused dependencies

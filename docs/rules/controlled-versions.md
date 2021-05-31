# controlled-versions

Makes sure any used package is set to a controlled version. A controlled version is a semver that follows the passed granularity restrictions.

Supported granularity:
- `fixed`: All packages versions should be fixed (e.g `1.0.0`).
- `patch`: All packages versions should start with `~` (e.g `~1.0.0`).
- `minor`: All packages versions should start with `^` (e.g `^1.0.0`).

Examples for assuming `patch` is set:

__**Bad**__: (`lodash` should be `~4.17.0`)

```json
{
  "dependencies": {
    "lodash": "4.17.0"
  }
}

````

__**Good**__:

```json
{
  "dependencies": {
    "lodash": "~4.17.0"
  }
}

````

## Options
- `granularity`: `fixed` / `patch` / `minor`, as mentioned above. If not provided, defaults to `fixed`.
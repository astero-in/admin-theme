# Using Tabler Icons in Your Astro Project

The Iconify Tabler icon set has been successfully installed and configured in your Astro project. This guide will help you understand how to use these icons effectively in your components.

## Configuration

The `astro.config.mjs` file has been updated to include the Tabler icons in the `astro-icon` integration. This allows you to use the icons by referring to them with the `tabler` collection name.

## Basic Usage

To use a Tabler icon in your Astro components, use the following syntax:

```astro
<icon name="tabler:icon-name" />
```

### Example

```astro
<icon name="tabler:dashboard" />
```

Replace `icon-name` with the specific name of the Tabler icon you want to use.

## Icon Variants

Tabler provides two types of icons: normal and filled. You can specify the icon type in the icon name:

- **Normal Icons**: Use the icon name as is.
- **Filled Icons**: Use the icon name with a suffix, often `-filled` or similar.

### Example

To use both a normal icon and its filled variant:

```astro
<icon name="tabler:icon-name" />
<icon name="tabler:icon-name-filled" />
```

#### Example

```astro
<icon name="tabler:dashboard" />
<icon name="tabler:dashboard-filled" />
```

## Finding Icon Names

The exact suffix for filled icons can vary, so refer to the Tabler icon set documentation or explore the available icons to determine the correct naming.

## Additional Resources

For more information on using icons in Astro, visit the [Icon API Guide](https://www.astroicon.dev/guides/components/).

If you need further assistance or specific examples, feel free to reach out!

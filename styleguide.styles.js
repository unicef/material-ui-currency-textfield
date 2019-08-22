const rhythm = (value = 1, unit = 'rem', basis = 1.5) => (
    Array.isArray(value)
      ? value.map(v => `${basis * v}${unit}`).join(' ')
      : `${basis * value}${unit}`
  )
  
  const colors = {
    blue: "#1CABE2",
    primary: '#374EA2',
    purple: "#6A3674",
    danger: "#E2231A",
    darkRed: "#961A49",
    light: '#fff',
    dark: '#000',
    grey: '#7a898f',
    lightGrey: '#aec0c6',
    paleGrey: '#ebf1f3',
    secondary: '#ad29b6',
    tertiary: '#203a44',
  }
  
  const theme = {
    color: {
      baseBackground: colors.light,
      border: colors.paleGrey,
      codeBackground: colors.paleGrey,
      error: colors.danger,
      light: colors.grey,
      lightest: colors.lightGrey,
      name: colors.darkBlue,
      type: colors.red,
      base: colors.dark,
      link: colors.primary,
      linkHover: colors.primary,
      sidebarBackground: colors.primary
    },
    fontFamily: {
      base: '"proxima-nova", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      monospace: 'Consolas, "Liberation Mono", Menlo, monospace'
    },
    fontSize: {
      base: 15,
      text: 16,
      small: 13,
      h1: 38,
      h2: 32,
      h3: 18,
      h4: 18,
      h5: 16,
      h6: 16
    },
  }
  
  const styles = {
    ComponentsList: {
      heading: {
        fontWeight: '700 !important'
      }
    },
    Heading: {
      heading1: {
        display: 'block',
        position: 'relative',
        paddingBottom: rhythm(0.75),
        marginBottom: rhythm(0.75),
        fontWeight: 700,
        '&:before': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: rhythm(3),
          height: '4px',
          backgroundColor: colors.primary,
          borderRadius: '4px'
        },
        '& > a': {
          fontWeight: '700 !important'
        }
      },
      heading2: {
        marginBottom: rhythm(0.5)
      },
      heading3: {
        borderBottom: `thin solid ${colors.lightGrey}`,
        paddingBottom: rhythm(0.25),
        marginBottom: rhythm(1),
        textTransform: 'uppercase',
        fontWeight: '700'
      }
    },
    ReactComponent: {
      tabs: {
        backgroundColor: colors.paleGrey,
        padding: rhythm([0.5, 1]),
        overflow: 'auto'
      },
      tabButtons: {
        marginBottom: 0
      }
    },
    SectionHeading: {
      sectionName: {
        display: 'block',
        paddingTop: `${rhythm(1)} !important`,
        textDecoration: 'none !important',
        '&:hover': {
          opacity: 0.75
        }
      }
    },
    StyleGuide: {
      content: {
        paddingTop: rhythm(2.5),
        '@media (max-width: 600px)': {
          padding: rhythm(1)
        }
      },
    },
    TabButton: {
      button: {
        width: '100%'
      },
      isActive: {
        border: 0
      }
    },
  }
  
  module.exports = {
    styles: styles,
    theme: theme
  }
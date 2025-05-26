import type { DefaultTheme } from "styled-components"

interface ColorToken {
    default: string,
    hover?: string,
    active?: string
}

interface ColorFoundation {
    primary: ColorToken,
    secondary: ColorToken,
    tertiary: ColorToken,
    quaternary: ColorToken,
    background: ColorToken,
    foreground: ColorToken,
    alert: {
        warning: ColorToken,
        like: ColorToken
    }
}

const lightModeFoundation: ColorFoundation = {
    primary: {
        default: "#22492B",
        hover: "#346F42"
    },
    
    secondary: {
        default: "#147141",
        hover: "#12683C"
    },
    
    tertiary: {
        default: "#93D2AA",
        hover: "#7EC999",
        active: "#61BD83"
    },

    quaternary: {
        default: "#CDE2CB",
        hover: "#B4D3B1",
        active: "#B4D3B1"
    },
    
    background: {
        default: "#E7EFE6",
        hover: "#DBE7DA",
        active: "#CFDFCD"
    },
    
    foreground: {
        default: "#1F1F1F",
        hover: "#292929",
        active: "#333333"
    },

    alert: {
        warning: {
            default: "#BD0000"
        },

        like: {
            default: "#D23742"
        }
    },
}

const darkModeFoundation: ColorFoundation = {
    primary: {
        default: "#BADEC2",
        hover: "#346F42"
    },
    
    secondary: {
        default: "#97EDC0",
        hover: "#12683C"
    },
    
    tertiary: {
        default: "#307349",
        hover: "#7EC999",
        active: "#61BD83"
    },

    quaternary: {
        default: "#274125",
        hover: "#B4D3B1",
        active: "#B4D3B1"
    },
    
    background: {
        default: "#1F1F1F",
        hover: "#DBE7DA",
        active: "#CFDFCD"
    },
    
    foreground: {
        default: "#E7EFE6",
        hover: "#292929",
        active: "#333333"
    },

    alert: {
        warning: {
            default: "#BD0000"
        },

        like: {
            default: "#D23742"
        }
    },
}

const getColorTokens = (colorFoundation: ColorFoundation) => ({
    standard: colorFoundation.foreground,
    heading: colorFoundation.primary,
    subheading: colorFoundation.secondary,
    accent: colorFoundation.quaternary,
    reversed: colorFoundation.background,
    warning: colorFoundation.alert.warning,
    like: colorFoundation.alert.like
})

const getBackgroundColorTokens = (colorFoundation: ColorFoundation) => ({
    standard: colorFoundation.background,
    navbar: colorFoundation.secondary,
    accent: colorFoundation.tertiary,
    backdrop: colorFoundation.quaternary,
    reversed: colorFoundation.foreground
})

const fontFamilyTokens = {
    logo: "\"Yeseva One\", serif",
    heading: "\"Schibsted Grotesk\", sans-serif",
    content: "\"Barlow\", sans-serif"
}

const weightTokens = {
    /* 
     * FONT FAMILY              WEIGHTS
     * - Yeseva One:            400
     * - Schibsted Grotesk:     400-900
     * - Barlow:                100-900
     */
    thin: 100,
    extralight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900
}

const transitionTokens = {
    default: '0.125s ease',
}

declare module "styled-components" {
    export interface DefaultTheme {
        color: {
            standard: ColorToken,
            heading: ColorToken,
            subheading: ColorToken,
            accent: ColorToken,
            reversed: ColorToken,
            warning: ColorToken,
            like: ColorToken
        },

        background: {
            standard: ColorToken,
            navbar: ColorToken,
            accent: ColorToken,
            backdrop: ColorToken,
            reversed: ColorToken
        }
        
        fontFamily: {
            logo: string,
            heading: string,
            content: string
        },
        
        weight: {
            thin: number,
            extralight: number,
            light: number,
            regular: number,
            medium: number,
            semibold: number,
            bold: number,
            extrabold: number,
            black: number
        },
        
        transition: {
            default: string,
        }
    }
}

export const LightMode: DefaultTheme = {
    color: getColorTokens(lightModeFoundation),
    background: getBackgroundColorTokens(lightModeFoundation),
    fontFamily: fontFamilyTokens,
    weight: weightTokens,
    transition: transitionTokens
}

export const DarkMode: DefaultTheme = {
    color: getColorTokens(darkModeFoundation),
    background: getBackgroundColorTokens(darkModeFoundation),
    fontFamily: fontFamilyTokens,
    weight: weightTokens,
    transition: transitionTokens
}
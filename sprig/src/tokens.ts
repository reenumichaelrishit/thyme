import type { DefaultTheme } from "styled-components"

const lightModeFoundation = {
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
        hover: "#7EC999"
    },

    quaternary: {
        default: "#CDE2CB",
        hover: "#B4D3B1",
        active: "#B4D3B1"
    },
    
    background: {
        default: "#E7EFE6",
        hover: "#DBE7DA"
    },
    
    foreground: {
        default: "#1F1F1F",
        hover: "#333333"
    },

    alert: {
        warning: {
            default: "#BD0000"
        },
    },
}

interface ColorToken {
    default: string,
    hover?: string,
    active?: string
}

const colorTokens = {
    standard: lightModeFoundation.foreground,
    heading: lightModeFoundation.primary,
    subheading: lightModeFoundation.secondary,
    accent: lightModeFoundation.quaternary,
    reversed: lightModeFoundation.background,
    warning: lightModeFoundation.alert.warning,
}

const backgroundColorTokens = {
    standard: lightModeFoundation.background,
    navbar: lightModeFoundation.secondary,
    accent: lightModeFoundation.tertiary,
    backdrop: lightModeFoundation.quaternary,
    reversed: lightModeFoundation.foreground
}

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
            warning: ColorToken
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

const theme: DefaultTheme = {
    color: colorTokens,
    background: backgroundColorTokens,
    fontFamily: fontFamilyTokens,
    weight: weightTokens,
    transition: transitionTokens
}

export default theme
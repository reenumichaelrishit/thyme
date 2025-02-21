import type { DefaultTheme } from "styled-components"

const foundation = {
    color: {
        green: {
            default: "#C5DECD"
        },
        white: {
            default: "#FFFFFF"
        },
        black: {
            default: "#2A2525",
            true: "#000000"
        },
    },
    weight: {
        /*  FONT FAMILY             WEIGHTS
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
}

declare module "styled-components" {
    export interface DefaultTheme {
        color: {
            green: {
                default: string
            },
            white: {
                default: string
            },
            black: {
                default: string,
                true: string
            },
        },
        font: {
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
    color: foundation.color,

    font: {
        logo: "\"Yeseva One\", serif",
        heading: "\"Schibsted Grotesk\", sans-serif",
        content: "\"Barlow\", sans-serif",
    },

    weight: foundation.weight,

    transition: {
        default: '0.25s ease',
    }
}

export default theme
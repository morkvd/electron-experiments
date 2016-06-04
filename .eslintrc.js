module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        }
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "warn",
            2
        ],
        "linebreak-style": [
            "warn",
            "windows"
        ],
        "quotes": [
            "warn",
            "single"
        ],
        "semi": [
            "warn",
            "always"
        ],
        "no-cond-assign": [
            "warn",
            "except-parens"
        ],
        "no-console": [
            "error", {
                "allow": [
                    "log",
                    "warn",
                    "error"
                ]
            }
        ],
        "no-unused-vars": "warn"
    }
};
